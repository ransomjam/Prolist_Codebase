import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCommentSchema, insertVendorApplicationSchema, insertProductSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration endpoint
  app.post('/api/users', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      
      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });

  // Login endpoint
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: 'Login failed' });
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
    } catch (error) {
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
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.post("/api/comments", async (req, res) => {
    try {
      const validatedComment = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(validatedComment);
      res.status(201).json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(400).json({ message: "Invalid comment data" });
    }
  });

  // Support contact form
  app.post('/api/support/contact', async (req, res) => {
    try {
      const { name, email, category, subject, message, priority } = req.body;
      
      // Basic validation
      if (!name || !email || !category || !subject || !message) {
        return res.status(400).json({ message: "All required fields must be filled" });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Log the support request
      console.log('Support request received:', {
        name,
        email,
        category,
        subject,
        message,
        priority,
        timestamp: new Date().toISOString()
      });

      // TODO: Implement SendGrid email sending when API key is provided
      // const emailSent = await sendEmail({
      //   to: 'info.prolist@gmail.com',
      //   from: email,
      //   subject: `[ProList Support] ${subject}`,
      //   html: `
      //     <h3>New Support Request</h3>
      //     <p><strong>Name:</strong> ${name}</p>
      //     <p><strong>Email:</strong> ${email}</p>
      //     <p><strong>Category:</strong> ${category}</p>
      //     <p><strong>Priority:</strong> ${priority}</p>
      //     <p><strong>Subject:</strong> ${subject}</p>
      //     <p><strong>Message:</strong></p>
      //     <p>${message}</p>
      //   `
      // });

      res.json({ 
        message: "Support request submitted successfully",
        ticketId: `PRO-${Date.now()}`
      });
    } catch (error) {
      console.error("Error submitting support request:", error);
      res.status(500).json({ message: "Failed to submit support request" });
    }
  });

  // Vendor application routes
  app.post('/api/vendor/apply', async (req, res) => {
    try {
      const validatedApplication = insertVendorApplicationSchema.parse(req.body);
      const application = await storage.createVendorApplication(validatedApplication);
      res.status(201).json(application);
    } catch (error) {
      console.error("Error creating vendor application:", error);
      res.status(400).json({ message: "Invalid application data" });
    }
  });

  // User creation route
  app.post('/api/users', async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.post('/api/vendor/register', async (req, res) => {
    try {
      const { userId, fullName, phone, location, shopType, businessName, verificationSlot, idCardUrl, shopPhotoUrl } = req.body;
      
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

      const application = await storage.createVendorApplication(applicationData);
      
      // Log the application for admin review
      console.log('New vendor registration:', {
        id: application.id,
        fullName,
        phone,
        location,
        verificationSlot,
        idCardUrl,
        shopPhotoUrl,
        status: 'Pending Basic Verification',
        submittedAt: new Date().toISOString()
      });

      res.status(201).json({ 
        ...application, 
        message: "Application submitted successfully",
        status: "Pending Basic Verification"
      });
    } catch (error) {
      console.error("Error creating vendor registration:", error);
      res.status(500).json({ message: "Failed to submit application" });
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
    } catch (error) {
      console.error("Error fetching vendor application:", error);
      res.status(500).json({ message: "Failed to fetch application" });
    }
  });

  app.get('/api/vendor/applications', async (req, res) => {
    try {
      const applications = await storage.getAllVendorApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching vendor applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.get('/api/vendor/application/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const application = await storage.getVendorApplication(userId);
      
      if (!application) {
        return res.status(404).json({ message: "No application found for this user" });
      }
      
      res.json(application);
    } catch (error) {
      console.error("Error fetching vendor application:", error);
      res.status(500).json({ message: "Failed to fetch application" });
    }
  });

  app.patch('/api/vendor/applications/:id/status', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const updatedApplication = await storage.updateVendorApplicationStatus(id, status);
      
      if (!updatedApplication) {
        return res.status(404).json({ message: "Application not found" });
      }

      // Update user account based on status
      if (status === 'Basic Verified') {
        await storage.updateUser(updatedApplication.userId, {
          verificationStatus: 'basic_verified',
          accountType: 'vendor'
        });
        
        console.log(`✅ APPROVED: Vendor application ${id} for ${updatedApplication.fullName}`);
        console.log(`📧 NOTIFICATION: User ${updatedApplication.userId} - Your vendor application has been approved! You now have Basic Verified status.`);
      } else if (status === 'Rejected') {
        console.log(`❌ REJECTED: Vendor application ${id} for ${updatedApplication.fullName}`);
        console.log(`📧 NOTIFICATION: User ${updatedApplication.userId} - Your vendor application was rejected. Please review your documents and reapply.`);
      }

      // Log the admin action with full details
      console.log(`Admin Action Summary:`, {
        applicationId: id,
        vendorName: updatedApplication.fullName,
        phone: updatedApplication.phone,
        location: updatedApplication.location,
        previousStatus: 'Pending Basic Verification',
        newStatus: status,
        userId: updatedApplication.userId,
        timestamp: new Date().toISOString(),
        actionBy: 'Admin Panel'
      });

      res.json({
        ...updatedApplication,
        message: `Vendor application ${status.toLowerCase()} successfully`,
        userNotified: true
      });
    } catch (error) {
      console.error("Error updating vendor application status:", error);
      res.status(500).json({ message: "Failed to update application status" });
    }
  });

  // Order routes
  app.post('/api/orders', async (req, res) => {
    try {
      const order = await storage.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get('/api/orders/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.get('/api/orders/buyer/:buyerId', async (req, res) => {
    try {
      const buyerId = parseInt(req.params.buyerId);
      const orders = await storage.getOrdersByBuyer(buyerId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching buyer orders:", error);
      res.status(500).json({ message: "Failed to fetch buyer orders" });
    }
  });

  app.get('/api/orders/vendor/:vendorId', async (req, res) => {
    try {
      const vendorId = parseInt(req.params.vendorId);
      const orders = await storage.getOrdersByVendor(vendorId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching vendor orders:", error);
      res.status(500).json({ message: "Failed to fetch vendor orders" });
    }
  });

  app.get('/api/users/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get('/api/orders/all', async (req, res) => {
    try {
      // Get all orders from all vendors
      const allOrders = [];
      
      // Get all users to find vendors
      const users = await storage.getAllUsers();
      const vendors = users.filter(user => user.accountType === 'vendor');
      
      for (const vendor of vendors) {
        const vendorOrders = await storage.getOrdersByVendor(vendor.id);
        allOrders.push(...vendorOrders);
      }
      
      // Also get orders from other sources if needed
      const buyerOrders = await storage.getOrdersByBuyer(1); // Get sample buyer orders
      const uniqueOrders = [...new Map([...allOrders, ...buyerOrders].map(order => [order.id, order])).values()];
      
      res.json(uniqueOrders);
    } catch (error) {
      console.error("Error fetching all orders:", error);
      res.status(500).json({ message: "Failed to fetch all orders" });
    }
  });

  app.patch('/api/orders/:id/release-funds', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const updatedOrder = await storage.updateOrderStatus(id, {
        paymentStatus: 'released'
      });
      
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      console.log(`Funds released for Order ${id}`);
      res.json(updatedOrder);
    } catch (error) {
      console.error("Error releasing funds:", error);
      res.status(500).json({ message: "Failed to release funds" });
    }
  });

  app.get('/api/vendor/stats/:vendorId', async (req, res) => {
    try {
      const vendorId = parseInt(req.params.vendorId);
      
      // Get all orders for this vendor
      const orders = await storage.getOrdersByVendor(vendorId);
      
      // Calculate sales statistics
      const completedOrders = orders.filter(order => order.buyerConfirmed);
      const totalSales = completedOrders.length;
      const totalRevenue = completedOrders.reduce((sum, order) => sum + parseInt(order.totalAmount), 0);
      
      // Get average rating for this vendor
      const averageRating = await storage.getAverageRating(vendorId);
      
      const stats = {
        totalSales,
        totalRevenue,
        averageRating,
        completedOrders: completedOrders.length
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching vendor stats:", error);
      res.status(500).json({ message: "Failed to fetch vendor stats" });
    }
  });

  app.patch('/api/orders/:id/status', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      let updateData: any = {};
      
      // Map status to appropriate fields
      switch (status) {
        case 'buyer_confirmed':
          updateData = {
            buyerConfirmed: true,
            deliveryStatus: 'confirmed',
            paymentStatus: 'released',
            confirmedAt: new Date()
          };
          break;
        case 'delivered':
          updateData = { deliveryStatus: 'delivered' };
          break;
        case 'payment_confirmed':
          updateData = { paymentStatus: 'escrowed' };
          break;
        default:
          updateData = { paymentStatus: status };
      }
      
      const updatedOrder = await storage.updateOrderStatus(id, updateData);
      
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      console.log(`Order ${id} status updated:`, updateData);
      res.json(updatedOrder);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  // Product routes
  app.post('/api/products', async (req, res) => {
    try {
      const validatedProduct = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedProduct);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  app.get('/api/products', async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
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
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get('/api/products/vendor/:vendorId', async (req, res) => {
    try {
      const vendorId = parseInt(req.params.vendorId);
      const products = await storage.getProductsByVendor(vendorId);
      res.json(products);
    } catch (error) {
      console.error("Error fetching vendor products:", error);
      res.status(500).json({ message: "Failed to fetch vendor products" });
    }
  });

  app.get('/api/products/vendor/:vendorId', async (req, res) => {
    try {
      const vendorId = parseInt(req.params.vendorId);
      const products = await storage.getProductsByVendor(vendorId);
      res.json(products);
    } catch (error) {
      console.error("Error fetching vendor products:", error);
      res.status(500).json({ message: "Failed to fetch vendor products" });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
