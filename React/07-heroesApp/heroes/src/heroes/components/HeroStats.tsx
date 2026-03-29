import { Badge } from '@/components/ui/badge'
import { Heart, Trophy, Users, Zap } from 'lucide-react'
import { HeroStatCard } from './HeroStatCard'


export const HeroStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatCard title="Total Characters" icon={<Users className="h-4 w-4 text-muted-foreground" />} description="16">
        <Badge variant="secondary" className="text-xs">
          12 Heroes
        </Badge>
        <Badge variant="destructive" className="text-xs">
          2 Villains
        </Badge>
      </HeroStatCard>

      <HeroStatCard title="Favorites" icon={<Heart className="h-4 w-4 text-muted-foreground" />} description='3' paragraph='18.8% of total' />
      <HeroStatCard title="Strongest" icon={<Zap className="h-4 w-4 text-muted-foreground" />} description='Superman' paragraph='Strength: 10/10' />
      <HeroStatCard title="Smartest" icon={<Trophy className="h-4 w-4 text-muted-foreground" />} description='Batman' paragraph='Intelligence: 10/10' />
    </div>
  )
}
