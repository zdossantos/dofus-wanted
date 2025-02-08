// components/interface/(wanteds)/(wanteds)-list.tsx
import { WantedCard } from '@/components/interface/wanted/wanted-card';
import { SelectWanted } from '@/lib/db';
import { saveLastSeen } from '@/components/queries/SaveLastSeen';

// wanted-list.tsx
export default function WantedList(props: {
	wanteds: SelectWanted[];
	serverId: number;
}) {
	const handleSubmit = (wanted: SelectWanted, date: Date) => {
		saveLastSeen({
			wanted_id: wanted.id,
			server_id: props.serverId,
			last_seen_at: new Date(date)
		});
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{props.wanteds.map((wanted) => (
				<WantedCard
					key={wanted.id}
					wanted={wanted}
					minDelay={180}
					maxDelay={540}
					onSubmit={(date) => handleSubmit(wanted, date)}
					serverId={props.serverId}
				/>
			))}
		</div>
	);
}