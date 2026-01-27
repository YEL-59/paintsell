"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// get all cart
export const getAllCart = async () => {
    const token = (await cookies()).get('token')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/carts`, {
        method: "GET",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` })
        }
    })
    const result = await res.json();
    return result;
}


// add to cart
export const addToCart = async (data: FieldValues) => {
    const token = (await cookies()).get('token')?.value;
    const formData = new FormData();
    formData.append("product_id", data?.productId);
    formData.append("type", data?.type);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/carts/items`, {
        method: "POST",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: formData
    })
    const result = await res.json();
    return result;
}

// update cart
export const updateCart = async (productId: string, quantity: string) => {
    const token = (await cookies()).get('token')?.value;

    const formData = new FormData();
    formData.append("quantity", quantity);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/carts/items/${productId}`, {
        method: "PUT",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: formData
    })
    const result = await res.json();
    return result;
}

// remove item from cart
export const deleteCart = async (productId: string) => {
    const token = (await cookies()).get('token')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/carts/items/${productId}`, {
        method: "DELETE",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` })
        }
    })
    const result = await res.json();
    return result;
}

// clear all cart
export const clearCart = async () => {
    const token = (await cookies()).get('token')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/carts`, {
        method: "DELETE",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` })
        }
    })
    const result = await res.json();
    return result;
}



