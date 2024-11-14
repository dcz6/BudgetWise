import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useLocation } from "wouter";
import { Calculator, Calendar, FolderOpen, LayoutDashboard, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Category } from "../lib/types";
import useSWR from "swr";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { data: categories } = useSWR<Category[]>("/api/categories");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => {
              setLocation("/");
              setOpen(false);
            }}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setLocation("/categories");
              setOpen(false);
            }}
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            Categories
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setLocation("/expenses");
              setOpen(false);
            }}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Expenses
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Categories">
          {categories?.map((category) => (
            <CommandItem
              key={category.id}
              onSelect={() => {
                setLocation("/expenses");
                setOpen(false);
              }}
            >
              <div
                className="mr-2 h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.name} (${Number(category.budget).toFixed(2)})
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => {
              setLocation("/expenses");
              // TODO: Open expense form
              setOpen(false);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setLocation("/categories");
              // TODO: Open category form
              setOpen(false);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
