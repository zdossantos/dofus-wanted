"use server";

import WantedContainer from '@/components/interface/wanted/wanted-container';
import { getWanteds } from '@/lib/db';

export default async function WantedPageContainer(props:{serverId:number}) {
	const { wanteds } = await getWanteds('', props.serverId);
	return (<WantedContainer wanteds={wanteds} serverId={props.serverId} />);
}