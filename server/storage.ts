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
    return Array.from(this.products.values());
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

export const storage = new MemStorage();
