import { z } from "zod";

// User Schema
export const userSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  fullName: z.string().optional(),
  userType: z.enum(["customer", "provider"]),
});

export type UserFormData = z.infer<typeof userSchema>;

// Profile Schema
export const profileSchema = z.object({
  userId: z.number(),
  fullName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  documentId: z.string().optional(),
  profilePicture: z.string().optional(),
  businessName: z.string().optional(),
  businessDescription: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// Service Schema
export const serviceSchema = z.object({
  providerId: z.number(),
  name: z.string().min(1),
  description: z.string().optional(),
  basePrice: z.number().int().nonnegative(),
  maxPrice: z.number().int().nonnegative().optional(),
  allowsCustomCasket: z.boolean().optional(),
  hasFlowerOptions: z.boolean().optional(),
  hasMemorialRoom: z.boolean().optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export const bookingSchema = z.object({
  customerId: z.union([z.number(), z.string()]).optional(),
  providerId: z.number(),
  serviceId: z.number().optional(),
  status: z.string().default("pending"),
  date: z.date(),
  time: z.string(),
  totalAmount: z.number(),
  notes: z.string().optional(),
  casketId: z.number().optional(),
  flowerId: z.number().optional(),
  memorialRoomId: z.number().optional(),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  contactPhone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),

  // Custom casket parameters (ensure this is consistent with the form)
  customCasket: z.boolean().default(false),
  casketColor: z.string().optional(),
  casketMaterial: z.string().optional(),
  casketFinish: z.string().optional(),
  casketWidth: z.number().optional(),
  casketHeight: z.number().optional(),
  casketLength: z.number().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

// Rating Schema
export const ratingSchema = z.object({
  customerId: z.number(),
  providerId: z.number(),
  bookingId: z.number(),
  rating: z.number().min(1).max(5),
  review: z.string().optional(),
});

export type RatingFormData = z.infer<typeof ratingSchema>;

// Live Session Schema
export const liveSessionSchema = z.object({
  customerId: z.number(),
  serviceId: z.number().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  isPrivate: z.boolean().optional(),
  accessPin: z.string().optional(),
  status: z.enum(["scheduled", "live", "ended"]).default("scheduled"),
  scheduledStartTime: z.date().optional(),
});

export type LiveSessionFormData = z.infer<typeof liveSessionSchema>;
