"use server";

export const getTermsOfService = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/terms-of-service`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 60,
            },
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Error fetching terms of service:", error);
        return { success: false, message: "Failed to fetch terms of service" };
    }
};
