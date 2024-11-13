import { Card } from "@/components/ui/card";
import { Expense } from "../../db/schema";
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
}

export default function MonthlyOverview({ expenses }: MonthlyOverviewProps) {
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
  );
}
