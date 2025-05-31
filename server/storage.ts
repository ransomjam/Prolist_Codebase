import { users, comments, type User, type InsertUser, type Comment, type InsertComment } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Comment methods
  getComments(listingId: string, listingType: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private comments: Map<string, Comment[]>;
  currentId: number;
  currentCommentId: number;

  constructor() {
    this.users = new Map();
    this.comments = new Map();
    this.currentId = 1;
    this.currentCommentId = 1;
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
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
}

export const storage = new MemStorage();
