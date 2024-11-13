import type { Express } from "express";
import { db } from "../db";
import { categories, expenses } from "../db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express) {
  // Categories
  app.get("/api/categories", async (req, res) => {
    const allCategories = await db.select().from(categories);
    res.json(allCategories);
  });

  app.post("/api/categories", async (req, res) => {
    const newCategory = await db.insert(categories).values(req.body).returning();
    res.json(newCategory[0]);
  });

  app.put("/api/categories/:id", async (req, res) => {
    const updated = await db
      .update(categories)
      .set(req.body)
      .where(eq(categories.id, parseInt(req.params.id)))
      .returning();
    res.json(updated[0]);
  });

  app.delete("/api/categories/:id", async (req, res) => {
    await db.delete(categories).where(eq(categories.id, parseInt(req.params.id)));
    res.status(204).send();
  });

  // Expenses
  app.get("/api/expenses", async (req, res) => {
    const allExpenses = await db
      .select()
      .from(expenses)
      .orderBy(expenses.date);
    res.json(allExpenses);
  });

  app.post("/api/expenses", async (req, res) => {
    const newExpense = await db.insert(expenses).values(req.body).returning();
    res.json(newExpense[0]);
  });

  app.put("/api/expenses/:id", async (req, res) => {
    const updated = await db
      .update(expenses)
      .set(req.body)
      .where(eq(expenses.id, parseInt(req.params.id)))
      .returning();
    res.json(updated[0]);
  });

  app.delete("/api/expenses/:id", async (req, res) => {
    await db.delete(expenses).where(eq(expenses.id, parseInt(req.params.id)));
    res.status(204).send();
  });
}
