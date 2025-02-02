// app/(overview)/page.tsx
'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWanted } from '../../queries/wanted';
import { WantedCard } from '@/components/ui/wanted-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortOrder = 'asc' | 'desc';

export default function OverviewPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('120');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useWanted({
    maxLevel: selectedTab === '120' ? 120 : undefined,
    sortOrder: sortOrder,
  });

  // Filtrer les monstres en fonction du terme de recherche
  const filteredMonsters = data?.pages.flatMap(page =>
    page.data.filter(monster =>
      monster.name.fr.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  return (
    <div className="container flex flex-col items-center justify-center p-4">
      <div className="w-full flex items-center justify-between mb-4 gap-4">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="flex-1"
        >
          <TabsList className="mx-auto">
            <TabsTrigger value="120">120</TabsTrigger>
            <TabsTrigger value="all">all</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Select
            value={sortOrder}
            onValueChange={(value: SortOrder) => setSortOrder(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Niveau (croissant)</SelectItem>
              <SelectItem value="desc">Niveau (décroissant)</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="search"
            placeholder="Rechercher un monstre..."
            className="max-w-[200px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMonsters.map((monster) => (
          <WantedCard key={monster._id} monster={monster} minDelay={360} maxDelay={480} lastSeenAt={new Date(Date.now())} />
        ))}
      </div>

      {hasNextPage && (
        <div className="mt-4 text-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Chargement...'
              : 'Charger plus de monstres'}
          </Button>
        </div>
      )}
    </div>
  );
}