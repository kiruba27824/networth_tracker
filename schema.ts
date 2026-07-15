import { pgTable, text, serial, numeric, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(), // Used for email in this app
  password: text("password").notNull(),
  name: text("name").notNull(),
  preferredCurrency: text("preferred_currency").default("INR"),
  exchangeRate: numeric("exchange_rate").default("1.0"), // Base (INR) to Secondary (AED) or vice-versa
});

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // 'BANK', 'GOLD', 'CASH', 'STOCK', 'OTHER'
  name: text("name").notNull(),
  value: numeric("value").notNull(),
  currency: text("currency").default("INR"),
  // Gold specific
  weight: numeric("weight"), // in grams
  purchaseRate: numeric("purchase_rate"), // Rate per gram/unit at purchase
});

export const liabilities = pgTable("liabilities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // 'CREDIT_CARD', 'LOAN', 'OTHER'
  name: text("name").notNull(),
  outstandingAmount: numeric("outstanding_amount").notNull(),
  currency: text("currency").default("INR"),
  // Credit Card / Loan specific
  totalLimit: numeric("total_limit"), // Credit limit
  emi: numeric("emi"), // Monthly installment
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: timestamp("date").defaultNow(),
  amount: numeric("amount").notNull(),
  type: text("type").notNull(), // 'INCOME', 'EXPENSE'
  category: text("category").notNull(),
  description: text("description"),
});

// === SCHEMA DEFINITIONS ===

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertAssetSchema = createInsertSchema(assets).omit({ id: true, userId: true });
export const insertLiabilitySchema = createInsertSchema(liabilities).omit({ id: true, userId: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true, userId: true, date: true });

// === TYPES ===

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Asset = typeof assets.$inferSelect;
export type InsertAsset = z.infer<typeof insertAssetSchema>;

export type Liability = typeof liabilities.$inferSelect;
export type InsertLiability = z.infer<typeof insertLiabilitySchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

// Request Types
export type CreateAssetRequest = InsertAsset;
export type UpdateAssetRequest = Partial<InsertAsset>;

export type CreateLiabilityRequest = InsertLiability;
export type UpdateLiabilityRequest = Partial<InsertLiability>;

export type CreateTransactionRequest = InsertTransaction & { date?: string };
export type UpdateTransactionRequest = Partial<CreateTransactionRequest>;

// Dashboard / Report Types
export interface DashboardSummary {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  currency: string;
  goldMetrics?: {
    totalWeight: number;
    currentValue: number;
    investmentValue: number;
    pl: number;
  };
}

export interface AuthResponse {
  user: User;
}
