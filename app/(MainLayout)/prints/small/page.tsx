"use client";

import SubBanner from "@/common/subBanner/SubBanner";
import GallerySection from "@/common/gallery/GallerySection";
import BannerImg from "@/assets/images/common-banner.png";
import { artworkProducts } from "@/constants/products";

const SmallPrintsPage = () => {
  return (
    <main>
      <SubBanner
        backgroundImage={BannerImg}
        rootPath="/prints"
        rootLabel="Prints"
        currentPage="Small prints"
      />
      <GallerySection title="Our Art Small Print" products={artworkProducts} />
    </main>
  );
};

export default SmallPrintsPage;
