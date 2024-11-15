import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertExpense, insertExpenseSchema, Category } from "../lib/types";
import { toast } from "@/hooks/use-toast";
import { mutate } from "swr";
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpenseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  expense?: {
    id: number;
    categoryId: number;
    amount: number;
    description: string;
    date: string;
  };
}

export default function ExpenseForm({
  open,
  onOpenChange,
  categories,
  expense,
}: ExpenseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InsertExpense>({
    resolver: zodResolver(insertExpenseSchema),
    defaultValues: expense
      ? {
          categoryId: expense.categoryId,
          amount: expense.amount,
          description: expense.description || "",
          date: new Date(expense.date),
        }
      : {
          categoryId: categories[0]?.id || 0,
          amount: undefined,
          description: "",
          date: new Date(),
        },
  });

  const onSubmit = async (data: InsertExpense) => {
    try {
      setIsSubmitting(true);
      const url = expense
        ? `/api/expenses/${expense.id}`
        : "/api/expenses";
      const method = expense ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          categoryId: parseInt(data.categoryId as unknown as string),
        }),
      });
      mutate("/api/expenses");
      toast({ title: `Expense ${expense ? 'updated' : 'added'} successfully` });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({ 
        title: `Error ${expense ? 'updating' : 'adding'} expense`, 
        description: "Please try again later.",
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit' : 'Add'} Expense</DialogTitle>
          <DialogDescription>
            {expense ? 'Update' : 'Add a new'} expense to track your spending. Select a category and enter the amount and description.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem 
                          key={category.id} 
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Enter amount"
                      {...field}
                      value={field.value === undefined ? "" : Number(field.value).toFixed(2)}
                      onChange={(e) => {
                        const value = e.target.value;
                        const parsedValue = parseFloat(value);
                        field.onChange(value === "" ? undefined : isNaN(parsedValue) ? 0 : Math.round(parsedValue * 100) / 100);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter description"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {expense ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                expense ? 'Update' : 'Add'
              )} Expense
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}