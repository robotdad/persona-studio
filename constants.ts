
import { Persona, CategoryData, Project, PhotoSpec } from './types';

// --- HELPER FUNCTIONS ---

const generateId = () => Math.random().toString(36).substr(2, 9);

const createPhoto = (
  folderPath: string,
  filename: string,
  type: string | undefined,
  prompt: string, 
  title: string,
  detailedDescription: string,
  tags: string[] = [],
  isIdentity: boolean = false,
  metadata: any = {}
): PhotoSpec => ({
  id: generateId(),
  filepath: `${folderPath}/${filename}`,
  filename: filename,
  type,
  prompt,
  caption: title,
  title,
  detailedDescription,
  tags,
  isFeatured: tags.includes('featured'),
  isIdentity,
  status: 'pending',
  imageMetadata: metadata
});

// --- SARAH CHEN (Costume Designer) ---

const generateSarahData = (): Persona => {
  const pid = 'sarah-chen';
  
  const profileImages = [
    createPhoto('profile', 'headshot-primary.jpg', 'headshot_primary',
      'Professional studio portrait of a 32-year-old Korean-American woman, costume designer, shoulder-length black hair, warm confident smile, wearing black crew neck sweater, soft studio lighting against neutral gray background, professional headshot photography',
      'Professional Headshot', 'Primary professional headshot.', ['profile'], true
    ),
    createPhoto('profile', 'selfie-backstage.jpg', 'selfie',
      'Smartphone mirror selfie of Sarah Chen in theatre backstage dressing room, holding phone, wearing wireless headset and casual black work clothes, costume racks visible in background, warm overhead lighting',
      'Backstage Selfie', 'Casual selfie during tech week.', ['profile'], true
    ),
    createPhoto('profile', 'candid-workshop.jpg', 'candid',
      'Candid photo of Sarah Chen working backstage during tech rehearsal, shot by production photographer, examining costume on dress form, measuring tape around neck, fabric swatches in hand, focused expression',
      'Workshop Consultation', 'Candid shot during fitting.', ['profile'], true
    ),
    createPhoto('profile', 'on-job-action.jpg', 'on_job',
      'Sarah Chen at work pinning fabric on live actor during fitting session, hands actively adjusting costume piece, professional workshop setting, measuring tools visible, captured mid-action',
      'Active Fitting Session', 'Pinning costume during live fitting.', ['profile'], true
    ),
    createPhoto('profile', 'headshot-alt.jpg', 'headshot_alt',
      'Professional headshot of Sarah Chen wearing a dark navy blazer, artistic lighting, serious creative expression, studio background',
      'Creative Headshot', 'Alternate professional profile.', ['profile'], true
    )
  ];

  const categories: CategoryData[] = [
    {
      id: 'classical-theater',
      name: 'Classical Theater',
      slug: 'classical-theater',
      description: 'Shakespearean drama and classical canon requiring period research.',
      projects: [
        {
          id: 'the-obsidian-crown',
          title: "The Obsidian Crown",
          subtitle: "Dark Fantasy Tragedy",
          slug: "the-obsidian-crown",
          description: "An original dark fantasy tragedy exploring themes of power and corruption through costume.",
          isFeatured: true,
          projectDetails: { venue: "Blackfriars Repertory", year: 2024, budget: "$45,000", role: "Lead Designer" },
          photos: [
             createPhoto('categories/classical-theater/obsidian', 'featured.jpg', undefined,
               'Professional costume photography of elaborate dark fantasy queen costume on dress form, midnight black distressed velvet gown with tattered gold embroidery showing deliberate deterioration, asymmetrical draping, small embedded red LED elements creating glowing curse patterns, dramatic lighting',
               'Queen\'s Descent - Final', 'The Queen\'s fifth-phase costume showcasing complete moral corruption.', ['featured', 'home_carousel'], false
             ),
             createPhoto('categories/classical-theater/obsidian', 'design-board.jpg', undefined,
               'Professional photo of costume design presentation board, five costume sketches showing progression from rich burgundy to black, accompanying fabric swatches arranged in degrading color progression, annotated notes',
               'Character Arc Board', 'Design board showing the Queen\'s moral descent.', ['category_carousel'], false
             ),
             createPhoto('categories/classical-theater/obsidian', 'act1-costume.jpg', undefined,
                'Rich burgundy velvet medieval gown on dress form, pristine gold embroidery, clean lines, warm lighting, representing innocence phase',
                'Act I: The Innocent Queen', 'The initial costume before corruption begins.', [], false
             ),
             createPhoto('categories/classical-theater/obsidian', 'dye-process.jpg', undefined,
                'Workshop view of large vats of black dye, fabric hanging to dry with ombre gradient from red to black, gloved hands visible dipping fabric',
                'Ombre Dyeing Process', 'Creating the transition gradients for Act III.', [], false
             ),
             createPhoto('categories/classical-theater/obsidian', 'embroidery.jpg', undefined,
               'Extreme close-up of intricate gold metallic embroidery on black velvet fabric showing intentionally frayed and distressed decorative symbols, hand-stitching in progress',
               'Curse Symbol Embroidery', 'Close-up of hand-embroidered curse symbols.', [], false
             ),
             createPhoto('categories/classical-theater/obsidian', 'draping.jpg', undefined,
                'Candid workshop photo of designer draping dark velvet fabric on professional dress form, measuring and pinning fabric to create structured bodice, bolts of fabric visible',
                'Draping Process', 'Creating the bodice structure.', ['category_carousel'], false
             ),
             createPhoto('categories/classical-theater/obsidian', 'fitting-lead.jpg', undefined,
                'Photo of designer pinning hem of black gown on actress, actress looking in mirror, designer on knees adjusting fabric pool, serious focused atmosphere',
                'Final Fitting: Lead', 'Adjusting the hem for the final Act V costume.', [], false
             ),
             createPhoto('categories/classical-theater/obsidian', 'led-test.jpg', undefined,
                'Dark room photo showing just the glowing red LED circuit embedded in fabric, wiring visible, technical test shot',
                'LED Circuit Test', 'Testing the embedded lighting effects.', [], false
             ),
             createPhoto('categories/classical-theater/obsidian', 'production-act3.jpg', undefined,
                'Production still of Queen character on throne, costume is half-shadowed, lighting split between warm and cool, expression of doubt',
                'Act III: The Turning Point', 'The moment of moral ambiguity.', [], false
             ),
             createPhoto('categories/classical-theater/obsidian', 'production-act5.jpg', undefined,
                'Theatrical production photography of actress in elaborate dark fantasy queen costume performing on stage, dramatic lighting from below, glowing red LED elements visible in dark fabric',
                'Act V Confrontation', 'Production photograph from the final confrontation scene.', ['home_carousel'], false
             ),
             createPhoto('categories/classical-theater/obsidian', 'ensemble-group.jpg', undefined,
                'Wide stage shot of 10 ensemble members in grey and charcoal tattered robes, cohesive color palette, dramatic side lighting',
                'The Corrupted Court', 'The ensemble echoing the Queen\'s descent.', [], false
             ),
             createPhoto('categories/classical-theater/obsidian', 'rack-backstage.jpg', undefined,
                'Costume rack backstage labeled "Queen Morwen" with 5 distinct costumes hanging in gradient order from red to black, organized and tagged',
                'Quick Change Rack', 'The organized rack ready for the show.', [], false
             )
          ]
        },
        {
          id: 'much-ado',
          title: "Much Ado About Nothing",
          subtitle: "1960s Miami Reimagining",
          slug: "much-ado-reimagined",
          description: "A vibrant reinterpretation of Shakespeare's comedy set in 1960s Miami.",
          isFeatured: false,
          photos: [
             createPhoto('categories/classical-theater/much-ado', 'featured.jpg', undefined,
                'Vibrant 1960s style floral print cocktail dress on dress form, bright teal and orange color palette, mid-century modern silhouette, outdoor sunlight lighting',
                'Beatrice - Garden Party', 'Signature look for Act II.', ['featured'], false
             ),
             createPhoto('categories/classical-theater/much-ado', 'mood-board.jpg', undefined,
                'Corkboard covered in 1960s fashion magazine clippings, Slim Aarons photos, bright fabric swatches in teal/orange/pink, vintage sunglasses',
                'Miami 1960s Mood Board', 'Initial visual research and color story.', [], false
             ),
             createPhoto('categories/classical-theater/much-ado', 'sketch.jpg', undefined,
                'Gouache costume rendering of 1960s men\'s summer suit in pale linen, wearing sunglasses and fedora, energetic artistic style',
                'Benedick Sketch', 'Concept for Benedick\'s arrival.', [], false
             ),
             createPhoto('categories/classical-theater/much-ado', 'fabric-shopping.jpg', undefined,
                'POV shot holding bright floral print fabric bolt against a linen suit fabric, checking compatibility, fabric store background',
                'Textile Sourcing', 'Selecting prints for the garden party scene.', [], false
             ),
             createPhoto('categories/classical-theater/much-ado', 'pattern-making.jpg', undefined,
                'Close up of paper pattern pieces on cutting table, 1960s shift dress silhouette, pattern weights and chalk marks visible',
                'Pattern Drafting', 'Drafting the period-accurate silhouette.', [], false
             ),
             createPhoto('categories/classical-theater/much-ado', 'fitting-benedick.jpg', undefined,
                'Fitting photo of male actor in linen suit, designer adjusting trouser break, tropical shirt visible underneath',
                'Benedick Fitting', 'Tailoring the summer suit.', [], false
             ),
             createPhoto('categories/classical-theater/much-ado', 'accessory-table.jpg', undefined,
                'Table laid out with vintage 1960s sunglasses, colorful chunky jewelry, straw hats, and silk scarves, organized by character',
                'Accessory Parade', 'Styling details for the ensemble.', [], false
             ),
             createPhoto('categories/classical-theater/much-ado', 'production-arrival.jpg', undefined,
                'Stage photo of soldiers arriving in jeep, wearing crisp tan uniforms with rolled sleeves, bright sunshine lighting, palm tree set pieces',
                'The Arrival Scene', 'Act I Scene 1: The soldiers return.', [], false
             ),
             createPhoto('categories/classical-theater/much-ado', 'production-masked.jpg', undefined,
                'Theatrical production photo of two actors dancing in 1960s style colorful formal wear, masks on sticks, outdoor stage at twilight, string lights overhead',
                'Masquerade Ball', 'The ensemble dance number.', ['category_carousel'], false
             ),
             createPhoto('categories/classical-theater/much-ado', 'production-wedding.jpg', undefined,
                'Dramatic stage shot of wedding scene, bride in 60s mini-dress veil, chaos ensuing, high contrast lighting',
                'The Wedding Catastrophe', 'The dramatic climax of the comedy.', [], false
             ),
             createPhoto('categories/classical-theater/much-ado', 'detail-shoes.jpg', undefined,
                'Close up of custom dyed satin pumps in teal to match the dress, sitting on stage floor',
                'Footwear Detail', 'Custom color matching for footwear.', [], false
             ),
             createPhoto('categories/classical-theater/much-ado', 'curtain-call.jpg', undefined,
                'Full cast on stage taking a bow, vibrant rainbow of colors across the line, outdoor night lighting',
                'Curtain Call', 'The full color palette on display.', [], false
             )
          ]
        }
      ]
    },
    {
      id: 'contemporary-theater',
      name: 'Contemporary Theater',
      slug: 'contemporary-theater',
      description: 'Modern plays and experimental works focusing on psychological realism.',
      projects: [
        {
          id: 'urban-dreams',
          title: "Urban Dreams",
          slug: "urban-dreams",
          description: "A gritty, hyper-realistic drama set in a near-future metropolis.",
          isFeatured: false,
          photos: [
            createPhoto('categories/contemporary/urban', 'featured.jpg', undefined,
              'Distressed streetwear costume on mannequin, layers of technical fabrics mixed with scavenged plastic elements, neon accents, urban lighting',
              'Protagonist Street Gear', 'The hero costume focusing on survival utility.', ['featured'], false
            ),
            createPhoto('categories/contemporary/urban', 'distressing-process.jpg', undefined,
              'Workshop photo of designer using sandpaper and cheese grater on a denim jacket, creating realistic wear patterns',
              'Distressing Techniques', 'Breaking down the fabrics.', [], false
            ),
            createPhoto('categories/contemporary/urban', 'tech-pack.jpg', undefined,
              'Flat lay of technical garments, cargo pants, vests, webbing, arranged with breakdown notes and dirt samples',
              'Costume Breakdown', 'Planning the layers of grime.', [], false
            ),
            createPhoto('categories/contemporary/urban', 'plastic-detail.jpg', undefined,
              'Close up of clear plastic raincoat modified with duct tape and LED strip, future-scavenger aesthetic',
              'Scavenged Materials', ' incorporating found objects.', [], false
            ),
            createPhoto('categories/contemporary/urban', 'fitting.jpg', undefined,
              'Photo of costume fitting with actor wearing technical jacket, designer adjusting sleeve length with pins, mirror reflection visible',
              'Fitting Session', 'Adjusting the fit for movement.', [], false
            ),
            createPhoto('categories/contemporary/urban', 'makeup-test.jpg', undefined,
               'Close up of actor face with grime makeup and neon eyeliner, hood up, test shot for lighting',
               'Makeup & Costume Test', 'Coordinating look with makeup department.', [], false
            ),
            createPhoto('categories/contemporary/urban', 'production.jpg', undefined,
               'Stage photo of three actors in modern utilitarian clothing standing in a rainy alleyway set, cold blue lighting, wet texture on clothes',
               'Alleyway Scene', 'The confrontation scene in the rain.', ['category_carousel'], false
            ),
            createPhoto('categories/contemporary/urban', 'production-chase.jpg', undefined,
               'Blurry action shot of actor running across stage, coat flying behind, neon city backdrop',
               'The Chase', 'Costume in motion.', [], false
            ),
            createPhoto('categories/contemporary/urban', 'production-shelter.jpg', undefined,
               'Quiet scene of actors sitting around a fire barrel, wrapped in layers of blankets and textural knits, warm glow',
               'The Shelter', 'Textural contrast in a quiet moment.', [], false
            ),
            createPhoto('categories/contemporary/urban', 'detail-boots.jpg', undefined,
               'Close up of combat boots modified with metal plates and spray paint, standing on metal grate stage floor',
               'Footwear Mod', 'Customized footwear for the setting.', [], false
            ),
            createPhoto('categories/contemporary/urban', 'rack-photo.jpg', undefined,
               'Rack of identical grey hoodies, each distressed to a different level, labeled "Day 1", "Day 5", "Day 10"',
               'Continuity Rack', 'Tracking the degradation of the costumes.', [], false
            ),
            createPhoto('categories/contemporary/urban', 'backstage-prep.jpg', undefined,
               'Dresser spraying water on actor\'s coat right before entrance to simulate rain',
               'Entrance Prep', 'Last minute effects.', [], false
            )
          ]
        }
      ]
    },
    {
      id: 'opera-dance',
      name: 'Opera & Dance',
      slug: 'opera-dance',
      description: 'Large-scale productions requiring movement durability and visual grandeur.',
      projects: [
        {
          id: 'firebird',
          title: "The Firebird",
          slug: "the-firebird",
          description: "Avant-garde ballet production focusing on silhouette and movement.",
          isFeatured: true,
          photos: [
             createPhoto('categories/opera/firebird', 'featured.jpg', undefined,
               'Feathered red and orange ballet costume on form, rigid structural bodice with flowing ombre skirt, dramatic spotlight',
               'Firebird Principal', 'The main Firebird costume.', ['featured'], false
             ),
             createPhoto('categories/opera/firebird', 'sketch-movement.jpg', undefined,
               'Dynamic charcoal and pastel sketch of dancer in mid-leap, red streaks indicating fabric flow, abstract energy',
               'Movement Concept Sketch', 'Visualizing the choreography through line.', [], false
             ),
             createPhoto('categories/opera/firebird', 'dying.jpg', undefined,
               'Workshop view of large vats of red dye, fabric hanging to dry in ombre gradient, gloved hands visible',
               'Gradient Dyeing', 'Hand-dyeing the silk gradient.', [], false
             ),
             createPhoto('categories/opera/firebird', 'feather-detail.jpg', undefined,
               'Macro shot of hand-painted silk feathers being appliqued onto the bodice, sequins mixed in',
               'Feather Applique', 'Constructing the plumage.', [], false
             ),
             createPhoto('categories/opera/firebird', 'movement.jpg', undefined,
               'Action shot of dancer mid-leap wearing red flowing silk costume, fabric creating flame shapes in air, stage lighting',
               'Movement Test', 'Testing fabric physics for choreography.', ['category_carousel'], false
             ),
             createPhoto('categories/opera/firebird', 'fitting-tutu.jpg', undefined,
               'Ballerina holding onto barre while designer adjusts the structural wire of the tutu, rehearsal room mirror',
               'Structure Fitting', 'Balancing the silhouette.', [], false
             ),
             createPhoto('categories/opera/firebird', 'production-solo.jpg', undefined,
               'Stage photo of Firebird solo, spotlight on red costume against dark blue cyclorama, dramatic contrast',
               'The Awakening', 'The opening solo.', [], false
             ),
             createPhoto('categories/opera/firebird', 'production-pas.jpg', undefined,
               'Two dancers partnering, Prince Ivan lifting Firebird, costumes interacting, contrasting textures',
               'Pas de Deux', 'Partnering durability test.', [], false
             ),
             createPhoto('categories/opera/firebird', 'villain-costume.jpg', undefined,
               'Green and black scale-textured costume for Katschei, sharp angular silhouette, menacing lighting',
               'Katschei Concept', 'The antagonist\'s design.', [], false
             ),
             createPhoto('categories/opera/firebird', 'ensemble-corps.jpg', undefined,
               'Wide shot of corps de ballet in forest creature costumes, muted greens and browns, blending into set',
               'The Enchanted Forest', 'The corps de ballet ensemble.', [], false
             ),
             createPhoto('categories/opera/firebird', 'backstage-wings.jpg', undefined,
               'Dancer stretching in wings, costume silhouette backlit by stage lights, atmospheric',
               'Wings Preparation', 'Moments before entrance.', [], false
             ),
             createPhoto('categories/opera/firebird', 'detail-headpiece.jpg', undefined,
               'Close up of Firebird headpiece, gold wire and red crystals, lightweight construction',
               'Headdress Detail', 'The crowning detail.', [], false
             )
          ]
        }
      ]
    }
  ];

  return {
    id: pid,
    name: 'Sarah Chen',
    role: 'Theatre Costume Designer',
    location: 'Portland, OR',
    description: '32-year-old Korean-American woman with shoulder-length black hair.',
    basePrompt: 'A 32-year-old Korean-American woman with shoulder-length black hair, high cheekbones, almond-shaped eyes, and a warm, professional expression.',
    profileImages,
    categories
  };
};

