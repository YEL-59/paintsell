
import ProductDetails from "@/pages/products/productDetails/ProductDetails";
import { getSingleProduct } from "@/services/products";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface IProductDetails {
  id: number
  name: string
  sku: string
  slug: string
  description: string
  short_description: string
  category: Category
  framed_price: any
  unframed_price: any
  price: string
  stock_quantity: number
  stock_status: string
  is_featured: boolean
  status: string
  images: string[]
  has_framing_options: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  const { data: product } = await getSingleProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product?.product} youMayAlsoLike={product?.you_may_also_like} />;
};

export default ProductPage;
