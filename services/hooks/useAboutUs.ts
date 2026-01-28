"use client";

import { useState, useEffect } from "react";
import { getAboutUsData } from "@/services/about";

export interface IAboutUsData {
    hero_banner: {
        id: number;
        title: string;
        image: string;
        video_url: string | null;
    };
    about_section: {
        id: number;
        name: string;
        image: string;
        short_description: string;
        description: string;
        order: number;
        link: string | null;
    }[];
    exhibitions: {
        id: number;
        image: string;
        titles: {
            id: number;
            title: string;
        }[];
    }[];
    own_a_timeless_artwork: {
        browse_gallery_link: string;
        contact_us_link: string;
    };
}

export const useAboutUs = () => {
    const [data, setData] = useState<IAboutUsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getAboutUsData();
                if (res.success) {
                    setData(res.data);
                } else {
                    setError(res.message || "Failed to load about us data");
                }
            } catch (err) {
                console.error("Error in useAboutUs hook:", err);
                setError("An error occurred while loading about us data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
