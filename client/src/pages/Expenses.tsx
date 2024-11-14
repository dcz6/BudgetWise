import { Button } from "@/components/ui/button";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Category, Expense } from "../lib/types";
import ExpenseForm from "../components/ExpenseForm";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Pencil, Trash, Plus, ArrowUpDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

type SortField = "date" | "amount" | "category" | "description";
type SortOrder = "asc" | "desc";

export default function Expenses() {
  const [isAdding, setIsAdding] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  
  const { data: expenses } = useSWR<Expense[]>("/api/expenses");
  const { data: categories } = useSWR<Category[]>("/api/categories");

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      mutate("/api/expenses");
      toast({ title: "Expense deleted successfully" });
    } catch (error) {
      toast({ 
        title: "Error deleting expense", 
        variant: "destructive" 
      });
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedAndFilteredExpenses = expenses
    ?.filter((expense) => {
      const category = categories?.find((c) => c.id === expense.categoryId);
      const searchString = `${category?.name} ${expense.description}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      switch (sortField) {
        case "date":
          return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime());
        case "amount":
          return multiplier * (Number(a.amount) - Number(b.amount));
        case "category":
          const categoryA = categories?.find((c) => c.id === a.categoryId)?.name ?? "";
          const categoryB = categories?.find((c) => c.id === b.categoryId)?.name ?? "";
          return multiplier * categoryA.localeCompare(categoryB);
        case "description":
          return multiplier * (a.description ?? "").localeCompare(b.description ?? "");
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Button onClick={() => setIsAdding(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <Input
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-2"
                >
                  Date
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort("category")}
                  className="flex items-center gap-2"
                >
                  Category
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort("description")}
                  className="flex items-center gap-2"
                >
                  Description
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort("amount")}
                  className="flex items-center gap-2 ml-auto"
                >
                  Amount
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredExpenses?.map((expense) => {
              const category = categories?.find((c) => c.id === expense.categoryId);
              return (
                <TableRow key={expense.id}>
                  <TableCell>{format(new Date(expense.date), "PP")}</TableCell>
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category?.color }}
                          />
                          {category?.name}
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{category?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Budget: ${Number(category?.budget).toFixed(2)}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    ${Number(expense.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(expense)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(expense.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <ExpenseForm
        open={isAdding}
        onOpenChange={setIsAdding}
        categories={categories ?? []}
      />

      {editingExpense && (
        <ExpenseForm
          open={true}
          onOpenChange={() => setEditingExpense(undefined)}
          categories={categories ?? []}
          expense={editingExpense}
        />
      )}
    </div>
  );
}
