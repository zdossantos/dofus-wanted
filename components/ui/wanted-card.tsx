"use client"

import { Card, CardContent } from '@/components/ui/card';
import { Monster } from '../../queries/wanted';
import Image from 'next/image';
import DelayBadge from '@/components/ui/DelayBadge';

interface MonsterCardProps {
  monster: Monster;
  lastSeenAt?: Date;
  minDelay: number; // en minutes
  maxDelay: number; // en minutes
}


const LevelBadge = ({ level }: { level: number }) => (
  <div className="absolute top-2 right-2 bg-black/80 text-white px-3 py-1 rounded-full z-10">
    <span className="font-bold">Niv. {level}</span>
  </div>
);

export function WantedCard({ monster, lastSeenAt, minDelay, maxDelay }: MonsterCardProps) {
  const level = monster.level || Math.max(...monster.grades.map(g => g.level));

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative">
      <LevelBadge level={level} />
      <DelayBadge
        lastSeenAt={lastSeenAt}
        minDelay={minDelay}
        maxDelay={maxDelay}
      />
      <CardContent className="p-4 flex flex-col items-center justify-center">
        <div className="relative mb-2">
          <Image
            src={monster.img}
            alt={monster.name.fr}
            width={150}
            height={150}
            className="object-cover rounded-lg"
          />
        </div>
        <h3 className="text-center font-medium">{monster.name.fr}</h3>
      </CardContent>
    </Card>
  );
}