import { Progress } from "@/components/ui/progress";
import { Category, Expense } from "../../db/schema";

interface BudgetProgressProps {
  category: Category;
  expenses: Expense[];
}

export default function BudgetProgress({
  category,
  expenses,
}: BudgetProgressProps) {
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const percentage = (total / Number(category.budget)) * 100;
  
  const getProgressColor = (percent: number) => {
    if (percent >= 90) return "bg-red-500";
    if (percent >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-2 mb-4">
      <div className="flex justify-between">
        <span className="font-medium">{category.name}</span>
        <span className="text-sm">
          ${total.toFixed(2)} / ${Number(category.budget).toFixed(2)}
        </span>
      </div>
      <Progress
        value={percentage}
        className={`h-2 ${getProgressColor(percentage)}`}
      />
    </div>
  );
}
