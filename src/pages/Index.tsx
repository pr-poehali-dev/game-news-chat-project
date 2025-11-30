import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
  isBot: boolean;
  avatarColor: string;
}

interface Notification {
  id: string;
  messageId: string;
  text: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userAchievements, setUserAchievements] = useState<string[]>([]);

  const bots = [
    { name: 'CyberBot', color: 'from-purple-500 to-pink-500' },
    { name: 'NeonAI', color: 'from-blue-500 to-cyan-500' },
    { name: 'PixelMind', color: 'from-orange-500 to-red-500' }
  ];

  const newsItems = [
    {
      id: 1,
      title: 'DOOM запустили на радаре аэропорта',
      category: 'Новости',
      date: '30 ноября 2024',
      excerpt: 'Энтузиасты умудрились портировать легендарный шутер на систему управления воздушным движением...',
      image: '🎮'
    },
    {
      id: 2,
      title: 'GTA VI выйдет в 2025 году',
      category: 'Анонсы',
      date: '29 ноября 2024',
      excerpt: 'Rockstar Games официально подтвердила дату релиза самой ожидаемой игры десятилетия...',
      image: '🚗'
    },
    {
      id: 3,
      title: 'Новый патч для Cyberpunk 2077',
      category: 'Обновления',
      date: '28 ноября 2024',
      excerpt: 'CD Projekt RED выпустила масштабное обновление, которое улучшает производительность на 40%...',
      image: '🌃'
    }
  ];

  const gamesCatalog = [
    { id: 1, name: 'The Last of Us Part II', genre: 'Action', platform: 'PS5', rating: 9.5, emoji: '🧟' },
    { id: 2, name: 'Elden Ring', genre: 'RPG', platform: 'Multi', rating: 9.8, emoji: '⚔️' },
    { id: 3, name: 'Baldur\'s Gate 3', genre: 'RPG', platform: 'PC', rating: 9.7, emoji: '🐉' },
    { id: 4, name: 'Starfield', genre: 'RPG', platform: 'Xbox', rating: 8.5, emoji: '🚀' },
    { id: 5, name: 'Spider-Man 2', genre: 'Action', platform: 'PS5', rating: 9.2, emoji: '🕷️' },
    { id: 6, name: 'Hogwarts Legacy', genre: 'RPG', platform: 'Multi', rating: 8.8, emoji: '🪄' }
  ];

  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        author: 'CyberBot',
        text: 'Привет всем! Кто-нибудь пробовал новый патч для Cyberpunk?',
        timestamp: new Date(Date.now() - 300000),
        isBot: true,
        avatarColor: 'from-purple-500 to-pink-500'
      },
      {
        id: '2',
        author: 'NeonAI',
        text: 'Да! Производительность заметно улучшилась 🚀',
        timestamp: new Date(Date.now() - 240000),
        isBot: true,
        avatarColor: 'from-blue-500 to-cyan-500'
      },
      {
        id: '3',
        author: 'PixelMind',
        text: 'А я жду GTA VI! Кто со мной?',
        timestamp: new Date(Date.now() - 180000),
        isBot: true,
        avatarColor: 'from-orange-500 to-red-500'
      }
    ];
    setChatMessages(initialMessages);

    const botChatInterval = setInterval(() => {
      const randomBot = bots[Math.floor(Math.random() * bots.length)];
      const topics = [
        'Кто-нибудь играл в новые инди-игры?',
        'Baldur\'s Gate 3 - лучшая RPG года!',
        'Жду анонсы на The Game Awards 🎮',
        'Elden Ring DLC скоро выйдет!',
        'Какой ваш любимый жанр игр?'
      ];
      
      const newMessage: Message = {
        id: Date.now().toString(),
        author: randomBot.name,
        text: topics[Math.floor(Math.random() * topics.length)],
        timestamp: new Date(),
        isBot: true,
        avatarColor: randomBot.color
      };

      setChatMessages(prev => [...prev, newMessage]);
    }, 15000);

    return () => clearInterval(botChatInterval);
  }, []);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const mentionMatch = userInput.match(/@(\w+)/g);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      author: 'Игрок',
      text: userInput,
      timestamp: new Date(),
      isBot: false,
      avatarColor: 'from-green-500 to-emerald-500'
    };

    setChatMessages(prev => [...prev, userMessage]);

    if (chatMessages.length >= 5 && !userAchievements.includes('Активный участник')) {
      setUserAchievements(prev => [...prev, 'Активный участник']);
    }

    setTimeout(() => {
      bots.forEach((bot, index) => {
        setTimeout(() => {
          const responses = [
            `Интересная мысль! 🎮`,
            `Полностью согласен с тобой!`,
            `Отличный вопрос! Дай подумаю...`,
            `Это точно! 💯`,
            `Ха-ха, классно сказано!`
          ];
          
          const botResponse: Message = {
            id: `${Date.now()}-${index}`,
            author: bot.name,
            text: `@Игрок ${responses[Math.floor(Math.random() * responses.length)]}`,
            timestamp: new Date(),
            isBot: true,
            avatarColor: bot.color
          };

          setChatMessages(prev => [...prev, botResponse]);
          
          const notification: Notification = {
            id: `notif-${Date.now()}-${index}`,
            messageId: botResponse.id,
            text: `${bot.name} упомянул вас`
          };
          setNotifications(prev => [...prev, notification]);
        }, index * 1000);
      });
    }, 500);

    setUserInput('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (msg: Message) => {
    const parts = msg.text.split(/(@\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} className="text-primary font-semibold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-background">
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

      <main className="container mx-auto px-4 py-8">
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

        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
            <Card className="lg:col-span-3 flex flex-col h-[600px]">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={24} />
                  Живой чат
                  <Badge variant="secondary" className="ml-2">
                    {chatMessages.length} сообщений
                  </Badge>
                </CardTitle>
              </CardHeader>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="flex items-start gap-3 animate-slide-up">
                      <Avatar>
                        <AvatarFallback className={`bg-gradient-to-br ${msg.avatarColor}`}>
                          {msg.author[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{msg.author}</span>
                          {msg.isBot && <Badge variant="outline" className="text-xs">AI</Badge>}
                          <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                        </div>
                        <p className="text-sm">{renderMessage(msg)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Напишите сообщение... Используйте @ для упоминаний"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">AI-боты онлайн</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <div className="space-y-3">
                  {bots.map(bot => (
                    <div key={bot.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className={`bg-gradient-to-br ${bot.color}`}>
                            {bot.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{bot.name}</p>
                        <p className="text-xs text-muted-foreground">Онлайн</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-500 text-2xl">
                      И
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">Игрок</CardTitle>
                    <p className="text-muted-foreground">Участник GameZone</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Trophy" size={20} />
                    Достижения
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {userAchievements.length > 0 ? (
                      userAchievements.map(achievement => (
                        <Badge key={achievement} variant="secondary" className="px-3 py-1">
                          🏆 {achievement}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Отправьте 5 сообщений в чате, чтобы получить первое достижение!
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="BarChart" size={20} />
                    Статистика
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Сообщений</p>
                      <p className="text-2xl font-bold text-primary">
                        {chatMessages.filter(m => !m.isBot).length}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Достижений</p>
                      <p className="text-2xl font-bold text-secondary">
                        {userAchievements.length}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
