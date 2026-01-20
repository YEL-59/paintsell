import Banner from "@/pages/home/banner/Banner";
import FeaturedWorks from "@/pages/home/featured-works/FeaturedWorks";
import MeetArtist from "@/pages/home/artist/MeetArtist";
import InstagramSection from "@/pages/home/instagram/InstagramSection";
import SmallPrint from "@/pages/home/small-print/SmallPrint";
import OriginalPaintings from "@/pages/home/original-paintings/OriginalPaintings";
import TimelessArtwork from "@/pages/home/timeless-artwork/TimelessArtwork";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedWorks />
      <MeetArtist />
      <InstagramSection />
      <SmallPrint />
      <OriginalPaintings />
      <TimelessArtwork />
    </div>
  );
};

export default HomePage;
