"use client";

import { useState, useEffect } from "react";
import { getTermsOfService } from "@/services/terms";

export interface ITermsOfServiceData {
    hero_banner: any | null;
    privacy_policy_section: {
        id: number;
        name: string;
        image: string;
        short_description: string;
        description: string;
        order: number;
        link: string | null;
    }[];
    own_a_timeless_artwork: {
        browse_gallery_link: string;
        contact_us_link: string;
    };
}

export const useTermsOfService = () => {
    const [data, setData] = useState<ITermsOfServiceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getTermsOfService();
                if (res.success) {
                    setData(res.data);
                } else {
                    setError(res.message || "Failed to load terms of service");
                }
            } catch (err) {
                console.error("Error in useTermsOfService hook:", err);
                setError("An error occurred while loading terms of service");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
