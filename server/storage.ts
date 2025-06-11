import { 
  users, 
  comments, 
  vendorApplications,
  products,
  orders,
  ratings,
  notifications,
  auctions,
  type User, 
  type InsertUser, 
  type Comment, 
  type InsertComment,
  type VendorApplication,
  type InsertVendorApplication,
  type Product,
  type InsertProduct,
  type Order,
  type InsertOrder,
  type Rating,
  type InsertRating,
  type Auction,
  type InsertAuction,
  type Notification,
  type InsertNotification
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  updateUserVerificationStatus(id: number, status: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;

  // Comment methods
  getComments(listingId: string, listingType: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;

  // Vendor application methods
  createVendorApplication(application: InsertVendorApplication): Promise<VendorApplication>;
  getVendorApplication(userId: number): Promise<VendorApplication | undefined>;
  updateVendorApplicationStatus(id: number, status: string, adminNotes?: string): Promise<VendorApplication | undefined>;
  getAllVendorApplications(): Promise<VendorApplication[]>;

  // Product methods
  createProduct(product: InsertProduct): Promise<Product>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByVendor(vendorId: number): Promise<Product[]>;
  getAllProducts(): Promise<Product[]>;
  updateProductViewCount(id: number): Promise<void>;

  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByBuyer(buyerId: number): Promise<Order[]>;
  getOrdersByVendor(vendorId: number): Promise<Order[]>;
  updateOrderStatus(id: number, updates: Partial<Order>): Promise<Order | undefined>;

  // Rating methods
  createRating(rating: InsertRating): Promise<Rating>;
  getRatingsByUser(userId: number): Promise<Rating[]>;
  getAverageRating(userId: number): Promise<number>;

  // Auction methods
  createAuction(auction: InsertAuction): Promise<Auction>;
  getAuction(id: number): Promise<Auction | undefined>;
  getAllAuctions(): Promise<Auction[]>;
  getAuctionsByVendor(vendorId: number): Promise<Auction[]>;
  updateAuctionStatus(id: number, status: string): Promise<Auction | undefined>;
  
  // Notification methods
  getUserNotifications(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<Notification | undefined>;
  markAllNotificationsAsRead(userId: number): Promise<void>;
  deleteNotification(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return user || undefined;
  }

  async updateUserVerificationStatus(id: number, status: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ verificationStatus: status })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getComments(listingId: string, listingType: string): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.listingId, listingId));
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const [comment] = await db.insert(comments).values(insertComment).returning();
    return comment;
  }

  async createVendorApplication(application: InsertVendorApplication): Promise<VendorApplication> {
    const [vendorApp] = await db.insert(vendorApplications).values(application).returning();
    return vendorApp;
  }

  async getVendorApplication(userId: number): Promise<VendorApplication | undefined> {
    const [application] = await db.select().from(vendorApplications).where(eq(vendorApplications.userId, userId));
    return application || undefined;
  }

  async updateVendorApplicationStatus(id: number, status: string, adminNotes?: string): Promise<VendorApplication | undefined> {
    const [application] = await db.update(vendorApplications)
      .set({ status, adminNotes, verifiedAt: new Date() })
      .where(eq(vendorApplications.id, id))
      .returning();
    return application || undefined;
  }

  async getAllVendorApplications(): Promise<VendorApplication[]> {
    return await db.select().from(vendorApplications);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductsByVendor(vendorId: number): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.vendorId, vendorId));
  }

  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async updateProductViewCount(id: number): Promise<void> {
    // Get current product to increment view count
    const product = await this.getProduct(id);
    if (product) {
      await db.update(products)
        .set({ viewCount: (product.viewCount || 0) + 1 })
        .where(eq(products.id, id));
    }
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async getOrdersByBuyer(buyerId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.buyerId, buyerId));
  }

  async getOrdersByVendor(vendorId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.vendorId, vendorId));
  }

  async updateOrderStatus(id: number, updates: Partial<Order>): Promise<Order | undefined> {
    const [order] = await db.update(orders).set(updates).where(eq(orders.id, id)).returning();
    return order || undefined;
  }

  async createRating(rating: InsertRating): Promise<Rating> {
    const [newRating] = await db.insert(ratings).values(rating).returning();
    return newRating;
  }

  async getRatingsByUser(userId: number): Promise<Rating[]> {
    return await db.select().from(ratings).where(eq(ratings.ratedId, userId));
  }

  async getAverageRating(userId: number): Promise<number> {
    const userRatings = await this.getRatingsByUser(userId);
    if (userRatings.length === 0) return 0;

    const sum = userRatings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / userRatings.length;
  }

  async getUserNotifications(userId: number): Promise<Notification[]> {
    return await db.select().from(notifications).where(eq(notifications.userId, userId));
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }

  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const [updatedNotification] = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id))
      .returning();
    return updatedNotification;
  }

  async markAllNotificationsAsRead(userId: number): Promise<void> {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userId, userId));
  }

  async deleteNotification(id: number): Promise<void> {
    await db.delete(notifications).where(eq(notifications.id, id));
  }

  // Auction methods implementation
  async createAuction(insertAuction: InsertAuction): Promise<Auction> {
    const [auction] = await db
      .insert(auctions)
      .values(insertAuction)
      .returning();
    return auction;
  }

  async getAuction(id: number): Promise<Auction | undefined> {
    const [auction] = await db.select().from(auctions).where(eq(auctions.id, id));
    return auction || undefined;
  }

  async getAllAuctions(): Promise<Auction[]> {
    return await db.select().from(auctions);
  }

  async getAuctionsByVendor(vendorId: number): Promise<Auction[]> {
    return await db.select().from(auctions).where(eq(auctions.vendorId, vendorId));
  }

  async updateAuctionStatus(id: number, status: string): Promise<Auction | undefined> {
    const [updatedAuction] = await db
      .update(auctions)
      .set({ status })
      .where(eq(auctions.id, id))
      .returning();
    return updatedAuction;
  }
}

export const storage = new DatabaseStorage();