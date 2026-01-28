"use client";

import { useState, useEffect } from "react";
import { getPrivacyPolicy } from "@/services/privacy";

export interface IPrivacyPolicyData {
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

export const usePrivacyPolicy = () => {
    const [data, setData] = useState<IPrivacyPolicyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getPrivacyPolicy();
                if (res.success) {
                    setData(res.data);
                } else {
                    setError(res.message || "Failed to load privacy policy");
                }
            } catch (err) {
                console.error("Error in usePrivacyPolicy hook:", err);
                setError("An error occurred while loading privacy policy");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
