import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import CategoryForm from "../components/CategoryForm";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Category } from "../lib/types";
import { toast } from "@/hooks/use-toast";
import { Loader2, Pencil, Plus, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Categories() {
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const { data: categories, isLoading } = useSWR<Category[]>("/api/categories");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      mutate("/api/categories");
      toast({ title: "Category deleted" });
    } catch (error) {
      toast({ title: "Error deleting category", variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-8 w-32 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Budget Categories</h1>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setIsAdding(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new budget category</p>
            </TooltipContent>
          </Tooltip>
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit category</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(category.id)}
                      disabled={deletingId === category.id}
                    >
                      {deletingId === category.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete category</p>
                  </TooltipContent>
                </Tooltip>
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
    </TooltipProvider>
  );
}
