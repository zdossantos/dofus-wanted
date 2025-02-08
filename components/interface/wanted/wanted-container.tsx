// components/interface/(wanteds)/(wanteds)-container.tsx
'use client';
import { SelectWanted, SortBy } from '@/lib/db';
import WantedList from './wanted-list';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function WantedContainer(props: { wanteds: SelectWanted[]; serverId: number }) {
	const { t } = useTranslation();

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
			<div className="w-full flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
				<Tabs
					value={selectedTab}
					onValueChange={setSelectedTab}
					className="flex-1"
				>
					<TabsList className="mx-auto">
						<TabsTrigger value="120">{t('common:wanteds.120')}</TabsTrigger>
						<TabsTrigger value="all">{t('common:wanteds.all')}</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="flex items-center gap-2 flex-col md:flex-row">
					<Select
						value={sortOrder}
						onValueChange={(value: SortBy) => setSortOrder(value)}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder={t('common:order.level.title')} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="asc">{t('common:order.level.asc')}</SelectItem>
							<SelectItem value="desc">{t('common:order.level.desc')}</SelectItem>
						</SelectContent>
					</Select>

					<Input
						type="search"
						placeholder={t('common:search_wanted')}
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