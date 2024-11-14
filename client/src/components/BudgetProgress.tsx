import { Progress } from "@/components/ui/progress";
import { Category, Expense } from "../lib/types";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { startOfMonth, endOfMonth } from "date-fns";
import { AlertCircle } from "lucide-react";

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
  const isOverBudget = percentage > 100;

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
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-sm transition-colors duration-200",
              isOverBudget ? "text-destructive font-medium" : "text-muted-foreground"
            )}>
              ${total.toFixed(2)} / ${Number(category.budget).toFixed(2)}
            </span>
            {isOverBudget && (
              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="h-4 w-4 text-destructive animate-pulse" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Over budget by ${(total - Number(category.budget)).toFixed(2)}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative">
              <Progress
                value={Math.min(percentage, 100)}
                className={cn(
                  "h-2 transition-all duration-300 group-hover:h-3 rounded-full border border-black/10 overflow-hidden bg-white",
                  isOverBudget && "border-destructive/50"
                )}
                indicatorClassName={cn(
                  "h-full w-full flex-1",
                  isOverBudget && "animate-pulse"
                )}
                style={{
                  "--progress-color": isOverBudget ? "hsl(var(--destructive))" : category.color,
                } as React.CSSProperties}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {percentage.toFixed(1)}% of budget used in {selectedMonth.toLocaleString('default', { month: 'long' })}
              {isOverBudget && " - Over Budget!"}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
