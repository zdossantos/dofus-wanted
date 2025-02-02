
import { Input } from '@/components/ui/input';
import { ServerCard } from '@/components/ui/server-card';
import { getServers } from '@/lib/db';

export default async function OverviewPage() {

  const { servers} = await getServers("", 0);
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-8">
        {servers.map((server) => (
          <ServerCard key={server.slug} server={server} />
        ))}
    </div>
  );
}