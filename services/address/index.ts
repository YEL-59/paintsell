"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// get all address
export const getAllAddress = async () => {
    const token = (await cookies()).get('token')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/addresses`, {
        method: "GET",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` })
        }
    })
    const result = await res.json();
    return result;
}

// add address
export const addAddress = async (data: FieldValues) => {
    const token = (await cookies()).get('token')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/addresses`, {
        method: "POST",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;
}

// update address
export const updateAddress = async (id: string, data: FieldValues) => {
    const token = (await cookies()).get('token')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/addresses/${id}`, {
        method: "PUT",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;
}

// delete address
export const deleteAddress = async (id: string) => {
    const token = (await cookies()).get('token')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/addresses/${id}`, {
        method: "DELETE",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` })
        }
    })
    const result = await res.json();
    return result;
}

