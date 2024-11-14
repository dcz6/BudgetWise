import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category, Expense } from "../lib/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpIcon, ArrowDownIcon, DollarSign, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MonthlyOverviewProps {
  expenses: Expense[];
  categories: Category[];
  selectedMonth: Date;
}

export default function MonthlyOverview({ 
  expenses, 
  categories,
  selectedMonth 
}: MonthlyOverviewProps) {
  if (!expenses || !categories || !selectedMonth) {
    return (
      <div className="space-y-6">
        <div className="h-[300px] bg-card/50 rounded-lg animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-24 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-24 mt-2" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);

  const monthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= monthStart && expenseDate <= monthEnd;
  });

  const totalExpenses = monthExpenses.reduce((sum, expense) => 
    sum + Number(expense.amount), 0
  );

  const totalBudget = categories.reduce((sum, category) => 
    sum + Number(category.budget), 0
  );

  const remainingBudget = totalBudget - totalExpenses;
  const percentageUsed = (totalExpenses / totalBudget) * 100;

  const dailyData = eachDayOfInterval({ start: monthStart, end: monthEnd })
    .map((date) => {
      const dayExpenses = monthExpenses.filter((expense) =>
        format(new Date(expense.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      );
      
      return {
        date: format(date, "MMM d"),
        amount: dayExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0),
      };
    });

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="relative h-[300px] transition-all duration-300 ease-in-out hover:shadow-lg rounded-lg p-4 bg-card/50 group">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-primary/5 rounded-lg" />
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={{ strokeWidth: 1, stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={{ strokeWidth: 1, stroke: 'hsl(var(--border))' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  fontSize: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Daily Expenses']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorAmount)"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4, strokeOpacity: 0.8 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <UITooltip>
            <TooltipTrigger asChild>
              <Card className="transition-all duration-200 hover:shadow-lg cursor-help">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Total Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
                    <div className={cn(
                      "text-sm px-2 py-0.5 rounded-full transition-colors duration-200",
                      percentageUsed >= 90 ? "bg-destructive/10 text-destructive" :
                      percentageUsed >= 75 ? "bg-warning/10 text-warning" :
                      "bg-primary/10 text-primary"
                    )}>
                      {percentageUsed.toFixed(1)}%
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(selectedMonth, 'MMMM yyyy')}
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total expenses for the current month</p>
              {percentageUsed >= 90 ? (
                <p className="text-destructive">Warning: Over 90% of budget used!</p>
              ) : percentageUsed >= 75 ? (
                <p className="text-warning">Caution: Over 75% of budget used</p>
              ) : null}
            </TooltipContent>
          </UITooltip>

          <UITooltip>
            <TooltipTrigger asChild>
              <Card className="transition-all duration-200 hover:shadow-lg cursor-help">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Remaining Budget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">${remainingBudget.toFixed(2)}</div>
                    <div className={cn(
                      "flex items-center gap-1 text-sm px-2 py-0.5 rounded-full transition-colors duration-200",
                      remainingBudget >= 0 
                        ? "bg-primary/10 text-primary" 
                        : "bg-destructive/10 text-destructive"
                    )}>
                      {remainingBudget >= 0 ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      )}
                      ${Math.abs(remainingBudget).toFixed(2)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    from ${totalBudget.toFixed(2)} total budget
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remaining budget for the current month</p>
              {remainingBudget < 0 ? (
                <p className="text-destructive">Warning: Over budget!</p>
              ) : remainingBudget < totalBudget * 0.25 ? (
                <p className="text-warning">Low remaining budget</p>
              ) : null}
            </TooltipContent>
          </UITooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
