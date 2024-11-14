import { z } from "zod";

// Category schemas
export const insertCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  budget: z.number().min(0, "Budget must be positive"),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = InsertCategory & { id: number };

// Expense schemas
export const insertExpenseSchema = z.object({
  categoryId: z.number().int().positive("Category is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  description: z.string().min(1, "Description is required"),
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date format",
  }),
});

export type InsertExpense = z.infer<typeof insertExpenseSchema>;
export type Expense = InsertExpense & { 
  id: number;
  date: string;
};
