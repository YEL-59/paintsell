import BannerImage from "@/assets/images/about-banner.png";
import CommonBanner from "@/common/commonBanner/CommonBanner";
import MeetArtist from "@/pages/home/artist/MeetArtist";
import TimelessArtwork from "@/pages/home/timeless-artwork/TimelessArtwork";
import Exhibitions from "@/pages/about/exhibitions/Exhibitions";

const AboutPage = () => {
  return (
    <div>
      <CommonBanner backgroundImage={BannerImage} title="Meet The Artist" />
      <MeetArtist
        title="About Angela"
        description="Angela is a professionally trained artist and a graduate of the Bezalel Academy of Arts and Design, Jerusalem in Israel. With a strong academic background in fine arts, she has transitioned from a dedicated student to a high-caliber professional whose work is recognized for its technical precision and emotional depth.
Known for her sophisticated style and mastery of [mention medium, e.g., Oil/Acrylic, Angela’s art is featured in private collections worldwide. Her journey from the rigorous art studios of Israel to the global stage reflects her commitment to excellence. Through her vibrant social media presence and professional mentorship, she has become an influential voice, inspiring both collectors and fellow artists with her modern approach to traditional techniques."
        button="INSTAGRAM"
      />
      <Exhibitions />
      <TimelessArtwork />
    </div>
  );
};

export default AboutPage;
