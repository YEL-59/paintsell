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
    console.log("LOGIN_RESPONSE:", { status: result.status, success: result.success, hasToken: !!result.token, hasData: !!result.data });

    if (result.status === true || result.success === true) {
        (await cookies()).set('token', result.token);
        (await cookies()).set('user', JSON.stringify(result.data));
    }
    return result;

}


// get current user
export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get('token')?.value;
    const userData = (await cookies()).get('user')?.value;

    console.log("AUTH_CHECK - Token:", !!accessToken, "UserCookie:", !!userData);

    if (userData) {
        try {
            const parsedUser = JSON.parse(userData);
            console.log("AUTH_CHECK - User Keys:", Object.keys(parsedUser));
            return parsedUser;
        } catch (error) {
            console.error("Error parsing user data cookie:", error);
            return null;
        }
    }
    return null;
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
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            operation: "password"
        })
    })
    const result = await res.json();
    return result;
}




// forgot password match verify otp
export const forgotPasswordVerifyOtp = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/forget-password/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            otp: data.otp,
            operation: "password"
        })
    })
    const result = await res.json();
    return result;
}



// forgot password reset password
export const forgotPasswordResetPassword = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/forget-password/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,

        })
    })
    const result = await res.json();
    return result;
}

