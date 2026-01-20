import CommonBanner from "@/common/commonBanner/CommonBanner";
import BannerImg from "@/assets/images/orginal-work-banner.png";
import AllOriginalPaintings from "@/pages/original-works/allOriginalPaintings/AllOriginalPaintings";

const OriginalWorksPage = () => {
  return (
    <div>
      <CommonBanner backgroundImage={BannerImg} title="Original Works" />
      <AllOriginalPaintings/>
    </div>
  );
};

export default OriginalWorksPage;
