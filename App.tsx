
import React, { useState, useMemo, useRef } from 'react';
import { INITIAL_PERSONAS } from './constants';
import { Persona, PhotoSpec, Project, ModelType, CategoryData } from './types';
import { GeminiService } from './services/gemini';
import JSZip from "https://esm.sh/jszip@3.10.1";

const App: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>(INITIAL_PERSONAS);
  const [activePersonaId, setActivePersonaId] = useState<string>(INITIAL_PERSONAS[0].id);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  
  const [model, setModel] = useState<ModelType>('gemini-3-pro-image-preview');
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{current: number, total: number} | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [previewImage, setPreviewImage] = useState<PhotoSpec | null>(null);

  // Ref to handle cancellation of batch process
  const abortBatchRef = useRef<boolean>(false);

  const activePersona = personas.find(p => p.id === activePersonaId) || personas[0];
  
  // Flatten projects for easy lookup, though they live in categories now
  const activeProject = useMemo(() => {
    if (!activeProjectId) return null;
    for (const cat of activePersona.categories) {
      const proj = cat.projects.find(p => p.id === activeProjectId);
      if (proj) return proj;
    }
    return null;
  }, [activePersona, activeProjectId]);

  // Determine displayed photos
  const displayedPhotos = activeProject ? activeProject.photos : activePersona.profileImages;
  
  const viewTitle = activeProject ? activeProject.title : "Identity & Profile";
  const viewDescription = activeProject ? activeProject.description : `Master identity assets for ${activePersona.name}.`;

  // Update status of a specific photo in the deep structure
  const updatePhotoStatus = (personaId: string, photoId: string, updates: Partial<PhotoSpec>) => {
    setPersonas(prev => prev.map(p => {
      if (p.id !== personaId) return p;

      // Check profile images first
      const profileMatch = p.profileImages.find(img => img.id === photoId);
      if (profileMatch) {
        return {
          ...p,
          profileImages: p.profileImages.map(img => img.id === photoId ? { ...img, ...updates } : img)
        };
      }

      // Check categories -> projects
      return {
        ...p,
        categories: p.categories.map(cat => ({
          ...cat,
          projects: cat.projects.map(proj => ({
            ...proj,
            photos: proj.photos.map(img => img.id === photoId ? { ...img, ...updates } : img)
          }))
        }))
      };
    }));
  };

  const performGeneration = async (personaId: string, photo: PhotoSpec, providedRefs?: string[]): Promise<string> => {
    updatePhotoStatus(personaId, photo.id, { status: 'generating', error: undefined });

    try {
      // NOTE: We access 'personas' from closure, which might be stale during batch.
      // However, we only need it to find the headshot if not provided.
      // In batchGeneratePhotos, we explicitly pass the headshot URL via 'providedRefs', avoiding stale state issues.
      const persona = personas.find(p => p.id === personaId); 
      
      let finalRefs: string[] = providedRefs || [];
      const isHeadshotPrompt = photo.type === 'headshot_primary' || photo.prompt.toLowerCase().includes('headshot');

      // If this photo requires identity, we need the headshot ref.
      // If providedRefs is empty, try to find it in current state (for single generation clicks).
      if (photo.isIdentity && !isHeadshotPrompt && finalRefs.length === 0 && persona) {
          const headshot = persona.profileImages.find(img => img.type === 'headshot_primary' || img.prompt.toLowerCase().includes('headshot'));
          if (headshot?.url) finalRefs.push(headshot.url);
      }

      const resultUrl = await GeminiService.generateImage(
        photo.prompt, 
        model, 
        finalRefs,
        isHeadshotPrompt
      );

      updatePhotoStatus(personaId, photo.id, { status: 'completed', url: resultUrl });
      return resultUrl;
    } catch (err: any) {
      updatePhotoStatus(personaId, photo.id, { status: 'error', error: err.message || 'Generation failed' });
      throw err;
    }
  };

  const handleGenerateSingle = async (photo: PhotoSpec) => {
    if (model === 'gemini-3-pro-image-preview') {
      const hasKey = await GeminiService.hasKey();
      if (!hasKey) { await GeminiService.openKeySelector(); return; }
    }
    try { await performGeneration(activePersonaId, photo); } catch(e) {}
  };

  const handleCancelBatch = () => {
    abortBatchRef.current = true;
    setIsGeneratingBatch(false);
    setBatchProgress(null);
  };

  // Helper to generate a list of photos in sequence
  const batchGeneratePhotos = async (photosToGenerate: PhotoSpec[]) => {
    if (photosToGenerate.length === 0) return;
    
    // 1. Identify Headshot URL (either from existing state or it will be generated)
    // We look up the headshot from the *latest* personas state we have reference to, or the one passed in.
    const headshotObj = activePersona.profileImages.find(img => img.type === 'headshot_primary' || img.prompt.toLowerCase().includes('headshot'));
    let currentHeadshotUrl = headshotObj?.url;

    // 2. Sort: Headshots must be processed first to serve as anchors
    const sortedPhotos = [...photosToGenerate].sort((a, b) => {
       const aIsHead = a.type === 'headshot_primary' || a.prompt.includes('headshot');
       const bIsHead = b.type === 'headshot_primary' || b.prompt.includes('headshot');
       return (bIsHead ? 1 : 0) - (aIsHead ? 1 : 0);
    });

    setBatchProgress({ current: 0, total: sortedPhotos.length });

    for (let i = 0; i < sortedPhotos.length; i++) {
      if (abortBatchRef.current) break;
      const photo = sortedPhotos[i];

      // Update progress
      setBatchProgress({ current: i + 1, total: sortedPhotos.length });

      // Skip if somehow already completed (though we filtered before)
      if (photo.status === 'completed' && photo.url) {
         if (photo.type === 'headshot_primary' || photo.prompt.includes('headshot')) {
             currentHeadshotUrl = photo.url;
         }
         continue; 
      }

      // Prepare Refs
      let refs: string[] = [];
      if (photo.isIdentity && currentHeadshotUrl) {
          refs = [currentHeadshotUrl];
      }
      
      try {
        const url = await performGeneration(activePersonaId, photo, refs);
        
        // If we just generated the headshot, capture its URL for subsequent iterations
        if (photo.type === 'headshot_primary' || photo.prompt.includes('headshot')) {
            currentHeadshotUrl = url;
        }
      } catch (e) {
        console.error("Batch error for photo", photo.id, e);
        // Continue to next photo even if one fails
      }
    }
  };

  const handleGenerateCurrentView = async () => {
    if (model === 'gemini-3-pro-image-preview') {
       if (!(await GeminiService.hasKey())) { await GeminiService.openKeySelector(); return; }
    }
    
    setIsGeneratingBatch(true);
    abortBatchRef.current = false;
    try {
      const pending = displayedPhotos.filter(p => p.status !== 'completed');
      await batchGeneratePhotos(pending);
    } finally {
      setIsGeneratingBatch(false);
      abortBatchRef.current = false;
      setBatchProgress(null);
    }
  };

  const handleGeneratePortfolio = async () => {
    if (model === 'gemini-3-pro-image-preview') {
       if (!(await GeminiService.hasKey())) { await GeminiService.openKeySelector(); return; }
    }

    // Gather ALL photos for the active persona
    const allPhotos: PhotoSpec[] = [
       ...activePersona.profileImages,
       ...activePersona.categories.flatMap(c => c.projects.flatMap(p => p.photos))
    ];
    
    const pending = allPhotos.filter(p => p.status !== 'completed');
    if (pending.length === 0) {
        console.log("All photos for this persona are already completed!");
        return;
    }

    // Removed confirm() as it is blocked in sandbox environments.
    // Proceeding directly with generation.

    setIsGeneratingBatch(true);
    abortBatchRef.current = false;
    try {
       await batchGeneratePhotos(pending);
    } finally {
       setIsGeneratingBatch(false);
       abortBatchRef.current = false;
       setBatchProgress(null);
    }
  };

  const handleExportPersonaZip = async () => {
    const allImages: PhotoSpec[] = [
      ...activePersona.profileImages,
      ...activePersona.categories.flatMap(c => c.projects.flatMap(p => p.photos))
    ].filter(img => img.status === 'completed' && img.url);

    if (allImages.length === 0) {
      console.log("No images generated yet.");
      return;
    }

    setIsExporting(true);
    try {
      const zip = new JSZip();
      
      // Build the detailed JSON structure per spec
      const exportJson = {
        persona: {
          id: activePersona.id,
          name: activePersona.name,
          role: activePersona.role,
          location: activePersona.location,
          bio: activePersona.bio,
          yearsActive: activePersona.yearsActive
        },
        profile: {
          images: activePersona.profileImages.filter(img => img.status === 'completed').map(img => ({
             file: img.filepath,
             type: img.type,
             title: img.title,
             description: img.detailedDescription,
             prompt: img.prompt,
             usedFor: img.caption
          }))
        },
        categories: activePersona.categories.map(cat => ({
           id: cat.id,
           name: cat.name,
           slug: cat.slug,
           description: cat.description,
           categoryContent: cat.categoryContent,
           projects: cat.projects.map(proj => ({
              id: proj.id,
              title: proj.title,
              subtitle: proj.subtitle,
              slug: proj.slug,
              isFeatured: proj.isFeatured,
              description: proj.description,
              projectDetails: proj.projectDetails,
              photos: proj.photos.filter(p => p.status === 'completed').map(photo => ({
                 file: photo.filepath,
                 title: photo.title,
                 description: photo.detailedDescription,
                 tags: photo.tags,
                 imageMetadata: photo.imageMetadata,
                 prompt: photo.prompt
              }))
           }))
        }))
      };

      zip.file("portfolio-data.json", JSON.stringify(exportJson, null, 2));

      // Add image binaries using the filepath structure
      for (const img of allImages) {
        if (img.url) {
          const base64Data = img.url.split(',')[1];
          // Remove leading slash if present
          const safePath = img.filepath.startsWith('/') ? img.filepath.substring(1) : img.filepath;
          zip.file(safePath, base64Data, { base64: true });
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${activePersona.id}-portfolio-v2.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export Error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-72 flex-shrink-0 bg-slate-800 border-r border-slate-700 flex flex-col z-20">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🎨</span> Persona Studio
          </h1>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
             {personas.map(p => (
               <button
                 key={p.id}
                 onClick={() => { setActivePersonaId(p.id); setActiveProjectId(null); }}
                 className={`flex-shrink-0 w-10 h-10 rounded-full border-2 transition-all ${activePersonaId === p.id ? 'border-blue-500 bg-white text-slate-900' : 'border-slate-600 bg-slate-700 text-slate-400'}`}
                 title={p.name}
               >
                 {p.name.charAt(0)}
               </button>
             ))}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-6">
            {/* Profile Section */}
            <div>
               <button 
                onClick={() => setActiveProjectId(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeProjectId === null ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
               >
                 Identity & Profile
               </button>
            </div>

            {/* Categories & Projects */}
            {activePersona.categories.map((cat) => (
              <div key={cat.id}>
                <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{cat.name}</h3>
                <div className="space-y-1">
                  {cat.projects.map(proj => (
                    <button
                      key={proj.id}
                      onClick={() => setActiveProjectId(proj.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all truncate ${
                        activeProjectId === proj.id 
                          ? 'bg-slate-700 text-white shadow-sm border-l-2 border-blue-400' 
                          : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                      }`}
                    >
                      {proj.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-700 bg-slate-800/80 backdrop-blur space-y-3">
           {!isGeneratingBatch ? (
             <button
               onClick={handleGeneratePortfolio}
               className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold uppercase tracking-widest transition-all text-white shadow-lg shadow-indigo-900/20"
             >
               Generate Full Portfolio
             </button>
           ) : (
             <button
                onClick={handleCancelBatch}
                className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
             >
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span>Stop Generation {batchProgress ? `(${batchProgress.current}/${batchProgress.total})` : ''}</span>
             </button>
           )}
           
           <button
            onClick={handleExportPersonaZip}
            disabled={isExporting || isGeneratingBatch}
            className={`w-full py-3 border rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                isExporting || isGeneratingBatch 
                ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed' 
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
            }`}
          >
            {isExporting ? 'Packaging JSON...' : 'Download Full ZIP'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Bar */}
        <header className="h-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 flex items-center justify-between px-8 z-10">
          <div>
            <h2 className="text-2xl font-bold text-white">{viewTitle}</h2>
            <p className="text-sm text-slate-400 max-w-2xl truncate">{viewDescription}</p>
          </div>
          <div className="flex gap-4 items-center">
            <select 
              value={model} 
              onChange={(e) => setModel(e.target.value as ModelType)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white"
            >
              <option value="gemini-3-pro-image-preview">Gemini Pro (2K)</option>
              <option value="gemini-2.5-flash-image">Gemini Flash</option>
            </select>
            
            <div className="flex gap-2">
              {isGeneratingBatch && (
                <div className="flex items-center gap-2">
                   {batchProgress && (
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       {batchProgress.current} / {batchProgress.total}
                     </span>
                   )}
                   <button
                    onClick={handleCancelBatch}
                    className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all"
                   >
                    Cancel
                   </button>
                </div>
              )}
              
              <button
                onClick={handleGenerateCurrentView}
                disabled={isGeneratingBatch}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                  isGeneratingBatch ? 'bg-slate-700 text-slate-500' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                }`}
              >
                {isGeneratingBatch ? 'Processing...' : `Generate View (${displayedPhotos.length})`}
              </button>
            </div>
          </div>
        </header>

        {/* Photo Grid */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-950">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {displayedPhotos.map(photo => (
              <div 
                key={photo.id}
                className={`group relative aspect-[4/5] bg-slate-900 rounded-2xl overflow-hidden border transition-all hover:scale-[1.02] hover:shadow-2xl ${
                  photo.status === 'generating' ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-white/5 hover:border-white/20'
                }`}
              >
                {/* Image / Placeholder */}
                <div 
                  className="w-full h-full cursor-pointer relative"
                  onClick={() => photo.url && setPreviewImage(photo)}
                >
                  {photo.url ? (
                    <img src={photo.url} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                      {photo.status === 'generating' ? (
                        <div className="w-8 h-8 border-2 border-t-blue-500 rounded-full animate-spin mb-4" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-slate-600">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                      <p className="text-[10px] text-slate-500 font-medium line-clamp-3 px-2">{photo.caption}</p>
                    </div>
                  )}
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    <p className="text-white text-xs font-bold line-clamp-2">{photo.caption}</p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleGenerateSingle(photo); }}
                      className="mt-3 w-full py-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg text-[10px] font-bold uppercase tracking-widest text-white border border-white/10"
                    >
                      {photo.status === 'completed' ? 'Regenerate' : 'Generate'}
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {photo.isIdentity && (
                      <span className="px-2 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded shadow-sm">Identity</span>
                    )}
                    {photo.isFeatured && (
                      <span className="px-2 py-1 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest rounded shadow-sm">Featured</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

       {/* Fullscreen Preview */}
       {previewImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-12 bg-slate-950/98 backdrop-blur-3xl"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
            <img src={previewImage.url} alt={previewImage.caption} className="max-h-[85vh] w-auto rounded-lg shadow-2xl" />
            <div className="text-center max-w-2xl">
              <h2 className="text-xl font-bold text-white mb-2">{previewImage.caption}</h2>
              <p className="text-slate-500 text-xs italic">{previewImage.prompt}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
