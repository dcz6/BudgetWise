import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { InsertExpense, Category } from "../../db/schema";
import { toast } from "@/hooks/use-toast";
import { mutate } from "swr";

interface ExpenseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
}

export default function ExpenseForm({
  open,
  onOpenChange,
  categories,
}: ExpenseFormProps) {
  const { register, handleSubmit, reset } = useForm<InsertExpense>();

  const onSubmit = async (data: InsertExpense) => {
    try {
      await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      mutate("/api/expenses");
      toast({ title: "Expense added" });
      reset();
      onOpenChange(false);
    } catch (error) {
      toast({ title: "Error adding expense", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select onValueChange={(value) => register("categoryId").onChange({ target: { value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="number"
            step="0.01"
            placeholder="Amount"
            {...register("amount")}
          />
          
          <Input
            placeholder="Description"
            {...register("description")}
          />

          <Button type="submit" className="w-full">
            Add Expense
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
