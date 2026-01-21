import SubBanner from "@/common/subBanner/SubBanner";
import GallerySection from "@/common/gallery/GallerySection";
import BannerImg from "@/assets/images/common-banner.png";
import { artworkProducts } from "@/constants/products";

const LimitedPrintsPage = () => {
  return (
    <main>
      <SubBanner
        backgroundImage={BannerImg}
        rootPath="/prints"
        rootLabel="Prints"
        currentPage="Limited Addition Print"
      />
      <GallerySection
        title="Limited Addition Print"
        products={artworkProducts}
      />
    </main>
  );
};

export default LimitedPrintsPage;
