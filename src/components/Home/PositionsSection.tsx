import JobCard from "./JobCard";
import SectionHeader from "./SectionHeader";
import type { Position } from "./home-types";

type PositionsSectionProps = {
  id: string;
  title: string;
  highlight?: string;
  positions: Position[];
  actionLabel?: string;
  actionHref?: string;
};

export default function PositionsSection({
  id,
  title,
  highlight,
  positions,
  actionLabel = "View all positions",
  actionHref = "#",
}: PositionsSectionProps) {
  return (
    <section className="bg-white py-10" id={id}>
      <div className="mx-auto w-full max-w-7xl px-5">
        <SectionHeader
          actionHref={actionHref}
          actionLabel={actionLabel}
          highlight={highlight}
          title={title}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {positions.map((position) => (
            <JobCard key={position.id} position={position} />
          ))}
        </div>
      </div>
    </section>
  );
}
