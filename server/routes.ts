import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCommentSchema, insertVendorApplicationSchema, insertProductSchema, insertUserSchema, insertBidSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration endpoint
  app.post('/api/users', async (req, res) => {
    try {
      // Handle profile picture if provided
      let profilePictureUrl = null;
      if (req.body.profilePicture) {
        // For now, we'll create a placeholder URL. In production, you'd upload to cloud storage
        profilePictureUrl = `data:image/jpeg;base64,${req.body.profilePicture}`;
      }

      const userData = insertUserSchema.parse({
        ...req.body,
        profilePictureUrl
      });

      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        console.log(`Registration failed: Username '${userData.username}' already exists`);
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Check if email already exists (if provided)
      if (userData.email) {
        const users = await storage.getAllUsers();
        const emailExists = users.some(user => user.email === userData.email);
        if (emailExists) {
          console.log(`Registration failed: Email '${userData.email}' already exists`);
          return res.status(400).json({ message: 'Email already exists' });
        }
      }

      const user = await storage.createUser(userData);
      console.log(`✅ New user registered: ${user.username} (ID: ${user.id})`);

      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      console.error("Error creating user:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: 'Invalid user data provided' });
      }
      res.status(500).json({ message: 'Registration failed' });
    }
  });

  // Login endpoint
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      let user = await storage.getUserByUsername(username);

      // If not found by username, try to find by email
      if (!user) {
        const users = await storage.getAllUsers();
        user = users.find(u => u.email === username);
      }

      if (!user) {
        console.log(`Login attempt failed: User '${username}' not found`);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (user.password !== password) {
        console.log(`Login attempt failed: Invalid password for user '${username}'`);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      console.log(`✅ Successful login for user: ${user.username}`);
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      console.error("Error during login:", error);
      res.status(500).json({ message: 'Login failed' });
    }
  });

  // Get all users (admin only)
  app.get('/api/users', async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      // Remove passwords from response
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      res.json(usersWithoutPasswords);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  });

  // User verification status update
  app.patch('/api/users/:id/verification', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { status } = req.body;

      const user = await storage.updateUserVerificationStatus(userId, status);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      console.error("Error updating verification status:", error);
      res.status(500).json({ message: 'Failed to update verification status' });
    }
  });

  // Comment routes
  app.get("/api/comments/:listingType/:listingId", async (req, res) => {
    try {
      const { listingType, listingId } = req.params;
      const comments = await storage.getComments(listingId, listingType);
      res.json(comments);
    } catch (error: any) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.post("/api/comments", async (req, res) => {
    try {
      const validatedComment = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(validatedComment);
      res.status(201).json(comment);
    } catch (error: any) {
      console.error("Error creating comment:", error);
      res.status(400).json({ message: "Invalid comment data" });
    }
  });

  // Notification routes
  app.get('/api/notifications/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const notifications = await storage.getUserNotifications(userId);
      res.json(notifications);
    } catch (error: any) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post('/api/notifications', async (req, res) => {
    try {
      const notification = await storage.createNotification(req.body);
      res.status(201).json(notification);
    } catch (error: any) {
      console.error("Error creating notification:", error);
      res.status(500).json({ message: "Failed to create notification" });
    }
  });

  app.patch('/api/notifications/:id/read', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const notification = await storage.markNotificationAsRead(id);
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.json(notification);
    } catch (error: any) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  app.patch('/api/notifications/:userId/mark-all-read', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      await storage.markAllNotificationsAsRead(userId);
      res.json({ message: "All notifications marked as read" });
    } catch (error: any) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });

  app.delete('/api/notifications/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNotification(id);
      res.json({ message: "Notification deleted" });
    } catch (error: any) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ message: "Failed to delete notification" });
    }
  });

  // Bid submission endpoint
  app.post('/api/bids', async (req, res) => {
    try {
      const { productId, buyerId, amount, message } = req.body;
      
      // Get product to find vendor
      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const bidData = insertBidSchema.parse({
        productId,
        buyerId,
        vendorId: product.vendorId,
        amount,
        message
      });

      // Create the bid
      const bid = await storage.createBid(bidData);

      // Create notification for vendor
      await storage.createNotification({
        userId: product.vendorId,
        type: 'bid_received',
        title: 'New Bid Received',
        message: `You received a bid of ${parseFloat(amount).toLocaleString()} XAF for "${product.title}"`,
        data: JSON.stringify({ bidId: bid.id, productId, amount }),
        actionUrl: `/vendor/bids/${bid.id}`
      });

      console.log(`✅ Bid submitted: ${amount} XAF for product ${productId} by user ${buyerId}`);
      res.status(201).json(bid);
    } catch (error: any) {
      console.error("Error creating bid:", error);
      res.status(400).json({ message: "Invalid bid data" });
    }
  });

  // Get bids for vendor
  app.get('/api/vendor/:vendorId/bids', async (req, res) => {
    try {
      const vendorId = parseInt(req.params.vendorId);
      const bids = await storage.getBidsByVendor(vendorId);
      res.json(bids);
    } catch (error: any) {
      console.error("Error fetching vendor bids:", error);
      res.status(500).json({ message: "Failed to fetch bids" });
    }
  });

  // Approve/reject bid
  app.patch('/api/bids/:id/status', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body; // 'approved' or 'rejected'
      
      const bid = await storage.updateBidStatus(id, status);
      if (!bid) {
        return res.status(404).json({ message: "Bid not found" });
      }

      // Create notification for buyer
      const notificationType = status === 'approved' ? 'bid_approved' : 'bid_rejected';
      const notificationMessage = status === 'approved' 
        ? `Your bid of ${parseFloat(bid.amount.toString()).toLocaleString()} XAF has been approved!`
        : `Your bid of ${parseFloat(bid.amount.toString()).toLocaleString()} XAF has been rejected.`;

      await storage.createNotification({
        userId: bid.buyerId,
        type: notificationType,
        title: status === 'approved' ? 'Bid Approved' : 'Bid Rejected',
        message: notificationMessage,
        data: JSON.stringify({ bidId: bid.id, productId: bid.productId, amount: bid.amount }),
        actionUrl: `/product/${bid.productId}`
      });

      console.log(`✅ Bid ${status}: ${bid.amount} XAF for product ${bid.productId}`);
      res.json(bid);
    } catch (error: any) {
      console.error("Error updating bid status:", error);
      res.status(500).json({ message: "Failed to update bid status" });
    }
  });

  // Product routes
  app.post('/api/products', async (req, res) => {
    try {
      const validatedProduct = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedProduct);
      res.status(201).json(product);
    } catch (error: any) {
      console.error("Error creating product:", error);
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  app.get('/api/products', async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      // Sort products by creation date (latest first)
      const sortedProducts = products.sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
      res.json(sortedProducts);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get products with vendor information
  app.get('/api/products/with-vendors', async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      const users = await storage.getAllUsers();
      
      const productsWithVendors = products.map(product => {
        const vendor = users.find(user => user.id === product.vendorId);
        return {
          ...product,
          vendor: vendor ? {
            id: vendor.id,
            username: vendor.username,
            profilePictureUrl: vendor.profilePictureUrl
          } : null
        };
      });
      
      const sortedProducts = productsWithVendors.sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
      
      res.json(sortedProducts);
    } catch (error: any) {
      console.error("Error fetching products with vendors:", error);
      res.status(500).json({ message: "Failed to fetch products with vendors" });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Increment view count
      await storage.updateProductViewCount(id);
      
      res.json(product);
    } catch (error: any) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get('/api/products/vendor/:vendorId', async (req, res) => {
    try {
      const vendorId = parseInt(req.params.vendorId);
      const products = await storage.getProductsByVendor(vendorId);
      res.json(products);
    } catch (error: any) {
      console.error("Error fetching vendor products:", error);
      res.status(500).json({ message: "Failed to fetch vendor products" });
    }
  });

  // Vendor application routes
  app.post('/api/vendor/apply', async (req, res) => {
    try {
      const validatedApplication = insertVendorApplicationSchema.parse(req.body);
      const application = await storage.createVendorApplication(validatedApplication);
      res.status(201).json(application);
    } catch (error: any) {
      console.error("Error creating vendor application:", error);
      res.status(400).json({ message: "Invalid application data" });
    }
  });

  app.post('/api/vendor/register', async (req, res) => {
    try {
      const { userId, fullName, phone, location, shopType, businessName, verificationSlot } = req.body;

      // Validate required fields
      if (!userId || !fullName || !phone || !location || !verificationSlot) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const applicationData = {
        userId,
        fullName,
        phone,
        location,
        shopType: shopType || 'online',
        businessName: businessName || fullName + "'s Business",
        verificationSlot
      };

      // Create application with auto-approved status for MVP
      const application = await storage.createVendorApplication(applicationData);

      // Immediately approve the application and update user status
      const approvedApplication = await storage.updateVendorApplicationStatus(application.id, 'Basic Verified');

      // Update user account to vendor with verified status
      await storage.updateUser(userId, {
        verificationStatus: 'basic_verified',
        accountType: 'vendor'
      });

      // Create notification for successful vendor registration
      await storage.createNotification({
        userId,
        type: 'account_verified',
        title: 'Vendor Application Approved',
        message: 'Congratulations! Your vendor application has been approved. You are now a verified vendor.',
        actionUrl: '/profile'
      });

      // Log the auto-approval
      console.log('✅ AUTO-APPROVED (MVP): Vendor registration for', {
        id: application.id,
        fullName,
        phone,
        location,
        verificationSlot,
        status: 'Basic Verified (Auto-approved)',
        submittedAt: new Date().toISOString()
      });

      res.status(201).json({ 
        ...approvedApplication, 
        message: "Application approved successfully! You are now a verified vendor.",
        status: "Basic Verified",
        autoApproved: true
      });
    } catch (error: any) {
      console.error("Error creating vendor registration:", error);
      res.status(500).json({ message: "Failed to submit application" });
    }
  });

  // Get all vendor applications (for admin panel and vendor data)
  app.get('/api/vendor/applications', async (req, res) => {
    try {
      const applications = await storage.getAllVendorApplications();
      res.json(applications);
    } catch (error: any) {
      console.error("Error fetching vendor applications:", error);
      res.status(500).json({ message: "Failed to fetch vendor applications" });
    }
  });

  app.get('/api/vendor/application/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const application = await storage.getVendorApplication(userId);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.json(application);
    } catch (error: any) {
      console.error("Error fetching vendor application:", error);
      res.status(500).json({ message: "Failed to fetch application" });
    }
  });

  // Auction endpoints
  app.post('/api/auctions', async (req, res) => {
    try {
      const { vendorId, title, description, startingPrice, endDate, category, location, images } = req.body;
      
      if (!vendorId || !title || !startingPrice || !endDate) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const auction = await storage.createAuction({
        vendorId,
        title,
        description,
        startingPrice,
        currentPrice: startingPrice,
        endDate: new Date(endDate),
        category,
        location,
        images: images || [],
        status: 'active'
      });

      console.log(`✅ New auction created: ${auction.title} by vendor ${vendorId}`);
      res.status(201).json(auction);
    } catch (error: any) {
      console.error("Error creating auction:", error);
      res.status(500).json({ message: "Failed to create auction" });
    }
  });

  app.get('/api/auctions', async (req, res) => {
    try {
      const auctions = await storage.getAllAuctions();
      res.json(auctions);
    } catch (error: any) {
      console.error("Error fetching auctions:", error);
      res.status(500).json({ message: "Failed to fetch auctions" });
    }
  });

  app.get('/api/auctions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const auction = await storage.getAuction(id);
      if (!auction) {
        return res.status(404).json({ message: "Auction not found" });
      }
      res.json(auction);
    } catch (error: any) {
      console.error("Error fetching auction:", error);
      res.status(500).json({ message: "Failed to fetch auction" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}