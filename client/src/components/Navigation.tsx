import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Menu } from "lucide-react";
import { CommandMenu } from "./CommandMenu";
import useSWR from "swr";
import { Category, Expense } from "../lib/types";
import { startOfMonth, endOfMonth } from "date-fns";

export default function Navigation() {
  const [location] = useLocation();
  const { data: expenses } = useSWR<Expense[]>("/api/expenses");
  const { data: categories } = useSWR<Category[]>("/api/categories");

  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  
  const monthExpenses = expenses?.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= monthStart && expenseDate <= monthEnd;
  });

  const overBudgetCategories = categories?.filter(category => {
    const categoryExpenses = monthExpenses?.filter(e => e.categoryId === category.id);
    const total = categoryExpenses?.reduce((sum, e) => sum + Number(e.amount), 0) ?? 0;
    return total > Number(category.budget);
  });

  const routes = [
    { path: "/", label: "Dashboard" },
    { 
      path: "/categories", 
      label: "Categories",
      badge: overBudgetCategories?.length ? {
        content: `${overBudgetCategories.length} over budget`,
        variant: "destructive" as const
      } : undefined
    },
    { 
      path: "/expenses", 
      label: "Expenses",
      badge: monthExpenses?.length ? {
        content: `${monthExpenses.length} this month`,
        variant: "secondary" as const
      } : undefined
    },
  ];

  return (
    <nav className="border-b mb-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Budget Tracker
          </h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {routes.map((route) => (
              <Button
                key={route.path}
                variant={location === route.path ? "default" : "ghost"}
                className="transition-colors duration-200 hover:bg-primary/10"
                asChild
              >
                <Link href={route.path} className="flex items-center gap-2">
                  {route.label}
                  {route.badge && (
                    <Badge variant={route.badge.variant}>
                      {route.badge.content}
                    </Badge>
                  )}
                </Link>
              </Button>
            ))}
            <Button
              variant="outline"
              className="hidden lg:flex items-center gap-2"
              onClick={() => document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true })
              )}
            >
              <span>Quick actions</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="transition-colors duration-200 hover:bg-primary/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {routes.map((route) => (
                  <DropdownMenuItem 
                    key={route.path} 
                    className="cursor-pointer"
                    asChild
                  >
                    <Link href={route.path} className="flex items-center gap-2">
                      {route.label}
                      {route.badge && (
                        <Badge variant={route.badge.variant} className="ml-auto">
                          {route.badge.content}
                        </Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <CommandMenu />
    </nav>
  );
}
