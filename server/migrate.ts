import { db } from "../db";
import { users, categories, expenses } from "../db/schema";
import bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";

async function migrate() {
  try {
    // Create a default user for existing data
    const [defaultUser] = await db.insert(users).values({
      email: "default@example.com",
      password: await bcrypt.hash("defaultpassword", 10),
      name: "Default User",
    }).returning();

    // Update all existing categories with the default user ID
    await db
      .update(categories)
      .set({ userId: defaultUser.id })
      .where(sql`1=1`);

    // Update all existing expenses with the default user ID
    await db
      .update(expenses)
      .set({ userId: defaultUser.id })
      .where(sql`1=1`);

    console.log("Migration completed successfully");
    console.log("Default user created:", {
      email: defaultUser.email,
      name: defaultUser.name,
    });
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();
