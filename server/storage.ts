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
    console.log(`Looking up user by username: ${username}`);
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    console.log('Creating user with data:', { ...insertUser, password: '[HIDDEN]' });
    const id = this.currentId++;
    const user: User = { 
      id,
      username: insertUser.username,
      password: insertUser.password,
      email: insertUser.email || null,
      phone: insertUser.phone || null,
      location: insertUser.location || null,
      accountType: insertUser.accountType || "user",
      specialization: insertUser.specialization || null,
      verificationStatus: "pending",
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

  async updateUserVerificationStatus(id: number, status: string): Promise<User | undefined> {
    return this.updateUser(id, { verificationStatus: status });
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
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

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updated = { ...user, ...updates };
    this.users.set(id, updated);
    return updated;
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
      marketId: null,
      marketLine: null,
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
import type { User, VendorApplication, Product, Order, Comment, Rating, InsertVendorApplication, InsertProduct, InsertOrder, InsertComment, InsertRating } from "@shared/schema";
import { users, vendorApplications, products, orders, comments, ratings } from "@shared/schema";
import { eq } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    console.log(`Looking up user by username: ${username}`);
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    console.log('Creating user with data:', { ...insertUser, password: '[HIDDEN]' });
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

  async updateUserVerificationStatus(userId: number, status: string) {
    const [updatedUser] = await db.update(users)
      .set({ verificationStatus: status })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  async updateUser(userId: number, updates: any) {
    const [updatedUser] = await db.update(users)
      .set(updates)
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  async seedDummyVendors(): Promise<void> {
    // Check if vendors already exist
    const existingVendors = await db.select().from(users).where(eq(users.accountType, 'vendor')).limit(1);
    if (existingVendors.length > 0) {
      return; // Already seeded
    }

    // Create verified vendor users
    const vendorUsers = [
      {
        username: "sarahmbah_tech",
        password: "vendor123",
        email: "sarah@techbamenda.com",
        phone: "+237678901234",
        location: "Nkwen, Bamenda",
        accountType: "vendor",
        verificationStatus: "basic_verified",
        salesCount: 15,
        rating: "4.7"
      },
      {
        username: "johnfru_fashion",
        password: "vendor123",
        email: "john@frusfashion.com",
        phone: "+237677654321",
        location: "Main Market Bamenda",
        accountType: "vendor",
        verificationStatus: "premium_verified",
        salesCount: 28,
        rating: "4.8"
      },
      {
        username: "gracetanyi_electronics",
        password: "vendor123",
        email: "grace@electronicshub.com",
        phone: "+237681234567",
        location: "Up Station, Bamenda",
        accountType: "vendor",
        verificationStatus: "basic_verified",
        salesCount: 42,
        rating: "4.6"
      },
      {
        username: "peterkum_services",
        password: "vendor123",
        email: "peter@kumservices.com",
        phone: "+237679876543",
        location: "Commercial Avenue",
        accountType: "vendor",
        verificationStatus: "premium_verified",
        salesCount: 67,
        rating: "4.9"
      }
    ];

    for (const vendor of vendorUsers) {
      await db.insert(users).values(vendor);
    }

    // Create corresponding vendor applications
    const vendorApplications = [
      {
        userId: 1,
        fullName: "Sarah Mbah",
        phone: "+237678901234",
        location: "Nkwen, Bamenda",
        shopType: "physical",
        businessName: "Tech Paradise Bamenda",
        businessAddress: "Shop 15, Nkwen Tech Plaza",
        businessDescription: "Premium electronics and phone accessories",
        status: "Basic Verified"
      },
      {
        userId: 2,
        fullName: "John Fru",
        phone: "+237677654321",
        location: "Main Market Bamenda",
        shopType: "physical",
        businessName: "Fru's Fashion House",
        businessAddress: "Stall 8, Main Market Fashion Line",
        businessDescription: "Quality clothing and footwear for all ages",
        status: "Premium Verified"
      },
      {
        userId: 3,
        fullName: "Grace Tanyi",
        phone: "+237681234567",
        location: "Up Station, Bamenda",
        shopType: "physical",
        businessName: "Electronics Hub",
        businessAddress: "Block A, Up Station Commercial Center",
        businessDescription: "Computers, gadgets and electronic repairs",
        status: "Basic Verified"
      },
      {
        userId: 4,
        fullName: "Peter Kum",
        phone: "+237679876543",
        location: "Commercial Avenue",
        shopType: "online",
        businessName: "Kum Professional Services",
        businessAddress: "Office 12, Commercial Avenue Plaza",
        businessDescription: "Web development, digital services and consulting",
        status: "Premium Verified"
      }
    ];

    for (const application of vendorApplications) {
      await db.insert(vendorApplications).values(application);
    }

    console.log("✅ Dummy vendors seeded successfully");
  }

  async seedDummyProducts(): Promise<void> {
    // First seed vendors
    await this.seedDummyVendors();

    // Check if dummy products already exist
    const existingProducts = await db.select().from(products).limit(1);
    if (existingProducts.length > 0) {
      return; // Already seeded
    }

    const dummyProducts: InsertProduct[] = [
      {
        vendorId: 1, // Sarah Mbah - Tech Paradise
        title: "Samsung Galaxy S23 Ultra",
        category: "Phones",
        price: "700000",
        description: "Latest Samsung flagship with 256GB storage, excellent camera, and S-Pen functionality. Perfect condition with warranty.",
        location: "Nkwen, Bamenda"
      },
      {
        vendorId: 2, // John Fru - Fashion House
        title: "Nike Airforce 1",
        category: "Shoes",
        price: "45000",
        description: "Classic white Nike Airforce 1 sneakers, size 42. Authentic and in excellent condition.",
        location: "Main Market Bamenda"
      },
      {
        vendorId: 1, // Sarah Mbah - Tech Paradise
        title: "iPhone 14 Pro Max",
        category: "Phones",
        price: "850000",
        description: "Apple iPhone 14 Pro Max 256GB, unlocked, with original accessories and warranty.",
        location: "Nkwen, Bamenda"
      },
      {
        vendorId: 3, // Grace Tanyi - Electronics Hub
        title: "MacBook Pro M2",
        category: "Electronics",
        price: "1200000",
        description: "MacBook Pro 13-inch with M2 chip, 16GB RAM, 512GB SSD. Perfect for work and creativity.",
        location: "Up Station, Bamenda"
      },
      {
        vendorId: 2, // John Fru - Fashion House
        title: "Traditional Kaba",
        category: "Clothes",
        price: "25000",
        description: "Beautiful handmade traditional Kaba dress, authentic African design with premium fabric.",
        location: "Main Market Bamenda"
      },
      {
        vendorId: 4, // Peter Kum - Professional Services
        title: "Toyota Camry 2020",
        category: "Assets",
        price: "18000000",
        description: "Well-maintained Toyota Camry 2020, low mileage, full service history, clean documents.",
        location: "Commercial Avenue"
      },
      {
        vendorId: 4, // Peter Kum - Professional Services
        title: "Web Design Services",
        category: "Services",
        price: "50000",
        description: "Professional web design and development services for small businesses and individuals.",
        location: "Commercial Avenue, Bamenda"
      },
      {
        vendorId: 3, // Grace Tanyi - Electronics Hub
        title: "Gaming Setup Complete",
        category: "Electronics",
        price: "250000",
        description: "Complete gaming setup with RGB keyboard, gaming mouse, and headset. Perfect for gamers.",
        location: "Up Station, Bamenda"
      }
    ];

    for (const product of dummyProducts) {
      await db.insert(products).values(product);
    }

    console.log("✅ Dummy products seeded successfully");
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

export const storage = new MemStorage();