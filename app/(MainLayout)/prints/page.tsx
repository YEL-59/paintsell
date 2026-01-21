import BannerImg from "@/assets/images/common-banner.png";
import GallerySection from "@/common/gallery/GallerySection";
import SubBanner from "@/common/subBanner/SubBanner";
import { artworkProducts } from "@/constants/products";

const PrintsPage = () => {
  return (
    <main>
      <SubBanner
        backgroundImage={BannerImg}
        rootPath="/prints"
        rootLabel="Prints"
        currentPage="Print"
      />
      <GallerySection title="Fine Art Print" products={artworkProducts} />
    </main>
  );
};

export default PrintsPage;
