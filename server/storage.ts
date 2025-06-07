import { 
  users, 
  comments, 
  vendorApplications,
  products,
  orders,
  ratings,
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
  type InsertRating
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private comments: Map<string, Comment[]>;
  private vendorApplications: Map<number, VendorApplication>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private ratings: Map<number, Rating>;
  currentId: number;
  currentCommentId: number;
  currentApplicationId: number;
  currentProductId: number;
  currentOrderId: number;
  currentRatingId: number;

  constructor() {
    this.users = new Map();
    this.comments = new Map();
    this.vendorApplications = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.ratings = new Map();
    this.currentId = 1;
    this.currentCommentId = 1;
    this.currentApplicationId = 1;
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentRatingId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      email: insertUser.email || null,
      phone: insertUser.phone || null,
      location: insertUser.location || null,
      accountType: insertUser.accountType || "user",
      verificationStatus: "none",
      salesCount: 0,
      rating: "0.00",
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getComments(listingId: string, listingType: string): Promise<Comment[]> {
    const key = `${listingType}_${listingId}`;
    return this.comments.get(key) || [];
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentCommentId++;
    const comment: Comment = {
      ...insertComment,
      id,
      createdAt: new Date(),
    };
    
    const key = `${insertComment.listingType}_${insertComment.listingId}`;
    const existingComments = this.comments.get(key) || [];
    existingComments.push(comment);
    this.comments.set(key, existingComments);
    
    return comment;
  }

  // Vendor application methods
  async createVendorApplication(application: InsertVendorApplication): Promise<VendorApplication> {
    const id = this.currentApplicationId++;
    const vendorApp: VendorApplication = {
      ...application,
      id,
      businessAddress: application.businessAddress || null,
      businessDescription: application.businessDescription || null,
      verificationSlot: application.verificationSlot || null,
      idDocumentUrl: null,
      shopPhotoUrl: null,
      productPhotosUrls: null,
      status: "pending",
      adminNotes: null,
      submittedAt: new Date(),
      verifiedAt: null
    };
    this.vendorApplications.set(id, vendorApp);
    return vendorApp;
  }

  async getVendorApplication(userId: number): Promise<VendorApplication | undefined> {
    return Array.from(this.vendorApplications.values()).find(app => app.userId === userId);
  }

  async updateVendorApplicationStatus(id: number, status: string, adminNotes?: string): Promise<VendorApplication | undefined> {
    const application = this.vendorApplications.get(id);
    if (!application) return undefined;

    const updated = { 
      ...application, 
      status, 
      adminNotes: adminNotes || application.adminNotes,
      verifiedAt: status === "verified" ? new Date() : application.verifiedAt
    };
    this.vendorApplications.set(id, updated);
    return updated;
  }

  async getAllVendorApplications(): Promise<VendorApplication[]> {
    return Array.from(this.vendorApplications.values());
  }

  // Product methods
  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = {
      ...product,
      id,
      description: product.description || null,
      imageUrls: null,
      location: product.location || null,
      status: "active",
      viewCount: 0,
      salesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByVendor(vendorId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.vendorId === vendorId);
  }

  async getAllProducts(): Promise<Product[]> {
    // Add market line data to products if not already present
    const products = Array.from(this.products.values());
    return products.map(product => ({
      ...product,
      marketId: product.marketId || 'main-market',
      marketLine: product.marketLine || (product.category === 'electronics' ? 'onitsha-line' : 
                                         product.category === 'clothes' ? 'tailoring-line' : 
                                         product.category === 'shoes' ? 'shoe-line' : 
                                         product.category === 'phones' ? 'onitsha-line' : 'back-market')
    }));
  }

  async updateProductViewCount(id: number): Promise<void> {
    const product = this.products.get(id);
    if (product) {
      product.viewCount = (product.viewCount || 0) + 1;
      this.products.set(id, product);
    }
  }

  // Order methods
  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const newOrder: Order = {
      ...order,
      id,
      quantity: order.quantity || 1,
      deliveryMethod: order.deliveryMethod || null,
      paymentStatus: "pending",
      deliveryStatus: "pending",
      buyerConfirmed: false,
      deliveryProofUrl: null,
      createdAt: new Date(),
      confirmedAt: null
    };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByBuyer(buyerId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.buyerId === buyerId);
  }

  async getOrdersByVendor(vendorId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.vendorId === vendorId);
  }

  async updateOrderStatus(id: number, updates: Partial<Order>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updatedOrder = { ...order, ...updates };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Rating methods
  async createRating(rating: InsertRating): Promise<Rating> {
    const id = this.currentRatingId++;
    const newRating: Rating = {
      ...rating,
      id,
      comment: rating.comment || null,
      createdAt: new Date()
    };
    this.ratings.set(id, newRating);
    return newRating;
  }

  async getRatingsByUser(userId: number): Promise<Rating[]> {
    return Array.from(this.ratings.values()).filter(rating => rating.ratedId === userId);
  }

  async getAverageRating(userId: number): Promise<number> {
    const userRatings = await this.getRatingsByUser(userId);
    if (userRatings.length === 0) return 0;
    
    const sum = userRatings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / userRatings.length;
  }
}

import { db } from "./db";
import { eq } from "drizzle-orm";

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
    const [product] = await db.select().from(products).where(eq(products.id, id));
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
}

export const storage = new DatabaseStorage();
