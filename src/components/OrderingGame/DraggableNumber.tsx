import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DraggableNumberProps {
  id: string;
  number: number;
}

const DraggableNumber = ({ id, number }: DraggableNumberProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border-2 border-blue-500 rounded-lg p-4 cursor-move select-none ${
        isDragging ? "opacity-50" : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <span className="text-xl font-bold">{number}</span>
    </div>
  );
};

export default DraggableNumber;