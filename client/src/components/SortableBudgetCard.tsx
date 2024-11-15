import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Category, Expense } from "../lib/types";
import BudgetProgress from "./BudgetProgress";
import { GripVertical } from "lucide-react";

interface SortableBudgetCardProps {
  id: number;
  category: Category;
  expenses: Expense[];
  selectedMonth: Date;
}

export function SortableBudgetCard({
  id,
  category,
  expenses,
  selectedMonth,
}: SortableBudgetCardProps) {
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
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <button
        {...attributes}
        {...listeners}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
      </button>
      <div className="pl-4">
        <BudgetProgress
          category={category}
          expenses={expenses}
          selectedMonth={selectedMonth}
        />
      </div>
    </div>
  );
}
