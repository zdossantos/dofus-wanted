// app/(wanteds)/(wanteds)/page.tsx
import WantedContainer from '@/components/interface/wanted/wanted-container';
import { getWanteds } from '@/lib/db';

type Params = Promise<{ server_id: number }>

export default async function WantedPage(props: {
	params: Params
}) {
	const params = await props.params;
	const { wanteds } = await getWanteds('', params.server_id);

	return <WantedContainer wanteds={wanteds} serverId={params.server_id} />;
}
