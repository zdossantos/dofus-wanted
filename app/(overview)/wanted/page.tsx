// app/(overview)/wanted/page.tsx
import WantedContainer from '@/components/interface/wanted/wanted-container';
import { getWanteds } from '@/lib/db';


export default async function WantedPage() {
  const {wanteds} = await getWanteds("");

  return (<WantedContainer wanteds={wanteds} />);
}