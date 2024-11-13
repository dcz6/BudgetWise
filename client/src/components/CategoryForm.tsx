import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { InsertCategory } from "../../db/schema";
import { toast } from "@/hooks/use-toast";
import { mutate } from "swr";

interface CategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CategoryForm({ open, onOpenChange }: CategoryFormProps) {
  const { register, handleSubmit, reset } = useForm<InsertCategory>();

  const onSubmit = async (data: InsertCategory) => {
    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      mutate("/api/categories");
      toast({ title: "Category added" });
      reset();
      onOpenChange(false);
    } catch (error) {
      toast({ title: "Error adding category", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Category Name"
            {...register("name")}
          />
          
          <Input
            type="number"
            step="0.01"
            placeholder="Budget Amount"
            {...register("budget")}
          />
          
          <Input
            type="color"
            {...register("color")}
          />

          <Button type="submit" className="w-full">
            Add Category
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
