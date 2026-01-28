"use client";

import { useState, useEffect, useCallback } from "react";
import { getOriginalPaintings, getPrintProducts, getSmallPrintProducts, getLimitedEditionProducts, getAllProducts } from "@/services/products";
import { toast } from "sonner";

interface IBaseProduct {
    id: number;
    product_name: string;
    framed_price: string;
    unframed_price: string;
    image: string;
}

interface IOriginalPainting extends IBaseProduct {
    short_description: string;
    description: string;
}

interface IPrintProduct extends IBaseProduct { }
interface ISmallPrintProduct extends IBaseProduct { }

interface IPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

/**
 * Generic product hook for better code reuse
 */
const useProductFetch = (
    fetchFn: (page: number, perPage: number, search: string) => Promise<any>,
    dataKey: string,
    initialPage: number = 1,
    perPage: number = 12
) => {
    const [products, setProducts] = useState<any[]>([]);
    const [pagination, setPagination] = useState<IPagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSort, setActiveSort] = useState("Default");

    const fetchData = useCallback(async (page: number, search: string) => {
        setLoading(true);
        try {
            const res = await fetchFn(page, perPage, search);
            if (res.success) {
                setProducts(res.data[dataKey].data);
                setPagination(res.data[dataKey].pagination);
            } else {
                toast.error(res.message || "Failed to load products");
            }
        } catch (error) {
            console.error(`Error in hook for ${dataKey}:`, error);
            toast.error("An error occurred while loading products");
        } finally {
            setLoading(false);
        }
    }, [fetchFn, perPage, dataKey]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchData(currentPage, searchQuery);
        }, searchQuery ? 500 : 0);
        return () => clearTimeout(timeoutId);
    }, [currentPage, searchQuery, fetchData]);

    // Apply sorting
    const sortedProducts = (() => {
        const items = [...products];
        switch (activeSort) {
            case "Newest Artist":
            case "Newest artist":
                return items.sort((a, b) => b.id - a.id);
            case "Oldest Artist":
            case "Oldest artist":
                return items.sort((a, b) => a.id - b.id);
            case "Latest Price":
            case "Least Price":
                return items.sort((a, b) => {
                    const priceA = parseFloat(a.unframed_price || a.framed_price || a.price || 0);
                    const priceB = parseFloat(b.unframed_price || b.framed_price || b.price || 0);
                    return priceA - priceB;
                });
            case "Most Price":
                return items.sort((a, b) => {
                    const priceA = parseFloat(a.unframed_price || a.framed_price || a.price || 0);
                    const priceB = parseFloat(b.unframed_price || b.framed_price || b.price || 0);
                    return priceB - priceA;
                });
            default:
                return items;
        }
    })();

    return {
        products: sortedProducts,
        pagination,
        loading,
        currentPage,
        searchQuery,
        activeSort,
        handlePageChange: (page: number) => setCurrentPage(page),
        handleSearch: (query: string) => {
            setSearchQuery(query);
            setCurrentPage(1);
        },
        handleSort: (sort: string) => {
            setActiveSort(sort);
        },
        refresh: () => fetchData(currentPage, searchQuery)
    };
};

export const useOriginalPaintings = (initialPage: number = 1, perPage: number = 12) => {
    return useProductFetch(getOriginalPaintings, "original_paintings", initialPage, perPage);
};

export const usePrintProducts = (initialPage: number = 1, perPage: number = 12) => {
    return useProductFetch(getPrintProducts, "print_products", initialPage, perPage);
};

export const useSmallPrintProducts = (initialPage: number = 1, perPage: number = 12) => {
    return useProductFetch(getSmallPrintProducts, "small_print_products", initialPage, perPage);
};



// ... (rest of imports map to same lines, just updating line 4)

// ... (keeping existing hooks)

export const useLimitedEditionProducts = (initialPage: number = 1, perPage: number = 12) => {
    return useProductFetch(getLimitedEditionProducts, "limited_edition_products", initialPage, perPage);
};

export const useAllProducts = (initialPage: number = 1, perPage: number = 12) => {
    return useProductFetch(getAllProducts, "featured_works", initialPage, perPage);
};
