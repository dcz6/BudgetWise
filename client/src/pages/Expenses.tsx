import { Button } from "@/components/ui/card";
import { useState } from "react";
import useSWR from "swr";
import { Category, Expense } from "../../db/schema";
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

export default function Expenses() {
  const [isAdding, setIsAdding] = useState(false);
  const { data: expenses } = useSWR<Expense[]>("/api/expenses");
  const { data: categories } = useSWR<Category[]>("/api/categories");

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
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ExpenseForm
        open={isAdding}
        onOpenChange={setIsAdding}
        categories={categories ?? []}
      />
    </div>
  );
}
