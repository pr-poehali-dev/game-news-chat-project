import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { initializeLlama, LoadProgress } from '@/lib/llama';

interface ModelLoaderProps {
  onLoadComplete: () => void;
}

const ModelLoader = ({ onLoadComplete }: ModelLoaderProps) => {
  const [progress, setProgress] = useState<LoadProgress>({
    progress: 0,
    status: 'Подготовка...',
    loaded: false
  });

  useEffect(() => {
    const loadModel = async () => {
      await initializeLlama((progressData) => {
        setProgress(progressData);
        if (progressData.loaded) {
          setTimeout(() => {
            onLoadComplete();
          }, 1000);
        }
      });
    };

    loadModel();
  }, [onLoadComplete]);

  if (progress.loaded) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 border-primary/50 shadow-2xl shadow-primary/20">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="text-6xl animate-pulse">🤖</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Загрузка AI-моделей
            </h2>
            <p className="text-muted-foreground">
              {progress.status}
            </p>
          </div>

          <div className="space-y-2">
            <Progress value={progress.progress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Llama-3.2-1B</span>
              <span>{progress.progress}%</span>
            </div>
          </div>

          <div className="text-xs text-center text-muted-foreground">
            Загружается нейросеть для живого общения в чате
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelLoader;
