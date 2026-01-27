"use server"

/**
 * Product API service to fetch various product types.
 */

export const getOriginalPaintings = async (page: number = 1, perPage: number = 12, search: string = "") => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/original-paintings?search=${search}&page=${page}&per_page=${perPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 60 }
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Error fetching original paintings:", error);
        return { success: false, message: "Failed to fetch original paintings" };
    }
}

export const getPrintProducts = async (page: number = 1, perPage: number = 12, search: string = "") => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/print?search=${search}&page=${page}&per_page=${perPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 60 }
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Error fetching print products:", error);
        return { success: false, message: "Failed to fetch print products" };
    }
}

export const getSmallPrintProducts = async (page: number = 1, perPage: number = 12, search: string = "") => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/small-print?search=${search}&page=${page}&per_page=${perPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 60 }
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Error fetching small print products:", error);
        return { success: false, message: "Failed to fetch small print products" };
    }
}

export const getLimitedEditionProducts = async (page: number = 1, perPage: number = 12, search: string = "") => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/limited-edition?search=${search}&page=${page}&per_page=${perPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 60 }
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Error fetching limited edition products:", error);
        return { success: false, message: "Failed to fetch limited edition products" };
    }
}



