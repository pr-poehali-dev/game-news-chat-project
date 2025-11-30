import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HomePage from '@/components/HomePage';
import ChatSection from '@/components/ChatSection';
import ProfileSection from '@/components/ProfileSection';

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
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        setNotifications={setNotifications}
      />

      <main className="container mx-auto px-4 py-8">
        <HomePage 
          setActiveTab={setActiveTab}
          newsItems={newsItems}
          gamesCatalog={gamesCatalog}
          activeTab={activeTab}
        />

        {activeTab === 'chat' && (
          <ChatSection 
            chatMessages={chatMessages}
            userInput={userInput}
            setUserInput={setUserInput}
            handleSendMessage={handleSendMessage}
            bots={bots}
            formatTime={formatTime}
            renderMessage={renderMessage}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileSection 
            userAchievements={userAchievements}
            chatMessages={chatMessages}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
