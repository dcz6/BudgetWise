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
import { Pencil, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Expenses() {
  const [isAdding, setIsAdding] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();
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

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Button onClick={() => setIsAdding(true)}>Add Expense</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses?.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{format(new Date(expense.date), "PP")}</TableCell>
              <TableCell>
                {categories?.find((c) => c.id === expense.categoryId)?.name}
              </TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell className="text-right">
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
          ))}
        </TableBody>
      </Table>

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
