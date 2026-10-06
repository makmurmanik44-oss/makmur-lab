import {
  BookOpen,
  CircleCheck,
  FlaskConical,
  Flower2,
  PencilLine,
  RefreshCw,
  Sprout,
  Trees,
} from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import type { KnowledgeStatus, ContentMaturity } from "@/types/knowledge";

const statusIcons = {
  Learning: Sprout,
  Practicing: Flower2,
  Researching: FlaskConical,
  Experienced: Trees,
};
const maturityIcons = {
  Draft: PencilLine,
  Developing: BookOpen,
  Stable: CircleCheck,
  Revised: RefreshCw,
};

export function KnowledgeBadges({
  status,
  maturity,
}: {
  status: KnowledgeStatus;
  maturity: ContentMaturity;
}) {
  const StatusIcon = statusIcons[status];
  const MaturityIcon = maturityIcons[maturity];
  return (
    <div className="card-badges">
      <Badge tone="green">
        <StatusIcon size={12} aria-hidden="true" /> {status}
      </Badge>
      <Badge>
        <MaturityIcon size={12} aria-hidden="true" /> {maturity}
      </Badge>
    </div>
  );
}
