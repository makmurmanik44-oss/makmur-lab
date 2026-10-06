"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/primitives";
import { jakartaDate, reviewState } from "@/lib/review";

export function ReviewTiming({ nextReview }: { nextReview: string }) {
  const [today, setToday] = useState<string>();
  useEffect(() => {
    const refresh = () => setToday(jakartaDate());
    const frame = requestAnimationFrame(refresh);
    const interval = window.setInterval(refresh, 60_000);
    const visible = () => {
      if (!document.hidden) refresh();
    };
    document.addEventListener("visibilitychange", visible);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", visible);
    };
  }, []);
  return (
    <Badge>{today ? reviewState(nextReview, today) : "Scheduled review"}</Badge>
  );
}
