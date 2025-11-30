import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  newsItems: Array<{
    id: number;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    image: string;
  }>;
  gamesCatalog: Array<{
    id: number;
    name: string;
    genre: string;
    platform: string;
    rating: number;
    emoji: string;
  }>;
  activeTab: string;
}

const HomePage = ({ setActiveTab, newsItems, gamesCatalog, activeTab }: HomePageProps) => {
  return (
    <>
      {activeTab === 'home' && (
        <div className="space-y-8 animate-fade-in">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-12 text-center">
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-4 animate-slide-up">
                Добро пожаловать в GameZone! 🎮
              </h2>
              <p className="text-xl text-foreground/90 mb-6">
                Игровые новости, каталог игр и живой чат с AI-сообществом
              </p>
              <Button size="lg" variant="secondary" onClick={() => setActiveTab('chat')}>
                Присоединиться к чату
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Icon name="TrendingUp" size={24} />
              Горячие новости
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsItems.map(news => (
                <Card key={news.id} className="hover:scale-105 transition-all duration-300 cursor-pointer bg-card hover:bg-card/80">
                  <CardHeader>
                    <div className="text-6xl mb-4 text-center">{news.image}</div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{news.category}</Badge>
                      <span className="text-xs text-muted-foreground">{news.date}</span>
                    </div>
                    <CardTitle className="text-lg">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{news.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'news' && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Icon name="Newspaper" size={32} />
            Игровые новости
          </h2>
          {newsItems.map(news => (
            <Card key={news.id} className="hover:border-primary transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{news.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary">{news.category}</Badge>
                      <span className="text-sm text-muted-foreground">{news.date}</span>
                    </div>
                    <CardTitle className="text-2xl mb-2">{news.title}</CardTitle>
                    <p className="text-muted-foreground">{news.excerpt}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'catalog' && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Icon name="Library" size={32} />
            Каталог игр
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamesCatalog.map(game => (
              <Card key={game.id} className="hover:scale-105 transition-all duration-300 cursor-pointer bg-card hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <div className="text-5xl mb-3 text-center">{game.emoji}</div>
                  <CardTitle className="text-xl">{game.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Жанр:</span>
                      <Badge variant="outline">{game.genre}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Платформа:</span>
                      <Badge variant="outline">{game.platform}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Рейтинг:</span>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-primary">{game.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
