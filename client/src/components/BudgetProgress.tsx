import { Progress } from "@/components/ui/progress";
import { Category, Expense } from "../lib/types";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { startOfMonth, endOfMonth } from "date-fns";

interface BudgetProgressProps {
  category: Category;
  expenses: Expense[];
  selectedMonth: Date;
}

export default function BudgetProgress({
  category,
  expenses,
  selectedMonth,
}: BudgetProgressProps) {
  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  
  const monthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= monthStart && expenseDate <= monthEnd;
  });

  const total = monthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const percentage = (total / Number(category.budget)) * 100;
  
  const getProgressColor = (percent: number) => {
    if (percent >= 90) return "bg-destructive";
    if (percent >= 75) return "bg-warning";
    return "bg-primary";
  };

  return (
    <TooltipProvider>
      <div className="space-y-2 mb-4 group">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: category.color }}
            />
            <span className="font-medium">{category.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ${total.toFixed(2)} / ${Number(category.budget).toFixed(2)}
          </span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative">
              <Progress
                value={percentage}
                className={cn(
                  "h-2 transition-all duration-300 group-hover:h-3",
                  getProgressColor(percentage)
                )}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{percentage.toFixed(1)}% of budget used in {selectedMonth.toLocaleString('default', { month: 'long' })}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
