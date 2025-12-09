import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  decimal,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  phone: varchar("phone"),
  whatsapp: varchar("whatsapp"),
  isAdmin: boolean("is_admin").default(false),
  preferredLanguage: varchar("preferred_language").default("en"),
  newsletterSubscribed: boolean("newsletter_subscribed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Service categories
export const serviceCategories = pgTable("service_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Services (200+ individual service pages)
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => serviceCategories.id),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  shortDescription: text("short_description"),
  fullDescription: text("full_description"),
  symptoms: jsonb("symptoms").$type<string[]>().default([]),
  benefits: jsonb("benefits").$type<string[]>().default([]),
  processSteps: jsonb("process_steps").$type<string[]>().default([]),
  resultsTimeline: varchar("results_timeline", { length: 255 }),
  priceMin: decimal("price_min", { precision: 10, scale: 2 }),
  priceMax: decimal("price_max", { precision: 10, scale: 2 }),
  faqs: jsonb("faqs").$type<{ question: string; answer: string }[]>().default([]),
  relatedServiceIds: jsonb("related_service_ids").$type<number[]>().default([]),
  imageUrl: varchar("image_url", { length: 500 }),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Product categories
export const productCategories = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Products for the shop
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => productCategories.id),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  comparePrice: decimal("compare_price", { precision: 10, scale: 2 }),
  imageUrl: varchar("image_url", { length: 500 }),
  images: jsonb("images").$type<string[]>().default([]),
  stock: integer("stock").default(0),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  deliveryInfo: text("delivery_info"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Bookings
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  serviceId: integer("service_id").references(() => services.id),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 50 }),
  scheduledDate: timestamp("scheduled_date").notNull(),
  specialNotes: text("special_notes"),
  consultationType: varchar("consultation_type", { length: 50 }).default("normal"),
  status: varchar("status", { length: 50 }).default("pending"),
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
  paymentMethod: varchar("payment_method", { length: 50 }),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  isEmergency: boolean("is_emergency").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Orders for shop purchases
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  orderNumber: varchar("order_number", { length: 50 }).notNull().unique(),
  status: varchar("status", { length: 50 }).default("pending"),
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
  paymentMethod: varchar("payment_method", { length: 50 }),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  shipping: decimal("shipping", { precision: 10, scale: 2 }).default("0"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  shippingAddress: jsonb("shipping_address"),
  customerName: varchar("customer_name", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 255 }),
  customerPhone: varchar("customer_phone", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Order items
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  productName: varchar("product_name", { length: 255 }),
});

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  imageUrl: varchar("image_url", { length: 500 }),
  category: varchar("category", { length: 100 }),
  tags: jsonb("tags").$type<string[]>().default([]),
  authorId: varchar("author_id").references(() => users.id),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  readTime: integer("read_time").default(5),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientLocation: varchar("client_location", { length: 255 }),
  clientImage: varchar("client_image", { length: 500 }),
  serviceId: integer("service_id").references(() => services.id),
  rating: integer("rating").default(5),
  content: text("content").notNull(),
  beforeStory: text("before_story"),
  afterStory: text("after_story"),
  videoUrl: varchar("video_url", { length: 500 }),
  isApproved: boolean("is_approved").default(false),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Cultural Encyclopedia entries
export const encyclopediaEntries = pgTable("encyclopedia_entries", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 100 }).notNull(),
  content: text("content"),
  symbolMeaning: text("symbol_meaning"),
  ritualUse: text("ritual_use"),
  ancestralRole: text("ancestral_role"),
  warnings: text("warnings"),
  imageUrl: varchar("image_url", { length: 500 }),
  relatedEntryIds: jsonb("related_entry_ids").$type<number[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Audio library (prayers/chants)
export const audioTracks = pgTable("audio_tracks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(),
  audioUrl: varchar("audio_url", { length: 500 }),
  duration: integer("duration"),
  imageUrl: varchar("image_url", { length: 500 }),
  isPremium: boolean("is_premium").default(false),
  playCount: integer("play_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Service progress tracking
export const serviceProgress = pgTable("service_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  bookingId: integer("booking_id").references(() => bookings.id),
  serviceId: integer("service_id").references(() => services.id),
  currentStep: integer("current_step").default(1),
  totalSteps: integer("total_steps").default(1),
  status: varchar("status", { length: 50 }).default("in_progress"),
  completedSteps: jsonb("completed_steps").$type<{ step: number; completedAt: string; notes: string }[]>().default([]),
  nextAppointment: timestamp("next_appointment"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Live chat messages
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  userId: varchar("user_id").references(() => users.id),
  senderType: varchar("sender_type", { length: 20 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// AI conversation history
export const aiConversations = pgTable("ai_conversations", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  toolType: varchar("tool_type", { length: 50 }).notNull(),
  userInput: text("user_input"),
  aiResponse: text("ai_response"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Newsletter subscribers
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Consultation pricing
export const consultationPricing = pgTable("consultation_pricing", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  priceMin: decimal("price_min", { precision: 10, scale: 2 }).notNull(),
  priceMax: decimal("price_max", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  orders: many(orders),
  serviceProgress: many(serviceProgress),
  chatMessages: many(chatMessages),
  aiConversations: many(aiConversations),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  category: one(serviceCategories, {
    fields: [services.categoryId],
    references: [serviceCategories.id],
  }),
  bookings: many(bookings),
  testimonials: many(testimonials),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(productCategories, {
    fields: [products.categoryId],
    references: [productCategories.id],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ createdAt: true, updatedAt: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true, createdAt: true, updatedAt: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true, updatedAt: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true, updatedAt: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, updatedAt: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, createdAt: true, updatedAt: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true, createdAt: true });
export const insertEncyclopediaSchema = createInsertSchema(encyclopediaEntries).omit({ id: true, createdAt: true, updatedAt: true });
export const insertAudioTrackSchema = createInsertSchema(audioTracks).omit({ id: true, createdAt: true });

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type EncyclopediaEntry = typeof encyclopediaEntries.$inferSelect;
export type InsertEncyclopediaEntry = z.infer<typeof insertEncyclopediaSchema>;
export type AudioTrack = typeof audioTracks.$inferSelect;
export type InsertAudioTrack = z.infer<typeof insertAudioTrackSchema>;
export type ServiceCategory = typeof serviceCategories.$inferSelect;
export type ProductCategory = typeof productCategories.$inferSelect;
export type ServiceProgress = typeof serviceProgress.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type AIConversation = typeof aiConversations.$inferSelect;
export type ConsultationPricing = typeof consultationPricing.$inferSelect;
