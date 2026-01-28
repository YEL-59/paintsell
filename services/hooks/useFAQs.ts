"use client";

import { useState, useEffect } from "react";
import { getFAQs } from "@/services/faq";

export interface IFAQ {
    id: number;
    question: string;
    answer: string;
    order: number;
    created_at: string;
    updated_at: string;
}

export const useFAQs = () => {
    const [faqs, setFaqs] = useState<IFAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getFAQs();
                if (res.success) {
                    setFaqs(res.data.faqs);
                } else {
                    setError(res.message || "Failed to load FAQs");
                }
            } catch (err) {
                console.error("Error in useFAQs hook:", err);
                setError("An error occurred while loading FAQs");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { faqs, loading, error };
};
