// components/interface/wanted/wanted-list.tsx
'use client';
import { WantedCard } from '@/components/interface/wanted/wanted-card';
import { SelectWanted } from '@/lib/db';
export default function WantedList(props: {
  wanteds: SelectWanted[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {props.wanteds.map((wanted) => (
        <WantedCard
          key={wanted.id}
          wanted={wanted}
          minDelay={180}
          maxDelay={540}
          lastSeenAt={new Date(Date.now())}
        />
      ))}
    </div>
  );
}