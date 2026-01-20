import CommonBanner from "@/common/commonBanner/CommonBanner";
import BannerImage from "@/assets/images/all-products-banner.png";
import AllProducts from "@/pages/products/AllProducts";
const AllProductsPage = () => {
  return (
    <div>
      <CommonBanner backgroundImage={BannerImage} title="All Products" />
      <AllProducts />
    </div>
  );
};

export default AllProductsPage;
