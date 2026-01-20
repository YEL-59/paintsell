import Banner from "@/pages/home/banner/Banner";
import FeaturedWorks from "@/pages/home/featured-works/FeaturedWorks";
import MeetArtist from "@/pages/home/artist/MeetArtist";
import InstagramSection from "@/pages/home/instagram/InstagramSection";
import SmallPrint from "@/pages/home/small-print/SmallPrint";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedWorks />
      <MeetArtist />
      <InstagramSection />
      <SmallPrint />
    </div>
  );
};

export default HomePage;
