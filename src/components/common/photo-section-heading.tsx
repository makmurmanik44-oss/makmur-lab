import type { ReactNode } from "react";
import type { EditorialPhoto } from "@/content/editorial-photos";
import { EditorialBackground } from "./editorial-background";

export function PhotoSectionHeading({
  id,
  children,
  photo,
}: {
  id: string;
  children: ReactNode;
  photo: EditorialPhoto;
}) {
  return (
    <div className="photo-section-heading photo-surface">
      <EditorialBackground photo={photo} />
      <h2 id={id}>{children}</h2>
    </div>
  );
}
