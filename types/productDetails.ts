export interface IProductDetails {
    id: number;
    name: string;
    sku: string;
    slug: string;
    description: string;
    short_description: string;
    category: Category;
    framed_price: any;
    unframed_price: any;
    price: string;
    stock_quantity: number;
    stock_status: string;
    is_featured: boolean;
    status: string;
    images: string[];
    has_framing_options: boolean;
    framed_option: string;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
}
