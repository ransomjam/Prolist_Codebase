import { pgTable, text, serial, integer, boolean, timestamp, varchar, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  location: varchar("location", { length: 255 }),
  accountType: varchar("account_type", { length: 50 }).default("user"), // user, shop_owner, professional, real_estate
  specialization: varchar("specialization", { length: 100 }), // For professionals and specific business types
  verificationStatus: varchar("verification_status", { length: 50 }).default("pending"), // pending, verified, rejected
  salesCount: integer("sales_count").default(0),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  profilePictureUrl: text("profile_picture_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  phone: true,
  location: true,
  accountType: true,
  specialization: true,
  profilePictureUrl: true,
});

// Vendor applications table
export const vendorApplications = pgTable("vendor_applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  shopType: varchar("shop_type", { length: 50 }).notNull(), // online, physical
  businessName: varchar("business_name", { length: 255 }).notNull(),
  businessAddress: varchar("business_address", { length: 500 }),
  businessDescription: text("business_description"),
  idDocumentUrl: varchar("id_document_url", { length: 500 }),
  shopPhotoUrl: varchar("shop_photo_url", { length: 500 }),
  productPhotosUrls: text("product_photos_urls").array(),
  verificationSlot: varchar("verification_slot", { length: 100 }),
  status: varchar("status", { length: 50 }).default("pending"), // pending, documents_reviewed, video_scheduled, verified, rejected
  adminNotes: text("admin_notes"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  verifiedAt: timestamp("verified_at"),
});

export const insertVendorApplicationSchema = createInsertSchema(vendorApplications).pick({
  userId: true,
  fullName: true,
  phone: true,
  location: true,
  shopType: true,
  businessName: true,
  businessAddress: true,
  businessDescription: true,
  verificationSlot: true,
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  vendorId: integer("vendor_id").references(() => users.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  imageUrls: text("image_urls").array(),
  location: varchar("location", { length: 255 }),
  marketId: varchar("market_id", { length: 100 }),
  marketLine: varchar("market_line", { length: 100 }),
  status: varchar("status", { length: 50 }).default("active"), // active, sold, removed
  viewCount: integer("view_count").default(0),
  salesCount: integer("sales_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  vendorId: true,
  title: true,
  category: true,
  price: true,
  description: true,
  location: true,
}).extend({
  imageUrls: z.array(z.string()).optional(),
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  buyerId: integer("buyer_id").references(() => users.id).notNull(),
  vendorId: integer("vendor_id").references(() => users.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").default(1),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(), // community_point, mtn_money, orange_money
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"), // pending, paid, escrowed, released, refunded
  deliveryMethod: varchar("delivery_method", { length: 50 }), // self_delivery, rider, pickup
  deliveryStatus: varchar("delivery_status", { length: 50 }).default("pending"), // pending, in_transit, delivered, confirmed
  buyerConfirmed: boolean("buyer_confirmed").default(false),
  deliveryProofUrl: varchar("delivery_proof_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  confirmedAt: timestamp("confirmed_at"),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  buyerId: true,
  vendorId: true,
  productId: true,
  quantity: true,
  totalAmount: true,
  paymentMethod: true,
  deliveryMethod: true,
});

// Comments table
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  listingId: text("listing_id").notNull(),
  listingType: text("listing_type").notNull(), // 'listing', 'realestate', 'auction', 'business'
  username: text("username").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  listingId: true,
  listingType: true,
  username: true,
  content: true,
});

// Ratings table
export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  raterId: integer("rater_id").references(() => users.id).notNull(),
  ratedId: integer("rated_id").references(() => users.id).notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRatingSchema = createInsertSchema(ratings).pick({
  orderId: true,
  raterId: true,
  ratedId: true,
  rating: true,
  comment: true,
});

export const auctions = pgTable('auctions', {
  id: serial('id').primaryKey(),
  vendorId: integer('vendor_id').references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  startingPrice: integer('starting_price').notNull(),
  currentPrice: integer('current_price').default(0),
  endDate: timestamp('end_date').notNull(),
  status: text('status').default('active'), // active, ended, cancelled
  images: text('images').array(),
  category: text('category'),
  location: text('location'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const insertAuctionSchema = createInsertSchema(auctions).pick({
  vendorId: true,
  title: true,
  description: true,
  startingPrice: true,
  currentPrice: true,
  endDate: true,
  status: true,
  category: true,
  location: true,
}).extend({
  images: z.array(z.string()).optional(),
});

export const bids = pgTable('bids', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id).notNull(),
  buyerId: integer('buyer_id').references(() => users.id).notNull(),
  vendorId: integer('vendor_id').references(() => users.id).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).default('pending'), // pending, approved, rejected
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const insertBidSchema = createInsertSchema(bids).pick({
  productId: true,
  buyerId: true,
  vendorId: true,
  amount: true,
  message: true,
});

export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  type: text('type').notNull(), // new_order, listing_created, verification_approved, bid_received, bid_approved, etc.
  title: text('title').notNull(),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false),
  data: text('data'), // JSON string for additional data
  actionUrl: text('action_url'),
  createdAt: timestamp('created_at').defaultNow()
});

export const insertNotificationSchema = createInsertSchema(notifications).pick({
  userId: true,
  type: true,
  title: true,
  message: true,
  data: true,
  actionUrl: true,
});

// Messages table for real-time chat
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderId: integer('sender_id').references(() => users.id).notNull(),
  receiverId: integer('receiver_id').references(() => users.id).notNull(),
  productId: integer('product_id').references(() => products.id),
  content: text('content').notNull(),
  messageType: varchar('message_type', { length: 20 }).default('text'), // text, image
  imageUrl: text('image_url'),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  senderId: true,
  receiverId: true,
  productId: true,
  content: true,
  messageType: true,
  imageUrl: true,
});

// Conversations table to track chat sessions
export const conversations = pgTable('conversations', {
  id: serial('id').primaryKey(),
  buyerId: integer('buyer_id').references(() => users.id).notNull(),
  vendorId: integer('vendor_id').references(() => users.id).notNull(),
  productId: integer('product_id').references(() => products.id),
  lastMessageId: integer('last_message_id').references(() => messages.id),
  lastMessageAt: timestamp('last_message_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertConversationSchema = createInsertSchema(conversations).pick({
  buyerId: true,
  vendorId: true,
  productId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type VendorApplication = typeof vendorApplications.$inferSelect;
export type InsertVendorApplication = z.infer<typeof insertVendorApplicationSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Rating = typeof ratings.$inferSelect;
export type InsertRating = z.infer<typeof insertRatingSchema>;
export type Auction = typeof auctions.$inferSelect;
export type InsertAuction = z.infer<typeof insertAuctionSchema>;
export type Bid = typeof bids.$inferSelect;
export type InsertBid = z.infer<typeof insertBidSchema>;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;