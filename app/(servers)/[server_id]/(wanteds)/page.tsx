// app/(wanteds)/(wanteds)/page.tsx
import WantedContainer from '@/components/interface/wanted/wanted-container';
import { getWanteds } from '@/lib/db';


export default async function WantedPage({ params }: {
	params: { server_id: number }
}) {
	const { wanteds } = await getWanteds('', params.server_id);

	return (<WantedContainer wanteds={wanteds} serverId={params.server_id} />);
}