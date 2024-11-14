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
  
  // Ensure proper date comparison by converting strings to Date objects
  const monthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= monthStart && expenseDate <= monthEnd;
  });

  const total = monthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const percentage = (total / Number(category.budget)) * 100;

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
                  "h-2 transition-all duration-300 group-hover:h-3 rounded-full border border-black/10 overflow-hidden bg-white"
                )}
                indicatorClassName={cn(
                  "h-full w-full flex-1 transition-all",
                  `bg-[${category.color}]`
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
