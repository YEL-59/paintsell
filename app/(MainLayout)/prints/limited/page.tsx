import SubBanner from "@/common/subBanner/SubBanner";
import BannerImg from "@/assets/images/common-banner.png";
import AllLimitedEditions from "@/pages/prints/limited/AllLimitedEditions";

const LimitedPrintsPage = () => {
  return (
    <main>
      <SubBanner
        backgroundImage={BannerImg}
        rootPath="/prints"
        rootLabel="Prints"
        currentPage="Limited Addition Print"
      />
      <AllLimitedEditions />
    </main>
  );
};

export default LimitedPrintsPage;
