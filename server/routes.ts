import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCommentSchema, insertVendorApplicationSchema, insertProductSchema, insertUserSchema } from "@shared/schema";

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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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

  // Remove duplicate - already handled above

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

      // Create notification for vendor about new order
      if (order.vendorId) {
        await storage.createNotification({
          userId: order.vendorId,
          type: 'new_order',
          title: 'New Order Received',
          message: `You received a new order for ${order.productTitle}`,
          actionUrl: '/vendor/orders'
        });
      }

      // Create notification for buyer about order confirmation
      if (order.buyerId) {
        await storage.createNotification({
          userId: order.buyerId,
          type: 'order_confirmed',
          title: 'Order Confirmed',
          message: `Your order for ${order.productTitle} has been confirmed`,
          actionUrl: '/orders'
        });
      }

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

  // Update user endpoint
  app.patch('/api/users/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;

      const updatedUser = await storage.updateUser(id, updates);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;

      // Log premium upgrade
      if (updates.accountType === 'premium') {
        console.log(`✅ PREMIUM UPGRADE: User ${updatedUser.username} (ID: ${id}) upgraded to Premium`);
      }

      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
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

  // Notification routes
  app.get('/api/notifications/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const notifications = await storage.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post('/api/notifications', async (req, res) => {
    try {
      const notification = await storage.createNotification(req.body);
      res.status(201).json(notification);
    } catch (error) {
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
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  app.patch('/api/notifications/:userId/mark-all-read', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      await storage.markAllNotificationsAsRead(userId);
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });

  app.delete('/api/notifications/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNotification(id);
      res.json({ message: "Notification deleted" });
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ message: "Failed to delete notification" });
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
      // Sort products by creation date (latest first)
      const sortedProducts = products.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      res.json(sortedProducts);
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
      // Sort products by creation date (latest first)
      const sortedProducts = products.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      res.json(sortedProducts);
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
```

```tool_code
<replit_final_file>
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCommentSchema, insertVendorApplicationSchema, insertProductSchema, insertUserSchema } from "@shared/schema";

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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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

  // Remove duplicate - already handled above

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

      // Create notification for vendor about new order
      if (order.vendorId) {
        await storage.createNotification({
          userId: order.vendorId,
          type: 'new_order',
          title: 'New Order Received',
          message: `You received a new order for ${order.productTitle}`,
          actionUrl: '/vendor/orders'
        });
      }

      // Create notification for buyer about order confirmation
      if (order.buyerId) {
        await storage.createNotification({
          userId: order.buyerId,
          type: 'order_confirmed',
          title: 'Order Confirmed',
          message: `Your order for ${order.productTitle} has been confirmed`,
          actionUrl: '/orders'
        });
      }

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

  // Update user endpoint
  app.patch('/api/users/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;

      const updatedUser = await storage.updateUser(id, updates);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;

      // Log premium upgrade
      if (updates.accountType === 'premium') {
        console.log(`✅ PREMIUM UPGRADE: User ${updatedUser.username} (ID: ${id}) upgraded to Premium`);
      }

      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
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

  // Notification routes
  app.get('/api/notifications/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const notifications = await storage.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post('/api/notifications', async (req, res) => {
    try {
      const notification = await storage.createNotification(req.body);
      res.status(201).json(notification);
    } catch (error) {
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
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  app.patch('/api/notifications/:userId/mark-all-read', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      await storage.markAllNotificationsAsRead(userId);
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });

  app.delete('/api/notifications/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNotification(id);
      res.json({ message: "Notification deleted" });
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ message: "Failed to delete notification" });
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
      // Sort products by creation date (latest first)
      const sortedProducts = products.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      res.json(sortedProducts);
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
      // Sort products by creation date (latest first)
      const sortedProducts = products.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      res.json(sortedProducts);
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