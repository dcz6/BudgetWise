import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Category, Expense } from "../lib/types";
import BudgetProgress from "./BudgetProgress";

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
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none"
    >
      <BudgetProgress
        category={category}
        expenses={expenses}
        selectedMonth={selectedMonth}
      />
    </div>
  );
}
