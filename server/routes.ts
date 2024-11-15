import type { Express } from "express";
import { db } from "../db";
import { categories, expenses } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { isAuthenticated } from "./auth";

export function registerRoutes(app: Express) {
  // Categories
  app.get("/api/categories", isAuthenticated, async (req, res) => {
    const userId = (req.user as any).id;
    const allCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.userId, userId));
    res.json(allCategories);
  });

  app.post("/api/categories", isAuthenticated, async (req, res) => {
    const userId = (req.user as any).id;
    const newCategory = await db
      .insert(categories)
      .values({ ...req.body, userId })
      .returning();
    res.json(newCategory[0]);
  });

  app.put("/api/categories/:id", isAuthenticated, async (req, res) => {
    const userId = (req.user as any).id;
    const updated = await db
      .update(categories)
      .set(req.body)
      .where(
        and(
          eq(categories.id, parseInt(req.params.id)),
          eq(categories.userId, userId)
        )
      )
      .returning();
    res.json(updated[0]);
  });

  app.delete("/api/categories/:id", isAuthenticated, async (req, res) => {
    const userId = (req.user as any).id;
    await db
      .delete(categories)
      .where(
        and(
          eq(categories.id, parseInt(req.params.id)),
          eq(categories.userId, userId)
        )
      );
    res.status(204).send();
  });

  // Expenses
  app.get("/api/expenses", isAuthenticated, async (req, res) => {
    const userId = (req.user as any).id;
    const allExpenses = await db
      .select()
      .from(expenses)
      .where(eq(expenses.userId, userId))
      .orderBy(expenses.date);
    res.json(allExpenses);
  });

  app.post("/api/expenses", isAuthenticated, async (req, res) => {
    const userId = (req.user as any).id;
    const data = {
      ...req.body,
      date: new Date(req.body.date),
      userId,
    };
    const newExpense = await db.insert(expenses).values(data).returning();
    res.json(newExpense[0]);
  });

  app.put("/api/expenses/:id", isAuthenticated, async (req, res) => {
    const userId = (req.user as any).id;
    const data = {
      ...req.body,
      date: new Date(req.body.date),
    };
    const updated = await db
      .update(expenses)
      .set(data)
      .where(
        and(
          eq(expenses.id, parseInt(req.params.id)),
          eq(expenses.userId, userId)
        )
      )
      .returning();
    res.json(updated[0]);
  });

  app.delete("/api/expenses/:id", isAuthenticated, async (req, res) => {
    const userId = (req.user as any).id;
    await db
      .delete(expenses)
      .where(
        and(
          eq(expenses.id, parseInt(req.params.id)),
          eq(expenses.userId, userId)
        )
      );
    res.status(204).send();
  });
}
