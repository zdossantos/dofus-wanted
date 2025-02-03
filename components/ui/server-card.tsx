import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { SelectServer } from '@/lib/db';

export const ServerCard = (props: { server: SelectServer }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative h-60  group cursor-pointer">
      <Image
        src={"/img/servers/" + props.server.img_slug+".webp"}
        alt={props.server.slug}
        width={5000}
        height={5000}
        className="object-cover rounded-lg absolute mb-2 size-full group-hover:scale-105 transition"
      />
      <CardContent className="flex flex-col items-center justify-center  rounded-t-lg absolute bottom-0 w-full px-4 backdrop-blur text-xl font-bold h-12 p-0 bg-background/50">
        <h3 className="text-center font-medium">{props.server.slug}</h3>
      </CardContent>
    </Card>
  );
};