// --- JULIAN VANE (First Hand) ---

const generateJulianData = (): Persona => {
  const pid = 'julian-vane';
  
  const profileImages = [
    createPhoto('profile', 'headshot-primary.jpg', 'headshot_primary',
      'Professional studio portrait of a 35-year-old British-Nigerian man, professional first hand tailor, short buzz cut, clean-shaven, focused confident gaze, wearing crisp white collared shirt, soft studio lighting',
      'Professional Headshot', 'Primary professional headshot.', ['profile'], true
    ),
    createPhoto('profile', 'selfie-workshop.jpg', 'selfie',
      'Smartphone mirror selfie of Julian Vane in tailoring workshop, holding phone, wearing work apron over t-shirt, cutting table and fabric visible in background',
      'Workshop Selfie', 'Casual capture in the workshop.', ['profile'], true
    ),
    createPhoto('profile', 'on-job-action.jpg', 'on_job',
       'Julian Vane at fitting session with actor, hands adjusting garment on live person, pinning and marking alterations, professional tailoring environment',
       'Fitting Session', 'Adjusting a prototype during a first fitting.', ['profile'], true
    ),
    createPhoto('profile', 'sewing-action.jpg', 'candid',
       'Candid photo of Julian Vane focused on industrial sewing machine, stitching heavy fabric, workshop background, natural light',
       'Machine Work', 'Stitching heavy wool layers.', ['profile'], true
    ),
    createPhoto('profile', 'cutting-table.jpg', 'candid',
       'Photo of Julian Vane leaning over large cutting table, chalking a pattern onto wool fabric, concentrated expression, tools laid out',
       'Pattern Drafting', 'Laying out the cut.', ['profile'], true
    )
  ];

  const categories: CategoryData[] = [
    {
      id: 'classical-construction',
      name: 'Classical Construction',
      slug: 'classical-construction',
      description: 'Complex period construction for Shakespeare and tragedy.',
      projects: [
        {
          id: 'lears-madness',
          title: "Lear's Madness",
          slug: "lears-madness",
          description: "Heavy wool construction for a post-apocalyptic King Lear.",
          isFeatured: true,
          photos: [
            createPhoto('categories/classical-con/lear', 'featured.jpg', undefined,
               'Close up macro shot of heavy distressed wool coat on dress form, hand-stitched leather binding details, jagged hem, studio lighting',
               'Lear\'s Storm Coat', 'Act III coat constructed from three layers of felted wool.', ['featured'], false
            ),
            createPhoto('categories/classical-con/lear', 'pattern-draft.jpg', undefined,
               'Brown paper pattern pieces hanging on a hook, labeled "Lear Coat V3", complex shapes',
               'Pattern Pieces', 'The architectural plan for the coat.', [], false
            ),
            createPhoto('categories/classical-con/lear', 'tailoring-process.jpg', undefined,
               'Work table view of canvas internal structure for a heavy coat, pad stitching visible, tailoring shears and chalk',
               'Internal Structure', 'Hand-pad stitching the horsehair canvas interface.', ['category_carousel'], false
            ),
            createPhoto('categories/classical-con/lear', 'felting-process.jpg', undefined,
               'Close up of wool fabric being manually felted and distressed with tools, texture focus',
               'Texturizing', 'Creating the weathered look before assembly.', [], false
            ),
            createPhoto('categories/classical-con/lear', 'leather-binding.jpg', undefined,
               'Macro shot of hands sewing leather binding onto heavy wool edge, thick needle, beeswax cake visible',
               'Leather Work', 'Reinforcing the edges.', [], false
            ),
            createPhoto('categories/classical-con/lear', 'fitting-muslin.jpg', undefined,
               'Fitting photo of actor in muslin prototype of coat, Julian marking fit with black marker, workshop background',
               'Muslin Fitting', 'Checking volume and movement.', [], false
            ),
            createPhoto('categories/classical-con/lear', 'fitting-final.jpg', undefined,
               'Fitting photo of actor in final wool coat, checking arm movement range, Julian adjusting shoulder',
               'Final Range Check', 'Ensuring the actor can fight.', [], false
            ),
            createPhoto('categories/classical-con/lear', 'production.jpg', undefined,
               'Production still of actor running in rain on stage wearing heavy distressed wool coat, dramatic water effects',
               'Storm Scene', 'The coat in action under rain machines.', [], false
            ),
            createPhoto('categories/classical-con/lear', 'production-throne.jpg', undefined,
               'Stage shot of Lear on throne, heavy coat draped around him like a blanket, texture popping under lights',
               'The Weight of Crown', 'The coat as character.', [], false
            ),
            createPhoto('categories/classical-con/lear', 'cordelia-dress.jpg', undefined,
               'Simple linen dress on form, raw edges, contrast to the heavy wools, soft lighting',
               'Cordelia\'s Tunic', 'Contrast in texture.', [], false
            ),
            createPhoto('categories/classical-con/lear', 'fool-motley.jpg', undefined,
               'Patchwork leather and wool vest on form, complex piecing, muted colors',
               'The Fool\'s Motley', 'Scavenged aesthetic construction.', [], false
            ),
            createPhoto('categories/classical-con/lear', 'drying-rack.jpg', undefined,
               'Coat hanging on heavy duty rack after rain scene, drying fans pointed at it',
               'Maintenance', 'Post-show care.', [], false
            )
          ]
        },
        {
          id: 'hamlet-2024',
          title: "Hamlet 2024",
          slug: "hamlet-2024",
          description: "Modern minimalist tailoring for a stark Hamlet production.",
          isFeatured: false,
          photos: [
             createPhoto('categories/classical-con/hamlet', 'featured.jpg', undefined,
                'Sharp black tailored suit jacket on form, minimalist design, velvet lapel detail, white background',
                'Hamlet\'s Mourning Suit', 'Precision tailoring for the lead.', ['featured'], false
             ),
             createPhoto('categories/classical-con/hamlet', 'chalk-marks.jpg', undefined,
                'Black wool fabric on table with precise white tailor\'s chalk lines drawn for cutting',
                'Marking Out', 'Precision cutting layout.', [], false
             ),
             createPhoto('categories/classical-con/hamlet', 'canvas-pad.jpg', undefined,
                'Close up of lapel pad stitching, tiny even stitches on canvas, black thread on cream canvas',
                'Pad Stitching', 'Building the roll of the lapel.', [], false
             ),
             createPhoto('categories/classical-con/hamlet', 'pocket-jetting.jpg', undefined,
                'Extreme close up of a perfect double besom pocket opening on black wool, clean lines',
                'Pocket Construction', 'Technical precision.', [], false
             ),
             createPhoto('categories/classical-con/hamlet', 'fitting.jpg', undefined,
                'Photo of Julian Vane adjusting hem of black trousers on actor, pinning with precision, workshop setting',
                'Trouser Fitting', 'Checking the break on the trousers.', [], false
             ),
             createPhoto('categories/classical-con/hamlet', 'shoulder-fit.jpg', undefined,
                'Close up of shoulder fitting, smoothing out the sleeve head, pins visible',
                'Shoulder Set', 'Perfecting the silhouette.', [], false
             ),
             createPhoto('categories/classical-con/hamlet', 'pressing.jpg', undefined,
                'Steam iron pressing a black sleeve on a tailor\'s ham, steam rising, crisp finish',
                'Final Press', 'Sculpting with steam.', [], false
             ),
             createPhoto('categories/classical-con/hamlet', 'production-soliloquy.jpg', undefined,
                'Production still of Hamlet alone in spotlight, sharp silhouette of the suit against white cyclorama',
                'To Be Or Not To Be', 'The suit on stage.', [], false
             ),
             createPhoto('categories/classical-con/hamlet', 'production-duel.jpg', undefined,
                'Action shot of Hamlet fencing, jacket removed, wearing white shirt and black waistcoat, fitted perfectly',
                'The Duel', 'Tailoring in motion.', [], false
             ),
             createPhoto('categories/classical-con/hamlet', 'claudius-suit.jpg', undefined,
                'Rich burgundy velvet smoking jacket on form, silk lapels, structure contrasting with Hamlet',
                'Claudius Jacket', 'Contrast in texture and status.', [], false
             ),
             createPhoto('categories/classical-con/hamlet', 'gertrude-gown.jpg', undefined,
                'Minimalist grey silk gown on form, bias cut, structural shoulder pads',
                'Gertrude\'s Silhouette', 'Structural tailoring for womenswear.', [], false
             ),
             createPhoto('categories/classical-con/hamlet', 'rack-suits.jpg', undefined,
                'Rack of 10 identical black suits for the ensemble, perfectly spaced',
                'The Courtiers', 'Uniformity in tailoring.', [], false
             )
          ]
        }
      ]
    },
    {
      id: 'specialty-techniques',
      name: 'Specialty Techniques',
      slug: 'specialty-techniques',
      description: 'Leather work, armor, and non-traditional materials.',
      projects: [
        {
            id: 'wasteland-armor',
            title: "Wasteland Armor Build",
            slug: "wasteland-armor",
            description: "Custom leather and metal fabrication for a sci-fi adaptation.",
            isFeatured: true,
            photos: [
                createPhoto('categories/specialty/wasteland', 'featured.jpg', undefined,
                    'Detailed vegetable tanned leather chest piece on form, brass rivets, oil finish, sturdy construction',
                    'Leather Cuirass', 'Hand-tooled leather armor piece.', ['featured'], false
                ),
                createPhoto('categories/specialty/wasteland', 'process.jpg', undefined,
                     'Workbench with leather working tools, mallet, dyes, and half-assembled armor pieces, focus on craftsmanship',
                     'Tooling Bench', 'The tooling station during the build process.', [], false
                ),
                createPhoto('categories/specialty/wasteland', 'wet-molding.jpg', undefined,
                     'Wet leather being stretched over a mannequin torso form, clamped in place',
                     'Wet Molding', 'Shaping the leather to the body.', [], false
                ),
                createPhoto('categories/specialty/wasteland', 'riveting.jpg', undefined,
                     'Close up of hand hammering a brass rivet into leather layers, hammer in motion',
                     'Riveting', 'Assembly connections.', [], false
                ),
                createPhoto('categories/specialty/wasteland', 'dyeing.jpg', undefined,
                     'Close up of hand applying dark oil dye to leather texture, sponge visible, rich color',
                     'Aging Process', 'Creating the weathered look.', [], false
                ),
                createPhoto('categories/specialty/wasteland', 'fitting-armor.jpg', undefined,
                     'Fitting photo, checking articulation of shoulder plates on actor, arms raised',
                     'Articulation Check', 'Ensuring range of motion.', [], false
                ),
                createPhoto('categories/specialty/wasteland', 'distressing-metal.jpg', undefined,
                     'Julian using a wire brush on metal greaves to create scratch marks and wear',
                     'Metal Aging', 'Breaking down the shine.', [], false
                ),
                createPhoto('categories/specialty/wasteland', 'production-battle.jpg', undefined,
                     'Action shot of actor in full leather armor fighting with sword, dusty environment, armor looking solid',
                     'Battle Ready', 'The armor in action.', [], false
                ),
                createPhoto('categories/specialty/wasteland', 'production-hero.jpg', undefined,
                     'Heroic pose of lead actor in armor, sunset lighting, texture of leather highly visible',
                     'The Wanderer', 'The finished look on screen.', [], false
                ),
                createPhoto('categories/specialty/wasteland', 'bracer-detail.jpg', undefined,
                     'Close up of forearm bracer with buckles and straps, intricate tooling pattern',
                     'Bracer Detail', 'Fine details close up.', [], false
                ),
                createPhoto('categories/specialty/wasteland', 'greaves.jpg', undefined,
                     'Pair of leather shin guards on work table, finished and polished',
                     'Greaves Set', 'Leg protection build.', [], false
                ),
                createPhoto('categories/specialty/wasteland', 'repair-kit.jpg', undefined,
                     'Small kit with spare rivets, leather thongs, and dye for on-set repairs',
                     'Field Kit', 'Maintenance prep.', [], false
                )
            ]
        }
      ]
    },
    {
       id: 'contemporary-construction',
       name: 'Contemporary Construction',
       slug: 'contemporary-construction',
       description: 'Modern theatrical construction and experimental builds.',
       projects: [
          {
             id: 'glass-menagerie',
             title: "The Glass Menagerie",
             slug: "glass-menagerie",
             description: "Delicate period-accurate 1930s dresses.",
             isFeatured: false,
             photos: [
                createPhoto('categories/contemporary-con/glass', 'featured.jpg', undefined,
                   'Pale blue silk chiffon dress on form, bias cut, soft lighting, vintage style',
                   'Laura\'s Dress', 'Bias-cut silk chiffon construction.', ['featured'], false
                ),
                createPhoto('categories/contemporary-con/glass', 'fabric-drape.jpg', undefined,
                   'Silk chiffon fabric draped over hand to show transparency and flow, light blue color',
                   'Fabric Selection', 'Choosing the right weight.', [], false
                ),
                createPhoto('categories/contemporary-con/glass', 'bias-layout.jpg', undefined,
                   'Cutting table with fabric laid out on 45 degree angle, pattern pieces pinned, careful handling',
                   'Bias Layout', 'Cutting on the bias.', [], false
                ),
                createPhoto('categories/contemporary-con/glass', 'seam-detail.jpg', undefined,
                   'Macro shot of french seams on sheer fabric, delicate stitching, clean finish',
                   'French Seam Detail', 'Interior finishing for sheer fabrics.', [], false
                ),
                createPhoto('categories/contemporary-con/glass', 'rolled-hem.jpg', undefined,
                   'Close up of hand-rolled hem on silk chiffon, needle visible, extremely fine work',
                   'Hand Rolled Hem', 'Finishing the edges.', [], false
                ),
                createPhoto('categories/contemporary-con/glass', 'fitting.jpg', undefined,
                   'Fitting photo, adjusting the shoulder strap on actress, delicate handling',
                   'Delicate Fitting', 'Adjusting the fit without stretching.', [], false
                ),
                createPhoto('categories/contemporary-con/glass', 'slip-dress.jpg', undefined,
                   'Silk charmeuse slip dress on form, bias cut, intended to be worn under the chiffon',
                   'Under-structure', 'The foundation layer.', [], false
                ),
                createPhoto('categories/contemporary-con/glass', 'production-laura.jpg', undefined,
                   'Stage photo of Laura sitting by glass collection, dress pooling around her, soft lighting',
                   'The Blue Roses', 'The dress in the scene.', [], false
                ),
                createPhoto('categories/contemporary-con/glass', 'production-dance.jpg', undefined,
                   'Stage photo of Laura dancing with Jim, skirt swirling, movement capture',
                   'The Dance', 'Bias cut in motion.', [], false
                ),
                createPhoto('categories/contemporary-con/glass', 'amanda-dress.jpg', undefined,
                   'Faded floral print dress on form, 1930s house dress style, cotton voile',
                   'Amanda\'s Faded Glory', 'Contrast in character.', [], false
                ),
                createPhoto('categories/contemporary-con/glass', 'dye-test.jpg', undefined,
                   'Swatches of silk dyed in slightly different shades of blue, labeled',
                   'Blue Dye Tests', 'Finding the perfect shade.', [], false
                ),
                createPhoto('categories/contemporary-con/glass', 'ironing.jpg', undefined,
                   'Julian carefully steaming the finished dress on form, final touch up',
                   'Final Steam', 'Ready for stage.', [], false
                )
             ]
          }
       ]
    }
  ];

  return {
    id: pid,
    name: 'Julian Vane',
    role: 'Professional First Hand',
    location: 'London, UK',
    description: '35-year-old British-Nigerian man with a sharp gaze and short buzz cut.',
    basePrompt: 'A 35-year-old British-Nigerian man with a sharp, focused gaze, short buzz cut, clean-shaven, and a professional, meticulous demeanor.',
    profileImages,
    categories
  };
};

