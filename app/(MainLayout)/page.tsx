import Banner from "@/pages/home/banner/Banner";
import FeaturedWorks from "@/pages/home/featured-works/FeaturedWorks";
import MeetArtist from "@/pages/home/artist/MeetArtist";
import InstagramSection from "@/pages/home/instagram/InstagramSection";
import SmallPrint from "@/pages/home/small-print/SmallPrint";
import OriginalPaintings from "@/pages/home/original-paintings/OriginalPaintings";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedWorks />
      <MeetArtist />
      <InstagramSection />
      <SmallPrint />
      <OriginalPaintings />
    </div>
  );
};

export default HomePage;
