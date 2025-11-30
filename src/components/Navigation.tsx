import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: { id: string; messageId: string; text: string; }[];
  setNotifications: (notifications: { id: string; messageId: string; text: string; }[]) => void;
}

const Navigation = ({ activeTab, setActiveTab, notifications, setNotifications }: NavigationProps) => {
  return (
    <>
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎮</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GameZone
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('home')}>
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('news')}>
              <Icon name="Newspaper" size={18} className="mr-2" />
              Новости
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('catalog')}>
              <Icon name="Library" size={18} className="mr-2" />
              Каталог
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('chat')}>
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Чат
              {notifications.length > 0 && (
                <Badge className="ml-2 bg-accent animate-pulse">{notifications.length}</Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('profile')}>
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
          </div>
        </div>
      </nav>

      {notifications.length > 0 && (
        <div className="fixed top-20 right-4 z-50 animate-slide-up">
          <Card className="bg-accent/90 backdrop-blur-sm border-accent">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="text-2xl animate-bounce">@</div>
              <div>
                <p className="font-semibold">Новые упоминания</p>
                <p className="text-sm text-muted-foreground">{notifications.length} уведомлений</p>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => {
                  setActiveTab('chat');
                  setNotifications([]);
                }}
              >
                Открыть
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Navigation;
