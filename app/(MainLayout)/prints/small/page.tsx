import BannerImg from "@/assets/images/common-banner.png";
import SubBanner from "@/common/subBanner/SubBanner";
import AllSmallPrints from "@/pages/prints/small/AllSmallPrints";

const SmallPrintsPage = () => {
  return (
    <main>
      <SubBanner
        backgroundImage={BannerImg}
        rootPath="/prints"
        rootLabel="Prints"
        currentPage="Small prints"
      />
      <AllSmallPrints />
    </main>
  );
};

export default SmallPrintsPage;
