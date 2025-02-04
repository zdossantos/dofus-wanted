// components/interface/(wanteds)/(wanteds)-container.tsx
'use client';
import { SelectWanted, SortBy } from '@/lib/db';
import WantedList from './wanted-list';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function WantedContainer(props: { wanteds: SelectWanted[]; serverId: number }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedTab, setSelectedTab] = useState('120');
	const [sortOrder, setSortOrder] = useState<SortBy>('asc');

	const filteredWanteds = props.wanteds
		.filter(wanted => {
			// Filtre par recherche
			if (searchTerm && !wanted.slug.toLowerCase().includes(searchTerm.toLowerCase())) {
				return false;
			}
			// Filtre par tab
			if (selectedTab === '120' && wanted.level > 120) {
				return false;
			}
			return true;
		})
		.sort((a, b) => {
			// Tri par niveau
			return sortOrder === 'asc'
				? a.level - b.level
				: b.level - a.level;
		});

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
						onValueChange={(value: SortBy) => setSortOrder(value)}
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

			<WantedList
				wanteds={filteredWanteds}
				serverId={props.serverId}
			/>
		</div>
	);
}