import BannerImg from "@/assets/images/common-banner.png";
import SubBanner from "@/common/subBanner/SubBanner";
import AllPrints from "@/pages/prints/allPrints/AllPrints";

const PrintsPage = () => {
  return (
    <main>
      <SubBanner
        backgroundImage={BannerImg}
        rootPath="/prints"
        rootLabel="Prints"
        currentPage="Print"
      />
      <AllPrints />
    </main>
  );
};

export default PrintsPage;
