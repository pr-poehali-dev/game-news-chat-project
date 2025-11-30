import { pipeline, env } from '@xenova/transformers';

env.allowLocalModels = false;
env.allowRemoteModels = true;

let textGenerator: any = null;
let isLoading = false;
let loadingProgress = 0;

export interface LoadProgress {
  progress: number;
  status: string;
  loaded: boolean;
}

export const initializeLlama = async (
  onProgress?: (progress: LoadProgress) => void
): Promise<void> => {
  if (textGenerator) return;
  if (isLoading) return;

  isLoading = true;

  try {
    onProgress?.({ 
      progress: 10, 
      status: 'Инициализация Llama-3.2-1B...', 
      loaded: false 
    });

    textGenerator = await pipeline(
      'text-generation',
      'onnx-community/Llama-3.2-1B-Instruct',
      {
        progress_callback: (progress: any) => {
          if (progress.status === 'progress') {
            const percent = Math.floor((progress.loaded / progress.total) * 100);
            loadingProgress = percent;
            onProgress?.({
              progress: percent,
              status: `Загрузка модели: ${percent}%`,
              loaded: false
            });
          } else if (progress.status === 'done') {
            onProgress?.({
              progress: 100,
              status: 'Модель загружена!',
              loaded: true
            });
          }
        }
      }
    );

    isLoading = false;
    onProgress?.({ 
      progress: 100, 
      status: 'Готово!', 
      loaded: true 
    });
  } catch (error) {
    isLoading = false;
    console.error('Ошибка загрузки Llama:', error);
    onProgress?.({ 
      progress: 0, 
      status: 'Ошибка загрузки модели', 
      loaded: false 
    });
  }
};

export const generateResponse = async (
  prompt: string,
  maxTokens: number = 50
): Promise<string> => {
  if (!textGenerator) {
    await initializeLlama();
  }

  try {
    const result = await textGenerator(prompt, {
      max_new_tokens: maxTokens,
      temperature: 0.8,
      do_sample: true,
      top_k: 50,
      top_p: 0.9,
    });

    return result[0].generated_text.replace(prompt, '').trim();
  } catch (error) {
    console.error('Ошибка генерации:', error);
    return 'Интересная мысль! 🎮';
  }
};

export const isModelLoaded = (): boolean => {
  return textGenerator !== null;
};

export const getLoadingProgress = (): number => {
  return loadingProgress;
};
