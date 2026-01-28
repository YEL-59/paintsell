"use server";

export const getAboutUsData = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about-us`, {
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
        console.error("Error fetching about us data:", error);
        return { success: false, message: "Failed to fetch about us data" };
    }
};