// --- EMMA RODRIGUEZ (Film Supervisor) ---

const generateEmmaData = (): Persona => {
    const pid = 'emma-rodriguez';
    
    const profileImages = [
      createPhoto('profile', 'headshot-primary.jpg', 'headshot_primary',
        'Professional studio portrait of a 48-year-old Latina woman, film costume supervisor, silver-streaked brown hair in chic bob, wearing navy blazer, confident warm expression, soft studio lighting',
        'Professional Headshot', 'Primary professional headshot.', ['profile'], true
      ),
      createPhoto('profile', 'selfie-trailer.jpg', 'selfie',
        'Smartphone selfie of Emma Rodriguez in a film production trailer, wearing headset and lanyard, costume racks visible, natural trailer lighting',
        'Trailer Selfie', 'Managing the wardrobe trailer.', ['profile'], true
      ),
      createPhoto('profile', 'on-set.jpg', 'candid',
         'Candid photo of Emma on film set, shot by set photographer, consulting continuity binder near video village monitors, active production environment',
         'Continuity Check', 'Consulting logs at video village.', ['profile'], true
      ),
      createPhoto('profile', 'wrap-party.jpg', 'candid',
         'Casual photo of Emma at a wrap party, taken by crew member, genuine smile, relaxed in casual clothes, holding a drink',
         'Wrap Party', 'Celebrating a successful shoot.', ['profile'], true
      ),
      createPhoto('profile', 'organizing-truck.jpg', 'candid',
         'Photo of Emma inside costume truck, checking labels on a long row of garment bags, clipboard in hand, focused',
         'Truck Load-in', 'Logistics management.', ['profile'], true
      )
    ];
  
    const categories: CategoryData[] = [
      {
        id: 'period-drama',
        name: 'Period Drama',
        slug: 'period-drama',
        description: 'Historical accuracy and massive wardrobe logistics.',
        projects: [
          {
            id: 'gilded-court',
            title: "The Gilded Court",
            slug: "the-gilded-court",
            description: "Supervising a cast of 200 for an 18th-century court drama.",
            isFeatured: true,
            projectDetails: { role: "Supervisor", scale: "200+ Extras" },
            photos: [
               createPhoto('categories/period/gilded', 'featured.jpg', undefined,
                  'Wide shot of costume tent filled with racks of colorful 18th century silk gowns and velvet coats, meticulously labeled and organized',
                  'Extras Wardrobe Tent', 'Organization of background wardrobe.', ['featured'], false
               ),
               createPhoto('categories/period/gilded', 'continuity-binder.jpg', undefined,
                  'Close up of open continuity binder showing polaroids of actors in period costume with detailed notes on accessories',
                  'The Continuity Bible', 'Tracking details for ballroom scene.', ['category_carousel'], false
               ),
               createPhoto('categories/period/gilded', 'tagging-system.jpg', undefined,
                  'Close up of color coded tags on hangers, labels reading "Courtier Group A", "Servants", "Guards"',
                  'Tagging System', 'Logistical organization.', [], false
               ),
               createPhoto('categories/period/gilded', 'set-still.jpg', undefined,
                   'Static film frame on a video monitor showing a period dinner scene, crisp image, monitor interface visible',
                   'Monitor Check', 'Verifying look on camera.', [], false
               ),
               createPhoto('categories/period/gilded', 'quick-change.jpg', undefined,
                   'Backstage chaos nicely organized, quick change booth setup with chair, mirror, and preset costume layers',
                   'Quick Change Booth', 'Prep for fast turnovers.', [], false
               ),
               createPhoto('categories/period/gilded', 'morning-prep.jpg', undefined,
                   'Early morning shot of costume crew steaming rows of dresses in the tent, steam rising in sunlight',
                   'Morning Steaming', 'Preparing for the day.', [], false
               ),
               createPhoto('categories/period/gilded', 'accessory-table.jpg', undefined,
                   'Table covered in period fans, gloves, and jewelry, organized by character trays',
                   'Accessory Management', 'Keeping track of small items.', [], false
               ),
               createPhoto('categories/period/gilded', 'check-in.jpg', undefined,
                   'Emma checking in extras at a table, handing out vouchers, line of people in background',
                   'Extras Check-in', 'Managing the crowd.', [], false
               ),
               createPhoto('categories/period/gilded', 'production-ballroom.jpg', undefined,
                   'Wide production still of ballroom scene, hundreds of extras in costume, chandeliers',
                   'The Ballroom', 'The result of logistics.', [], false
               ),
               createPhoto('categories/period/gilded', 'production-garden.jpg', undefined,
                   'Outdoor production still of extras walking in garden, sun umbrellas, bright light',
                   'Garden Party', 'Managing outdoor continuity.', [], false
               ),
               createPhoto('categories/period/gilded', 'mud-removal.jpg', undefined,
                   'Costume assistant cleaning hem of a dress with brush and spray bottle, bucket of water',
                   'On-set Maintenance', 'Dealing with location dirt.', [], false
               ),
               createPhoto('categories/period/gilded', 'wrap-out.jpg', undefined,
                   'Rows of garment bags loaded into a truck, empty racks visible',
                   'Wrap Out', 'Packing up the production.', [], false
               )
            ]
          },
          {
             id: 'pride-prejudice',
             title: "Pride & Prejudice TV",
             slug: "pride-prejudice",
             description: "BBC-style miniseries requiring muddy realism.",
             isFeatured: false,
             photos: [
                createPhoto('categories/period/pride', 'featured.jpg', undefined,
                   'Row of mud-stained empire waist dresses hanging on a rack, labeled with character names, outdoors in a field tent',
                   'Field Wardrobe', 'Location shooting organization.', ['featured'], false
                ),
                createPhoto('categories/period/pride', 'aging-process.jpg', undefined,
                   'Close up of hem of white dress showing applied mud and grass stains for continuity, continuity book visible next to it',
                   'Hem Distress', 'Matching mud levels for Scene 12.', [], false
                ),
                createPhoto('categories/period/pride', 'boots-row.jpg', undefined,
                   'Row of muddy period boots lined up on a tarp, labeled with actor names',
                   'Boot Management', 'Managing footwear conditions.', [], false
                ),
                createPhoto('categories/period/pride', 'warm-coats.jpg', undefined,
                   'Cast chairs with large modern puffer coats labeled with actor names, period costumes peeking out underneath',
                   'Warm-up Coats', 'Keeping actors warm between takes.', [], false
                ),
                createPhoto('categories/period/pride', 'on-set-monitor.jpg', undefined,
                   'Emma looking at portable monitor in a field, rain cover over equipment, checking scene',
                   'Field Monitor', 'Checking continuity in rain.', [], false
                ),
                createPhoto('categories/period/pride', 'production-walk.jpg', undefined,
                   'Production still of actors walking across muddy field, wind blowing dresses, overcast sky',
                   'The Long Walk', 'Realistic conditions.', [], false
                ),
                createPhoto('categories/period/pride', 'production-carriage.jpg', undefined,
                   'Production still of actors entering a carriage, Emma adjusting the dress train just out of frame',
                   'Carriage Entry', 'Assisting the action.', [], false
                ),
                createPhoto('categories/period/pride', 'laundry-setup.jpg', undefined,
                   'Industrial washer and dryer setup in a trailer, piles of white linens',
                   'Mobile Laundry', 'Cleaning the mud daily.', [], false
                ),
                createPhoto('categories/period/pride', 'bonnet-rack.jpg', undefined,
                   'Wall of bonnets on pegs, organized by character',
                   'Millinery Storage', 'Protecting the hats.', [], false
                ),
                createPhoto('categories/period/pride', 'rain-prep.jpg', undefined,
                   'Crew putting plastic capes over extras between takes to protect costumes from rain',
                   'Rain Protection', 'Saving the silk.', [], false
                ),
                createPhoto('categories/period/pride', 'night-shoot.jpg', undefined,
                   'Set lit by large lights at night, breath visible, costumes looking cold',
                   'Night Shoot', 'Late night logistics.', [], false
                ),
                createPhoto('categories/period/pride', 'continuity-notes.jpg', undefined,
                   'Close up of script page with detailed handwritten notes about scarf position and mud level',
                   'Script Notes', 'Detailed tracking.', [], false
                )
             ]
          }
        ]
      },
      {
          id: 'action-thriller',
          name: 'Action & Thriller',
          slug: 'action-thriller',
          description: 'Tactical gear, blood continuity, and stunt doubles.',
          projects: [
              {
                  id: 'protocol-7',
                  title: "Protocol 7",
                  slug: "protocol-7",
                  description: "Managing multiples for a high-intensity spy thriller.",
                  isFeatured: true,
                  photos: [
                      createPhoto('categories/action/protocol', 'featured.jpg', undefined,
                          'Rack of five identical tactical vests and grey t-shirts labeled "Stunt 1", "Stunt 2", "Hero Clean", "Hero Dirty", "Hero Blood"',
                          'Multiples Management', 'Breakdown of multiples for action sequence.', ['featured'], false
                      ),
                      createPhoto('categories/action/protocol', 'breakdown-table.jpg', undefined,
                          'Table with 5 identical grey t-shirts laid out, progressive stages of dirt and blood applied',
                          'Progression Layout', 'Visualizing the timeline of damage.', [], false
                      ),
                      createPhoto('categories/action/protocol', 'blood-mix.jpg', undefined,
                          'Bottles of fake blood labeled with different types "Dried", "Fresh", "Scab", brushes',
                          'Blood Kit', 'Tools for blood continuity.', [], false
                      ),
                      createPhoto('categories/action/protocol', 'distress-continuity.jpg', undefined,
                          'Close up of tactical jacket with artificially applied dust, matching a reference photo held next to it',
                          'Matching Distress', 'Ensuring consistency.', [], false
                      ),
                      createPhoto('categories/action/protocol', 'on-set-stunt.jpg', undefined,
                          'Emma Rodriguez standing next to stunt actor in tactical gear, adjusting a strap, film crew in background',
                          'Stunt Check', 'Final safety and look check.', [], false
                      ),
                      createPhoto('categories/action/protocol', 'double-check.jpg', undefined,
                          'Lead actor and stunt double standing side by side in identical costumes, back view',
                          'The Double', 'Verifying the match.', [], false
                      ),
                      createPhoto('categories/action/protocol', 'production-fight.jpg', undefined,
                          'Action shot of fight scene, blurry movement, blood visible on shirt',
                          'The Fight', 'Costume in action.', [], false
                      ),
                      createPhoto('categories/action/protocol', 'production-explosion.jpg', undefined,
                          'Wide shot of explosion scene, actor running away, clothes covered in dust',
                          'Aftermath', 'Dust continuity.', [], false
                      ),
                      createPhoto('categories/action/protocol', 'harness-rig.jpg', undefined,
                          'Costume with hole cut for harness wire, hidden by flap, technical detail',
                          'Harness Rig', ' accommodating stunts.', [], false
                      ),
                      createPhoto('categories/action/protocol', 'reset.jpg', undefined,
                          'Costume assistant cleaning a "Hero Clean" version of the costume with lint roller',
                          'The Reset', 'Preparing for take 2.', [], false
                      ),
                      createPhoto('categories/action/protocol', 'night-rain.jpg', undefined,
                          'Actor standing in rain machine, wet look continuity',
                          'Wet Down', 'Managing wet costumes.', [], false
                      ),
                      createPhoto('categories/action/protocol', 'continuity-ipad.jpg', undefined,
                          'Screen of iPad showing continuity app with photos of blood stains, timestamped',
                          'Digital Logging', 'Modern continuity tools.', [], false
                      )
                  ]
              }
          ]
      },
      {
         id: 'contemporary-film',
         name: 'Contemporary Film',
         slug: 'contemporary-film',
         description: 'Modern settings and realistic wardrobes.',
         projects: [
            {
               id: 'city-lights',
               title: "City of Lights",
               slug: "city-lights",
               description: "Indie drama requiring authentic street style.",
               isFeatured: false,
               photos: [
                  createPhoto('categories/contemporary/city', 'featured.jpg', undefined,
                     'Mood board on wall of trailer showing polaroids of street style, swatches of denim and flannel, character map',
                     'Character Map', 'Visualizing the ensemble look.', ['featured'], false
                  ),
                  createPhoto('categories/contemporary/city', 'shopping-bags.jpg', undefined,
                     'Rear of SUV filled with shopping bags from various stores and garment bags, tagged and organized',
                     'Returns & Pulls', 'Managing logistics for contemporary sourcing.', [], false
                  ),
                  createPhoto('categories/contemporary/city', 'receipts.jpg', undefined,
                     'Pile of receipts being organized into folders, calculator visible',
                     'Budget Tracking', 'The unglamorous side.', [], false
                  ),
                  createPhoto('categories/contemporary/city', 'fitting-contemporary.jpg', undefined,
                     'Fitting photo of actor in jeans and t-shirt, Emma taking photo with phone for approval',
                     'Look Approval', 'Getting sign-off from director.', [], false
                  ),
                  createPhoto('categories/contemporary/city', 'tag-removal.jpg', undefined,
                     'Close up of cutting tags off a new shirt, pile of tags on table',
                     'Prep Work', 'Making it ready for camera.', [], false
                  ),
                  createPhoto('categories/contemporary/city', 'aging-denim.jpg', undefined,
                     'Sanding the knees of a new pair of jeans to make them look worn',
                     'Breaking In', 'Removing the "new" look.', [], false
                  ),
                  createPhoto('categories/contemporary/city', 'production-cafe.jpg', undefined,
                     'Production still of two actors talking in a coffee shop, naturalistic clothing',
                     'Cafe Scene', 'Authentic contemporary look.', [], false
                  ),
                  createPhoto('categories/contemporary/city', 'production-street.jpg', undefined,
                     'Wide shot of actors walking down busy street, blending in with real crowd',
                     'Street Scene', 'Blending with reality.', [], false
                  ),
                  createPhoto('categories/contemporary/city', 'change-van.jpg', undefined,
                     'Inside of a sprinter van set up as mobile wardrobe, actor changing',
                     'Mobile Unit', 'Guerrilla filmmaking logistics.', [], false
                  ),
                  createPhoto('categories/contemporary/city', 'kit-bag.jpg', undefined,
                     'Emma\'s set bag open, showing tape, safety pins, sewing kit, stain remover',
                     'Set Bag', 'Ready for anything.', [], false
                  ),
                  createPhoto('categories/contemporary/city', 'monitor-reflection.jpg', undefined,
                     'Artistic shot of the scene reflected in the monitor, Emma watching intently',
                     'Watching the Frame', 'Focus on details.', [], false
                  ),
                  createPhoto('categories/contemporary/city', 'wrap.jpg', undefined,
                     'Empty racks in the trailer, boxes taped up labeled "Returns" and "Asset Storage"',
                     'Project Wrap', 'Closing the production.', [], false
                  )
               ]
            }
         ]
      }
    ];
  
    return {
      id: pid,
      name: 'Emma Rodriguez',
      role: 'Film Supervisor',
      location: 'Los Angeles, CA',
      description: '48-year-old Latina woman with silver-streaked brown hair in a chic bob.',
      basePrompt: 'A 48-year-old Latina woman with a chic brown bob haircut that has prominent silver streaks. She has an authoritative and confident look.',
      profileImages,
      categories
    };
  };

export const INITIAL_PERSONAS: Persona[] = [
  generateSarahData(),
  generateJulianData(),
  generateEmmaData()
];
