"use server";

export const getFAQs = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/faqs`, {
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
        console.error("Error fetching FAQs:", error);
        return { success: false, message: "Failed to fetch FAQs" };
    }
};
