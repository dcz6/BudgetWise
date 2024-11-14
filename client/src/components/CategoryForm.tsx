import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertCategory, insertCategorySchema } from "../lib/types";
import { toast } from "@/hooks/use-toast";
import { mutate } from "swr";
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";

interface CategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CategoryForm({ open, onOpenChange }: CategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InsertCategory>({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: {
      name: "",
      budget: undefined,
      color: "#4CAF50",
    },
  });

  const onSubmit = async (data: InsertCategory) => {
    try {
      setIsSubmitting(true);
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          budget: parseFloat(data.budget as unknown as string),
        }),
      });
      mutate("/api/categories");
      toast({ title: "Category added successfully" });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({ 
        title: "Error adding category", 
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
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a new budget category to organize your expenses. Set a budget limit and choose a color for visualization.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter budget amount"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="color"
                        className="w-24 h-10"
                        {...field}
                      />
                      <div 
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
              {isSubmitting ? "Adding..." : "Add Category"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
