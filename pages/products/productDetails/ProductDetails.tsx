"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import PayImg1 from "@/assets/images/payment-system (1).png";
import PayImg2 from "@/assets/images/payment-system (2).png";
import PayImg3 from "@/assets/images/payment-system (3).png";
import PayImg4 from "@/assets/images/payment-system (4).png";
import PayImg5 from "@/assets/images/payment-system (5).png";
import PayImg6 from "@/assets/images/payment-system (6).png";
import { motion, AnimatePresence } from "framer-motion";
import WallBackgroundImg from "@/assets/images/wall-background.png";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import SubBanner from "@/common/subBanner/SubBanner";
import CommonBannerImg from "@/assets/images/common-banner.png";
import WorkCard from "@/components/mainLayout/WorkCard";
import { ShareSvg } from "@/components/svg/MainLayoutSvg";
import { IProductDetails } from "@/app/(MainLayout)/products/[id]/page";
import { IProduct } from "@/types";
import { addToCart } from "@/services/cart";
import { toast } from "sonner";

const ProductDetails = ({
  product,
  youMayAlsoLike,
}: {
  product: IProductDetails;
  youMayAlsoLike: IProduct[];
}) => {
  const router = useRouter();

  if (!product) return null;

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [quantity, setQuantity] = useState(1);

  const [selectedType, setSelectedType] = useState<"Framed" | "Unframed">(
    "Unframed",
  );
  const [activeTab, setActiveTab] = useState<string | null>("description");
  const [mainImage, setMainImage] = useState(product.images![0]);

  const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const parseDescription = (html: string) => {
    const parts = {
      mainDescription: "",
      details: [] as { title: string; content: string }[],
    };

    if (!html) return parts;

    // Helper to remove literal \n strings and actual newline characters
    const clean = (str: string) => str.replace(/\\n/g, "").replace(/\n/g, "").trim();

    const h2StartMatch = html.match(/<h2/i);
    if (h2StartMatch && typeof h2StartMatch.index === "number") {
      parts.mainDescription = clean(html.substring(0, h2StartMatch.index));
      const pairsContent = html.substring(h2StartMatch.index);

      const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2|$)/gi;
      let match;
      while ((match = h2Regex.exec(pairsContent)) !== null) {
        parts.details.push({
          title: clean(match[1]),
          content: clean(match[2]),
        });
      }
    } else {
      parts.mainDescription = clean(html);
    }

    return parts;
  };

  const { mainDescription, details } = parseDescription(product.description);

  // Autoplay system for main gallery
  useEffect(() => {
    if (!product.images || product.images.length === 0) return;

    const interval = setInterval(() => {
      setMainImage((current) => {
        const currentIndex = product.images!.indexOf(current);
        const nextIndex = (currentIndex + 1) % product.images!.length;
        return product.images![nextIndex];
      });
    }, 5000);
  }, [product.images]);

  useEffect(() => {
    if (product.framed_price && !product.unframed_price) {
      setSelectedType("Framed");
    } else if (!product.framed_price && product.unframed_price) {
      setSelectedType("Unframed");
    }
  }, [product]);

  console.log(selectedType);

  const handleAddToCart = async (quantity: number) => {
    try {
      const type = selectedType === "Unframed" ? 2 : 1;
      console.log("selectedType ==>", selectedType);
      const res = await addToCart({
        product_id: product.id,
        type: type,
        quantity: quantity,
      });
      console.log(res);

      if (res?.success) {
        toast.success(res?.message || "Product added to bag successfully!");
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        toast.error(res?.message || "Something went wrong while adding to bag");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <main className="bg-white">
      {/* Sub Banner */}
      <SubBanner
        backgroundImage={CommonBannerImg}
        rootPath="/products"
        rootLabel="All Product"
        currentPage="Product Details"
      />

      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Image Gallery */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square overflow-hidden bg-gray-50 rounded-sm"
            >
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700"
                priority
              />
            </motion.div>

            {/* Overview Section jh*/}
            <div className="space-y-6 mt-24">
              <h3 className="text-2xl lg:text-[32px] text-[#1D1E21] font-semibold">
                Overview &
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {product.images?.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(thumb)}
                    className={`relative aspect-square cursor-pointer h-[150px] w-full overflow-hidden rounded-sm border transition-all ${
                      mainImage === thumb
                        ? "border-[#0C2E46]"
                        : "border-gray-100 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={thumb}
                      alt={`Thumbnail ${idx}`}
                      fill
                      className="object-cover w-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col">
            <div className="space-y-6 mb-10">
              <h1 className="text-2xl md:text-3xl lg:text-[42px] font-serif text-[#141414] tracking-tight leading-[1.1]">
                {product.name}
              </h1>
              <div className="flex gap-4 items-center">
                <p className="text-lg lg:text-xl font-lato font-bold">
                  <span className="font-medium text-gray-500">
                    {selectedType} Price:
                  </span>{" "}
                  $
                  {parseFloat(
                    selectedType === "Framed"
                      ? product.framed_price || "0"
                      : product.unframed_price || "0",
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Options Selection */}
            <div className="space-y-8">
              {/* Frame Selection */}
              <div className="space-y-3">
                <p className="font-lato text-base lg:text-lg font-medium uppercase tracking-widest text-[#686868]">
                  Select Option
                </p>
                <div className="flex gap-4">
                  {product.unframed_price && (
                    <button
                      onClick={() => setSelectedType("Unframed")}
                      className={`px-6 py-3 border rounded-sm transition-all font-lato font-medium ${
                        selectedType === "Unframed"
                          ? "border-[#0C2E46] bg-[#0C2E46] text-white"
                          : "border-gray-200 text-[#141414] hover:border-[#0C2E46]"
                      }`}
                    >
                      Unframed
                    </button>
                  )}
                  {product.framed_price && (
                    <button
                      onClick={() => setSelectedType("Framed")}
                      className={`px-6 py-3 border rounded-sm transition-all font-lato font-medium ${
                        selectedType === "Framed"
                          ? "border-[#0C2E46] bg-[#0C2E46] text-white"
                          : "border-gray-200 text-[#141414] hover:border-[#0C2E46]"
                      }`}
                    >
                      Framed
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-lato text-base lg:text-lg font-medium uppercase tracking-widest text-[#686868]">
                  Availability
                </p>
                <p
                  className={`font-lato text-base lg:text-lg font-medium ${
                    product.stock_quantity > 0
                      ? "text-[#10B981]"
                      : "text-[#EF4444]"
                  }`}
                >
                  {product.stock_quantity > 0
                    ? "In stock, and ready to ship"
                    : "Out of stock"}
                </p>
              </div>

              <div className="space-y-3">
                <p className="font-lato text-base lg:text-lg font-medium uppercase tracking-widest text-[#686868]">
                  Quantity
                </p>
                <div className="flex w-36 items-center rounded-sm border border-gray-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-14 w-12 items-center justify-center text-[#141414] hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex-1 text-center font-lato text-lg font-bold text-[#141414]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-14 w-12 items-center justify-center text-[#141414] hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Checkout Actions */}
            <div className="mt-12 space-y-8">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-base lg:text-lg text-[#686868] font-lato uppercase tracking-[0.25em]">
                    Secured and trusted checkout with:
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 items-center justify-center">
                  <Image
                    src={PayImg1}
                    alt="Pay System"
                    width={65}
                    height={40}
                    className="object-contain"
                  />
                  <Image
                    src={PayImg2}
                    alt="Pay System"
                    width={65}
                    height={40}
                    className="object-contain"
                  />
                  <Image
                    src={PayImg3}
                    alt="Pay System"
                    width={65}
                    height={40}
                    className="object-contain"
                  />
                  <Image
                    src={PayImg4}
                    alt="Pay System"
                    width={65}
                    height={40}
                    className="object-contain"
                  />
                  <Image
                    src={PayImg5}
                    alt="Pay System"
                    width={65}
                    height={40}
                    className="object-contain"
                  />
                  <Image
                    src={PayImg6}
                    alt="Pay System"
                    width={65}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>

              {product?.stock_quantity > 0 ? (
                <div className="flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={() => handleAddToCart(quantity)}
                    className="flex-1 border border-[#0C2E46] py-4 font-lato text-sm md:text-base font-bold tracking-[0.2em] text-[#0C2E46] transition-all hover:bg-gray-50 active:scale-95 uppercase cursor-pointer"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => router.push("/checkout")}
                    className={`flex-1 py-4 font-lato text-sm md:text-base font-bold tracking-[0.2em] text-white transition-all active:scale-95 uppercase cursor-pointer bg-[#0C2E46] hover:bg-[#081F30]`}
                  >
                    Buy Now
                  </button>
                  <button className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 transition-all hover:bg-gray-50 active:scale-90 cursor-pointer">
                    <ShareSvg />
                  </button>
                </div>
              ) : (
                <button
                  className={`flex-1 py-4 font-lato w-full disabled:cursor-not-allowed d text-sm md:text-base font-bold tracking-[0.2em] text-white uppercase bg-[#14212D] opacity-100`}
                >
                  Sold Out
                </button>
              )}
            </div>

            {/* Decorated View Section */}
            <div className="mt-16 space-y-6">
              <h3 className="text-2xl lg:text-[32px] text-[#1D1E21] font-semibold">
                Decorated View
              </h3>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={2}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                className="w-full"
              >
                {/* We use two slides to match the 2-column look, but Swiper allows it to be an 'autoplay system' */}
                {[0, 1].map((idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-[#F5F5F5] group">
                      {/* Wall Background */}
                      <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
                        <Image
                          src={WallBackgroundImg}
                          alt={`Wall Background`}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Dynamic Artwork Overlay (Conceptual Frame) */}
                      <div className="absolute top-[19%] left-[23%] w-[52%] h-[62%] flex items-center justify-center border-4 md:border-10 border-[#e5e5e3] rounded-[1px] shadow-2xl">
                        <div className="relative w-full h-full">
                          <Image
                            src={mainImage}
                            alt="Decorated View Artwork"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Subtle Overlay to blend the artwork into the wall lighting */}
                      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Accordion Sections: Description */}
        <div className="mt-24 border-t border-gray-100">
          <div className="py-8">
            <button
              onClick={() => toggleTab("description")}
              className="flex w-full items-center justify-between py-4"
            >
              <h3 className="text-2xl lg:text-[32px] font-semibold font-lato text-[#141414]">
                Description
              </h3>
              {activeTab === "description" ? (
                <Minus className="h-10 w-10 cursor-pointer hover:bg-[#0c2e46] hover:text-white rounded-full p-2" />
              ) : (
                <Plus className="h-10 w-10 cursor-pointer hover:bg-[#0c2e46] hover:text-white rounded-full p-2" />
              )}
            </button>
            <AnimatePresence>
              {activeTab === "description" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-8 pb-8 pt-4 font-lato text-base leading-relaxed text-[#686868]">
                    <div
                      className="description-content"
                      dangerouslySetInnerHTML={{ __html: mainDescription }}
                    />

                    <ul className="space-y-3">
                      {details.map((detail, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="font-semibold whitespace-nowrap">
                            • {detail.title}
                          </span>
                          <div
                            className="detail-content"
                            dangerouslySetInnerHTML={{ __html: detail.content }}
                          />
                        </li>
                      ))}
                    </ul>

                    {/* <div className="space-y-4 pt-4">
                      <h4 className="text-lg lg:text-2xl font-semibold text-[#141414]">
                        Framed Option
                      </h4>
                      <ul className="space-y-3 text-[#686868]">
                        <li className="flex gap-2">
                          <span className="font-semibold">• Availability:</span>
                          <span>
                            Making It A Perfect Centerpiece For Any Modern
                            Interior.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-semibold">• Frame:</span>
                          <span>
                            Giclée Print On Premium 100% Cotton Fine Art Paper,
                            Cold Press, Natural Texture, 340 Gsm, Acid-Free.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-semibold">• Dimensions:</span>
                          <span>
                            Printed Locally In Toronto, Ontario, And
                            Individually Signed And Numbered By The Artist.
                          </span>
                          <div
                            className="detail-content"
                            dangerouslySetInnerHTML={{ __html: detail.content }}
                          />
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* "You May Also Like" Section */}
        <div className="mt-30 space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl md:text-5xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-serif text-[#141414] tracking-tight">
              You May Also Like
            </h2>
            <div className="flex gap-3">
              <button
                ref={prevRef}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:bg-[#0C2E46] hover:text-white cursor-pointer select-none disabled:opacity-30"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                ref={nextRef}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0C2E46] text-white transition-all hover:bg-[#081F30] cursor-pointer select-none disabled:opacity-30"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={(swiper) => {
              // @ts-ignore
              swiper.navigation.init();
              // @ts-ignore
              swiper.navigation.update();
            }}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full"
          >
            {youMayAlsoLike?.map((p, idx) => (
              <SwiperSlide key={p.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <WorkCard work={p} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
