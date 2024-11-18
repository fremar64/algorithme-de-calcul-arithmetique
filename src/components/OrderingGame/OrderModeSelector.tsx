import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowUpNarrowWide, ArrowDownNarrowWide } from "lucide-react";

interface OrderModeSelectorProps {
  mode: "asc" | "desc";
  onModeChange: (mode: "asc" | "desc") => void;
}

const OrderModeSelector = ({ mode, onModeChange }: OrderModeSelectorProps) => {
  return (
    <ToggleGroup type="single" value={mode} onValueChange={(value) => value && onModeChange(value as "asc" | "desc")}>
      <ToggleGroupItem value="asc" aria-label="Ordre croissant">
        <ArrowUpNarrowWide className="h-4 w-4 mr-2" />
        Ordre croissant
      </ToggleGroupItem>
      <ToggleGroupItem value="desc" aria-label="Ordre décroissant">
        <ArrowDownNarrowWide className="h-4 w-4 mr-2" />
        Ordre décroissant
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default OrderModeSelector;