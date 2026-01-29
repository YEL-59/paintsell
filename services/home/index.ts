"use server";

export const getAllHomeData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/landing-page`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 60,
            },
        })
        const result = await res.json();
        return result;
}

// post newslatter
export const postNewslatter = async (email: string) => {
    const formData = new FormData();
    formData.append("email", email);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/landing-page`, {
            method: "POST",
            body: formData,
        })
        const result = await res.json();
        return result;
}