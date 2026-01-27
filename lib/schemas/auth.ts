import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const forgetPasswordSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const otpSchema = z.object({
    otp: z.string().min(6, "Please enter all 6 digits"),
});


export const passwordChangeSchema = z.object({
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;

