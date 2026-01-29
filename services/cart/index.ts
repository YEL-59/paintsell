"use server"

import { cookies } from "next/headers";

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
export const addToCart = async (data: { product_id: string | number; type: string | number; quantity: string | number }) => {
    try {
        const token = (await cookies()).get('token')?.value;
        const formData = new FormData();
        formData.append("product_id", data?.product_id?.toString());
        formData.append("type", data?.type?.toString());
        formData.append("quantity", data?.quantity?.toString());
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/carts/items`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            },
            body: formData
        })
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Error in addToCart:", error);
        return { success: false, message: "Failed to connect to server" };
    }
}

// update cart
export const updateCart = async (itemId: string, productId: string, quantity: string) => {
    const token = (await cookies()).get('token')?.value;

    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("quantity", quantity);
    formData.append("_method", "PUT");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/carts/items/${itemId}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
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



