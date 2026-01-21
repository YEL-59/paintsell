import { artworkProducts, artOriginalWorkProducts } from "@/constants/products";
import ProductDetails from "@/pages/products/productDetails/ProductDetails";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;

  // Search in both collections
  const product = [...artworkProducts, ...artOriginalWorkProducts].find(
    (p) => p.id === parseInt(id),
  );

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
};

export default ProductPage;
