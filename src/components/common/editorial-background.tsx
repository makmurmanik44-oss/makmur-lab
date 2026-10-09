import Image from "next/image";
import type { EditorialPhoto } from "@/content/editorial-photos";
import { asset } from "@/config/site";

export function EditorialBackground({
  photo,
  priority = false,
}: {
  photo: EditorialPhoto;
  priority?: boolean;
}) {
  return (
    <div
      className="editorial-background"
      aria-hidden="true"
      data-photo={photo.id}
    >
      <picture>
        <source media="(max-width: 700px)" srcSet={asset(photo.smallSrc)} />
        <Image
          src={asset(photo.src)}
          alt=""
          width={1600}
          height={1000}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          style={{ objectPosition: photo.position }}
        />
      </picture>
    </div>
  );
}

export function PhotoCredit({ photo }: { photo: EditorialPhoto }) {
  return (
    <a
      className="editorial-credit"
      href={photo.source}
      target="_blank"
      rel="noopener noreferrer"
    >
      Photo: {photo.photographer} / Unsplash
    </a>
  );
}
