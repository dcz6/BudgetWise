import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CategoryForm from "../components/CategoryForm";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Category } from "../../db/schema";
import { toast } from "@/hooks/use-toast";

export default function Categories() {
  const [isAdding, setIsAdding] = useState(false);
  const { data: categories } = useSWR<Category[]>("/api/categories");

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      mutate("/api/categories");
      toast({ title: "Category deleted" });
    } catch (error) {
      toast({ title: "Error deleting category", variant: "destructive" });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Budget Categories</h1>
        <Button onClick={() => setIsAdding(true)}>Add Category</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => (
          <Card key={category.id} className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            </div>
            <p className="text-2xl font-bold mt-2">
              ${Number(category.budget).toFixed(2)}
            </p>
            <Button
              variant="destructive"
              className="mt-4"
              onClick={() => handleDelete(category.id)}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>

      <CategoryForm open={isAdding} onOpenChange={setIsAdding} />
    </div>
  );
}
