import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  filterName: string;
  nodes: Array<{
    id: string;
    name: string;
    slug: string;
    taxonomyName: string;
  }>;
  currentFilters: { [key: string]: string[] };
  updateFilters: (node: {
    id: string;
    name: string;
    slug: string;
    taxonomyName: string;
  }) => void;
}

const FilterSection: React.FC<Props> = ({
  filterName,
  nodes,
  currentFilters,
  updateFilters,
}) => {
  return (
    <div>
      <Label className="text-lg">{filterName}</Label>
      <div className="flex gap-4 mt-2">
        {nodes.map((node) => (
          <Button
            key={node.id}
            variant={
              currentFilters[node.taxonomyName]?.includes(node.slug)
                ? "default"
                : "secondary"
            }
            className="rounded-full"
            onClick={() => updateFilters(node)}
          >
            {node.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
