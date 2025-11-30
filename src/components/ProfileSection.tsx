import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface ProfileSectionProps {
  userAchievements: string[];
  chatMessages: Message[];
}

const ProfileSection = ({ userAchievements, chatMessages }: ProfileSectionProps) => {
  return (
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
  );
};

export default ProfileSection;
