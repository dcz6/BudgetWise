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
}

export default function MonthlyOverview({ expenses, categories }: MonthlyOverviewProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const totalBudget = categories.reduce((sum, category) => sum + Number(category.budget), 0);

  const now = new Date();
  const monthInterval = {
    start: startOfMonth(now),
    end: endOfMonth(now),
  };

  const dailyData = eachDayOfInterval(monthInterval).map((date) => {
    const dayExpenses = expenses.filter((expense) =>
      format(new Date(expense.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    
    return {
      date: format(date, "MMM d"),
      amount: dayExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0),
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
