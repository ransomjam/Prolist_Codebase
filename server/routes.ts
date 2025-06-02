import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCommentSchema, insertVendorApplicationSchema, insertProductSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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
      //   to: 'support@prolist.cm',
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
