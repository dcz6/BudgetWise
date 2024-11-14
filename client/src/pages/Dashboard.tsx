import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BudgetProgress from "../components/BudgetProgress";
import MonthlyOverview from "../components/MonthlyOverview";
import useSWR from "swr";
import { Category, Expense } from "../lib/types";

export default function Dashboard() {
  const { data: categories } = useSWR<Category[]>("/api/categories");
  const { data: expenses } = useSWR<Expense[]>("/api/expenses");

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Budget Dashboard</h1>
        <div className="space-x-2">
          <Button asChild variant="outline">
            <Link href="/categories">Categories</Link>
          </Button>
          <Button asChild>
            <Link href="/expenses">Expenses</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
          {categories?.map((category) => (
            <BudgetProgress
              key={category.id}
              category={category}
              expenses={expenses?.filter((e) => e.categoryId === category.id) ?? []}
            />
          ))}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
          <MonthlyOverview expenses={expenses ?? []} categories={categories ?? []} />
        </Card>
      </div>
    </div>
  );
}
