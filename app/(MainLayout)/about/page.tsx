"use client";

import { useAboutUs } from "@/services/hooks";
import CommonBanner from "@/common/commonBanner/CommonBanner";
import MeetArtist from "@/pages/home/artist/MeetArtist";
import TimelessArtwork from "@/pages/home/timeless-artwork/TimelessArtwork";
import Exhibitions from "@/pages/about/exhibitions/Exhibitions";

const AboutPage = () => {
  const { data, loading, error } = useAboutUs();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0C2E46] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600">{error || "Failed to load about us data"}</p>
        </div>
      </div>
    );
  }

  const aboutSection = data.about_section[0];
  const exhibition = data.exhibitions[0];

  return (
    <div>
      <CommonBanner 
        backgroundImage={data.hero_banner.image} 
        title={data.hero_banner.title} 
      />
      <MeetArtist
        title={aboutSection.name}
        description={aboutSection.description}
        button="INSTAGRAM"
        image={aboutSection.image}
      />
      <Exhibitions 
        image={exhibition.image}
        titles={exhibition.titles}
      />
      <TimelessArtwork />
    </div>
  );
};

export default AboutPage;
