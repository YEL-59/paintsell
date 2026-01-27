/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form"

// register user
export const registerUser = async (userData: FieldValues) => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("password_confirmation", userData.passwordConfirmation);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, {
        method: "POST",
        body: formData
    })
    const result = await res.json();
    return result;
}

// login user
export const loginUser = async (userData: FieldValues) => {
    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("password", userData.password);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
        method: "POST",
        body: formData
    })
    const result = await res.json();
    if (result.status) {
        (await cookies()).set('token', result.token);
        (await cookies()).set('user', JSON.stringify(result.data));
    }
    return result;
}

// get current user
export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get('token')?.value;
    const userData = (await cookies()).get('user')?.value;
    if (accessToken) {
        const { name, role, email, id, avatar } = JSON.parse(userData!);
        return { name, role, email, id, avatar };
    } else {
        return null;
    }
}

// logout user
export const logout = async () => {
    try {
        (await cookies()).delete('token');
        (await cookies()).delete('user');
    } catch (error: any) {
        return Error(error)
    }
}

// change password
export const changePassword = async (data: FieldValues) => {
    const token = (await cookies()).get('token')?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`, {
        method: "POST",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;
}

// forgot password send otp
export const forgotPasswordSendOtp = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/forget-password/send-otp`, {
        method: "POST",
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;
}


// forgot password match verify otp
export const forgotPasswordVerifyOtp = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/forget-password/verify-otp`, {
        method: "POST",
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;
}

// forgot password reset password
export const forgotPasswordResetPassword = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/forget-password/reset-password`, {
        method: "POST",
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;
}