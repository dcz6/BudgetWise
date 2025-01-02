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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableBudgetCard } from "../components/SortableBudgetCard";

export default function Dashboard() {
  const { data: categories, isLoading: categoriesLoading } = useSWR<Category[]>("/api/categories");
  const { data: expenses, isLoading: expensesLoading } = useSWR<Expense[]>("/api/expenses");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [categoryOrder, setCategoryOrder] = useState<number[]>(() => {
    const stored = localStorage.getItem('categoryOrder');
    return stored ? JSON.parse(stored) : [];
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handlePreviousMonth = () => {
    setSelectedMonth(prev => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(prev => addMonths(prev, 1));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;
    
    const sortedCategories = getSortedCategories();
    const oldIndex = sortedCategories.findIndex(cat => cat.id === active.id);
    const newIndex = sortedCategories.findIndex(cat => cat.id === over.id);
    
    const newItems = arrayMove(sortedCategories, oldIndex, newIndex);
    const newOrder = newItems.map(item => item.id);
    setCategoryOrder(newOrder);
    localStorage.setItem('categoryOrder', JSON.stringify(newOrder));
  };

  const getSortedCategories = () => {
    if (!categories) return [];
    return categories.slice().sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.id);
      const bIndex = categoryOrder.indexOf(b.id);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  };

  const isLoading = categoriesLoading || expensesLoading;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Budget Dashboard
        </h1>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="transition-colors duration-200">
            <Link href="/categories">Categories</Link>
          </Button>
          <Button asChild className="transition-colors duration-200">
            <Link href="/expenses">Expenses</Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousMonth}
          className="transition-all duration-200 hover:scale-105 hover:bg-primary/10"
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
          className="transition-all duration-200 hover:scale-105 hover:bg-primary/10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="budget-overview p-6 transition-all duration-200 hover:shadow-lg">
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={getSortedCategories().map(cat => cat.id)}
                strategy={verticalListSortingStrategy}
              >
                {getSortedCategories().map((category) => (
                  <SortableBudgetCard
                    key={category.id}
                    id={category.id}
                    category={category}
                    expenses={expenses?.filter((e) => e.categoryId === category.id) ?? []}
                    selectedMonth={selectedMonth}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </Card>

        <Card className="monthly-summary p-6 transition-all duration-200 hover:shadow-lg">
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