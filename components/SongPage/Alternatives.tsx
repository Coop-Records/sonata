import { capitalize, isEmpty } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AlternativesSkeleton from "./AlternativesSkeleton";

type IObject = { [key: string]: string };
const platformIcons: IObject = { spotify: '/images/spotify.png', youtube: '/images/youtube.svg', soundcloud: '/images/soundcloud.png' };

export default function SongAlternatives({ trackUrl }: { trackUrl: string }) {
  const [alternatives, setAlternative] = useState<IObject>({});

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/songLink/fetchLink?trackUrl=${encodeURIComponent(trackUrl)}`);
      const data = await response.json();

      setAlternative(() => {
        const platforms: any = {};
        for (const [name, value] of Object.entries<any>(data.linksByPlatform)) {
          if (!Object.keys(platformIcons).includes(name)) continue;
          platforms[name] = value.url;
        }

        return platforms;
      });
    })();
  }, [])

  return (
    <div className="flex flex-wrap gap-4">
      {isEmpty(alternatives) ? <AlternativesSkeleton count={3} /> : null}
      {Object.entries(alternatives).map(([key, value]) => {
        return (
          <Link
            href={`${window.location.origin}/song/${value}`}
            className="w-28 hover:opacity-80"
            key={key}>
            <Image alt={key} width={42} height={42} src={platformIcons[key]} className="mx-auto" />
            <p className="text-center text-sm">{capitalize(key)}</p>
          </Link>
        )
      })}
    </div>
  )
}