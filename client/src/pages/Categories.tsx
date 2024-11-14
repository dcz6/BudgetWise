import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CategoryForm from "../components/CategoryForm";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Category } from "../lib/types";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash } from "lucide-react";

export default function Categories() {
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
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

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
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
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleEdit(category)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(category.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <CategoryForm 
        open={isAdding} 
        onOpenChange={setIsAdding} 
      />

      {editingCategory && (
        <CategoryForm
          open={true}
          onOpenChange={() => setEditingCategory(undefined)}
          category={editingCategory}
        />
      )}
    </div>
  );
}
