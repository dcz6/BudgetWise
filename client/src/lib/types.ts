import { z } from "zod";

// User schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;
export type User = {
  id: number;
  email: string;
  name: string;
};

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
  amount: z.number()
    .min(0.01, "Amount must be greater than 0")
    .transform(val => Math.round(val * 100) / 100),
  description: z.string().optional(),
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