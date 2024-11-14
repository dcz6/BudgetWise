import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, format } from "date-fns";
import { useState } from "react";
import BudgetProgress from "../components/BudgetProgress";
import MonthlyOverview from "../components/MonthlyOverview";
import useSWR from "swr";
import { Category, Expense } from "../lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: categories, isLoading: categoriesLoading } = useSWR<Category[]>("/api/categories");
  const { data: expenses, isLoading: expensesLoading } = useSWR<Expense[]>("/api/expenses");
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handlePreviousMonth = () => {
    setSelectedMonth(prev => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(prev => addMonths(prev, 1));
  };

  const isLoading = categoriesLoading || expensesLoading;

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

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousMonth}
          className="hover:bg-secondary transition-colors duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold min-w-[150px] text-center">
          {format(selectedMonth, 'MMMM yyyy')}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
          className="hover:bg-secondary transition-colors duration-200"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          ) : (
            categories?.map((category) => (
              <BudgetProgress
                key={category.id}
                category={category}
                expenses={expenses?.filter((e) => e.categoryId === category.id) ?? []}
                selectedMonth={selectedMonth}
              />
            ))
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-[300px] w-full" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-8 w-[150px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-8 w-[150px]" />
                </div>
              </div>
            </div>
          ) : (
            <MonthlyOverview 
              expenses={expenses ?? []} 
              categories={categories ?? []} 
              selectedMonth={selectedMonth}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
