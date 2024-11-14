import { Progress } from "@/components/ui/progress";
import { Category, Expense } from "../lib/types";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

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
  // Handle loading and error states
  if (!category || !expenses || !selectedMonth) {
    return (
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-2 w-full" />
      </div>
    );
  }

  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  
  const monthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= monthStart && expenseDate <= monthEnd;
  });

  const total = monthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const percentage = Math.min((total / Number(category.budget)) * 100, 100);
  
  const getProgressColor = (percent: number) => {
    if (percent >= 90) return "bg-destructive/80";
    if (percent >= 75) return "bg-warning/80";
    return "bg-primary/80";
  };

  return (
    <TooltipProvider>
      <div className="space-y-2 mb-4 group">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-110 ring-2 ring-offset-2 ring-offset-background"
              style={{ backgroundColor: category.color }}
            />
            <span className="font-medium transition-colors duration-200 group-hover:text-primary">
              {category.name}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            ${Number(total).toFixed(2)} / ${Number(category.budget).toFixed(2)}
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
              <div 
                className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
                style={{ 
                  width: `${percentage}%`,
                  maxWidth: '100%'
                }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {percentage.toFixed(1)}% of budget used in {format(selectedMonth, 'MMMM yyyy')}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
