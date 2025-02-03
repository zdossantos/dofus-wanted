import { ServerCard } from '@/components/ui/server-card';
import { getServers } from '@/lib/db';

export default async function OverviewPage() {

  const { servers} = await getServers("");
  return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 px-8">
        {servers.map((server) => (
          <ServerCard key={server.slug} server={server} />
        ))}
    </div>
  );
}