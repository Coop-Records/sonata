import { useSongPageProvider } from "@/providers/SongPageProvider";
import { capitalize, isEmpty } from "lodash";
import Image from "next/image";
import Link from "next/link";
import AlternativesSkeleton from "./AlternativesSkeleton";

export default function SongAlternatives() {
  const { alternatives, platformIcons } = useSongPageProvider();

  return (
    <div className="flex flex-wrap gap-4">
      {isEmpty(alternatives) ? <AlternativesSkeleton count={3} /> : null}
      {Object
        .entries(alternatives)
        .sort(([key1], [key2]) => key1.localeCompare(key2))
        .map(([key, value]) => (
          <Link
            href={`${window.location.origin}/song/${value}`}
            className="w-28 hover:opacity-80"
            key={key}>
            <Image alt={key} width={42} height={42} src={platformIcons[key]} className="mx-auto" />
            <p className="text-center text-sm">{capitalize(key)}</p>
          </Link>
        ))
      }
    </div>
  )
}