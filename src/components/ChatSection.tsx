import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface ChatSectionProps {
  chatMessages: Message[];
  userInput: string;
  setUserInput: (input: string) => void;
  handleSendMessage: () => void;
  bots: Array<{ name: string; color: string; }>;
  formatTime: (date: Date) => string;
  renderMessage: (msg: Message) => React.ReactNode;
}

const ChatSection = ({ 
  chatMessages, 
  userInput, 
  setUserInput, 
  handleSendMessage, 
  bots,
  formatTime,
  renderMessage
}: ChatSectionProps) => {
  return (
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
  );
};

export default ChatSection;
