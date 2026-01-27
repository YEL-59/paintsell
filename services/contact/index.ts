"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// create contact
export const createContact = async (data: FieldValues) => {
    const token = (await cookies()).get('token')?.value;
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact`, {
        method: "POST",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: formData
    })
    const result = await res.json();
    return result;
}