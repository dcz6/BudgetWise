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

  return (
    <div className="space-y-6">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="hsl(142.1 76.2% 36.3%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
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
        <Card>
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Monthly allocation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
