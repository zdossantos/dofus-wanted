import { ServerCard } from '@/components/ui/server-card';
import { getServers } from '@/lib/db';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function ServersPage() {

	const { servers } = await getServers('');
	return (
		<Tabs defaultValue={'mono'} className={'flex flex-col items-center justify-center flex-1'}>
			<TabsList>
				<TabsTrigger value="mono">Mono</TabsTrigger>
				<TabsTrigger value="multi">Multi</TabsTrigger>
			</TabsList>
			<TabsContent value="multi" asChild>
				<div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 px-8 w-full">
					{servers.filter((server) => !server.mono).map((server) => (
						<ServerCard key={server.slug} server={server} />
					))}
				</div>
			</TabsContent>
			<TabsContent value="mono" asChild>
				<div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 px-8 w-full">
					{servers.filter((server) => server.mono).map((server) => (
						<ServerCard key={server.slug} server={server} />
					))}
				</div>
			</TabsContent>
		</Tabs>
	);
}