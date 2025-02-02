"use client"

import { Card, CardContent } from '@/components/ui/card';
import { Monster } from '../../queries/wanted';
import Image from 'next/image';
import DelayBadge from '@/components/ui/DelayBadge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface MonsterCardProps {
  monster: Monster;
  lastSeenAt?: Date;
  minDelay: number;
  maxDelay: number;
}

const LevelBadge = ({ level }: { level: number }) => (
  <div className="absolute top-2 right-2 bg-black/80 text-white px-3 py-1 rounded-full z-10">
    <span className="font-bold">Niv. {level}</span>
  </div>
);

export function WantedCard({ monster, lastSeenAt, minDelay, maxDelay }: MonsterCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const level = monster.level || Math.max(...monster.grades.map(g => g.level));

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative">
      <LevelBadge level={level} />
      <div className={'relative group'}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(true)}
          className={`absolute  left-2 z-50 top-2 gap-2 invisible group-hover:visible`}
        >
          <Pencil  size={16} />
          Modifier
        </Button>
        <div className={""}>
      <DelayBadge
        lastSeenAt={lastSeenAt}
        minDelay={minDelay}
        maxDelay={maxDelay}
      />
        </div>
      </div>
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

        {isEditing && (
          <div className="absolute z-50 inset-0 backdrop-blur p-2 flex flex-col items-center justify-end gap-2">
              <Input
                type="datetime-local"
                placeholder="Heure de la journée"
                defaultValue={new Date().toLocaleString('sv').slice(0, 16)}
                className="[color-scheme:light] dark:[color-scheme:dark] flex justify-center"
              />
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="mt-2"
            >
              Fermer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}