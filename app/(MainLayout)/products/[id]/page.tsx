import ProductDetails from "@/pages/products/productDetails/ProductDetails";
import { getSingleProduct } from "@/services/products";
import { notFound } from "next/navigation";
import { IProductDetails } from "@/types/productDetails";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  const { data: product } = await getSingleProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetails 
      product={product?.product} 
      youMayAlsoLike={product?.you_may_also_like} 
    />
  );
};

export default ProductPage;
