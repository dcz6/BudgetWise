import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category, Expense } from "../lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

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

  const averageSpending = totalExpenses / dailyData.length;

  return (
    <div className="space-y-6">
      <div className="h-[300px] transition-all duration-300 hover:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'hsl(var(--foreground))' }}
              tickLine={{ stroke: 'hsl(var(--foreground))' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--foreground))' }}
              tickLine={{ stroke: 'hsl(var(--foreground))' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Spending']}
            />
            <ReferenceLine 
              y={averageSpending} 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="3 3"
              label={{ 
                value: 'Daily Average', 
                fill: 'hsl(var(--muted-foreground))',
                position: 'right' 
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="hsl(142.1 76.2% 36.3%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">
              {format(selectedMonth, 'MMMM yyyy')}
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Monthly allocation</p>
            {totalExpenses > totalBudget && (
              <p className="text-sm text-destructive mt-2">
                Over budget by ${(totalExpenses - totalBudget).toFixed(2)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
