import SubBanner from "@/common/subBanner/SubBanner";
import CheckoutPage from "@/pages/checkout/CheckoutPage";
import CommonBannerImg from "@/assets/images/common-banner.png";

export const metadata = {
  title: "Checkout | Briataor",
  description: "Complete your purchase at Briataor Art Gallery",
};

const CheckoutRoute = () => {
  return (
    <div>
        <SubBanner backgroundImage={CommonBannerImg} rootPath="/products" rootLabel="All Products" currentPage="Checkout"/>
        <CheckoutPage />
    </div>
  );
};

export default CheckoutRoute;
