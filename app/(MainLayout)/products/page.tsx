import CommonBanner from "@/common/commonBanner/CommonBanner";
import BannerImage from "@/assets/images/all-products-banner.png";
import AllProducts from "@/pages/products/AllProducts";
import { getAllProducts } from "@/services/products";
const AllProductsPage = async () => {
  const { data: allProducts } = await getAllProducts();
  return (
    <div>
      <CommonBanner
        backgroundImage={allProducts?.hero_banner?.image_url || BannerImage}
        title={allProducts?.hero_banner?.title || "All Products"}
      />
      <AllProducts />
    </div>
  );
};

export default AllProductsPage;
