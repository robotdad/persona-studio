
import { GoogleGenAI } from "@google/genai";
import { ModelType } from "../types";

export class GeminiService {
  private static getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  static async generateImage(
    prompt: string, 
    model: ModelType, 
    referenceImages: string[] = [],
    isAnchorGeneration: boolean = false
  ): Promise<string> {
    const ai = this.getAI();
    const parts: any[] = [];
    
    // 1. Add reference images if provided
    for (const b64 of referenceImages) {
      const cleanB64 = b64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
      parts.push({
        inlineData: {
          mimeType: 'image/png',
          data: cleanB64
        }
      });
    }

    const isRefMode = referenceImages.length > 0;
    
    let finalPrompt = "";

    // MODE 1: IDENTITY INJECTION (We have refs, so we force the persona into the scene)
    if (isRefMode) {
      finalPrompt = `STRICT IDENTITY CONSISTENCY MODE: 
      The person in the attached reference images is the ONLY valid character for this scene.
      - MAINTAIN EXACT FACIAL BIOMETRICS: Replicate eye shape, nose bridge, jawline, and brow structure exactly.
      - SKIN TONE & ETHNICITY: Match the specific skin tone depth and undertones precisely.
      - HAIR & GROOMING: Ensure the hair texture and style matches the master reference.
      - SCENE INTEGRATION: Place this specific person into the scene described below.
      
      SCENE DESCRIPTION: ${prompt}`;
    } 
    // MODE 2: MASTER ANCHOR GENERATION (Creating the first headshot)
    else if (isAnchorGeneration) {
      finalPrompt = `MASTER IDENTITY GENERATION:
      Generate a high-fidelity, high-resolution professional image to serve as a character's master reference.
      
      CHARACTER SPEC: ${prompt}
      STYLE: 85mm lens, sharp focus, professional studio lighting, realistic textures, neutral background.`;
    } 
    // MODE 3: STANDARD SCENE/PORTFOLIO (Production shots, details, sketches - NO IDENTITY ENFORCEMENT)
    else {
      finalPrompt = `SCENE GENERATION:
      ${prompt}
      
      NOTE: Follow the lighting and camera style described in the prompt exactly (e.g. if it says "grainy phone photo", make it grainy. If it says "stage lighting", use theatrical lighting). Do not force studio lighting unless requested.`;
    }

    parts.push({ text: finalPrompt });

    // 3. Configure the model
    const imageConfig: any = {
      aspectRatio: "4:3",
    };

    // Use 2K resolution for Pro model
    if (model === 'gemini-3-pro-image-preview') {
      imageConfig.imageSize = "2K";
    }

    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: { parts },
        config: {
          imageConfig: imageConfig
        },
      });

      let imageUrl = "";
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (!imageUrl) {
        throw new Error("The model did not return an image part.");
      }

      return imageUrl;
    } catch (error: any) {
      console.error("Gemini Image Generation Error:", error);
      if (error.message?.includes("entity was not found") || error.message?.includes("403")) {
        throw new Error("API_KEY_RESET_REQUIRED");
      }
      throw error;
    }
  }

  static async hasKey(): Promise<boolean> {
    // @ts-ignore
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      // @ts-ignore
      return await window.aistudio.hasSelectedApiKey();
    }
    return true;
  }

  static async openKeySelector() {
    // @ts-ignore
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }
  }
}
