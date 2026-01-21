import CommonBanner from "@/common/commonBanner/CommonBanner";
import BannerImage from "@/assets/images/common-banner.png";

const EventsPage = () => {
  return (
    <div>
      <CommonBanner backgroundImage={BannerImage} title="Events" />
      <section className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-4xl font-serif text-[#141414] mb-4">Coming Soon</h2>
        <p className="text-gray-500 font-lato">
          Our exhibition and event schedule is currently being finalized. Stay
          tuned!
        </p>
      </section>
    </div>
  );
};

export default EventsPage;
