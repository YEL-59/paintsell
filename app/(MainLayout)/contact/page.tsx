import BannerImage from "@/assets/images/contact-banner.png";
import CommonBanner from "@/common/commonBanner/CommonBanner";
import GetInTouch from "@/pages/contact/getInTouch/GetInTouch";

const ContactPage = () => {
  return (
    <div>
      <CommonBanner backgroundImage={BannerImage} title="Contact" />
      <GetInTouch />
    </div>
  );
};

export default ContactPage;
