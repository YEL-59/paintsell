export interface IOriginalWorkProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  date: string;
  description: string;
  stockStatus: "In Stock" | "Out of Stock";
  thumbnails: string[];
}

const commonThumbnails = [
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2090&auto=format&fit=crop",
  "https://img.freepik.com/premium-photo/drawing-plant-with-sun-it_1320300-7204.jpg?uid=R191150260&ga=GA1.1.766574978.1765429508&semt=ais_hybrid&w=740&q=85",
  "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2038&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2070&auto=format&fit=crop",
];


export const artOriginalWorkProducts: IOriginalWorkProduct[] = [
  {
    id: 1,
    title: "Verdant Whispers",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2070&auto=format&fit=crop",
    date: "2024-01-01",
    description: "A hand-painted masterpiece bringing character and depth to your art collection.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 2,
    title: "Azure Serenity",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2090&auto=format&fit=crop",
    date: "2023-12-15",
    description: "Hand-painted Azure Serenity offers a gateway to calm and peace through art.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 3,
    title: "Golden Echoes",
    price: 3200,
    image:
      "https://img.freepik.com/premium-photo/drawing-plant-with-sun-it_1320300-7204.jpg?uid=R191150260&ga=GA1.1.766574978.1765429508&semt=ais_hybrid&w=740&q=85",
    date: "2024-01-10",
    description: "The original Golden Echoes painting with real texture and layer depth.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 4,
    title: "Crimson Dreams",
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2038&auto=format&fit=crop",
    date: "2023-11-20",
    description: "Passionate strokes of red and crimson in this one-of-a-kind original work.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 5,
    title: "Midnight Bloom",
    price: 2700,
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2070&auto=format&fit=crop",
    date: "2024-01-05",
    description: "Abstract floral original painting, hand-signed and dated by the artist.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 6,
    title: "Rustic Radiance",
    price: 1500,
    image:
      "https://i.etsystatic.com/15649312/c/1904/1904/47/0/il/7c6aad/5255873664/il_800x800.5255873664_h55w.jpg",
    date: "2023-10-15",
    description: "Bring the rustic charm of professional oil painting into your home.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 7,
    title: "Verdant Whispers",
    price: 2400,
    image:
      "https://img.freepik.com/premium-photo/drawing-plant-with-sun-it_1320300-7204.jpg?uid=R191150260&ga=GA1.1.766574978.1765429508&semt=ais_hybrid&w=740&q=85",
    date: "2022-02-15",
    description: "Original botanical painting with intricate details and layered glazes.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 8,
    title: "Verdant Whispers",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1976&auto=format&fit=crop",
    date: "2022-12-15",
    description: "A small but powerful original painting from the series.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 9,
    title: "Verdant Whispers",
    price: 2600,
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2038&auto=format&fit=crop",
    date: "2024-12-15",
    description: "Original large work on canvas, featuring the iconic botanical motifs.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 10,
    title: "Celestial Voyage",
    price: 3100,
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop",
    date: "2023-12-15",
    description: "An ethereal original voyage into the cosmos, painted with mixed media.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 11,
    title: "Oceanic Rhythm",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop",
    date: "2023-11-10",
    description: "Hand-painted oceanic rhythm captures the perpetual motion of the sea.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 12,
    title: "Ethereal Glow",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop",
    date: "2023-12-15",
    description: "A luminous original painting that glows with soft, interior light.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 13,
    title: "Lunar Reflection",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1974&auto=format&fit=crop",
    date: "2024-01-20",
    description: "Dramatic lunar landscape painted by hand on high-quality canvas.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 14,
    title: "Solar Flare",
    price: 2900,
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
    date: "2023-09-05",
    description: "Original large painting of solar phenomena, full of energy and heat.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 15,
    title: "Velvet Dreams",
    price: 2200,
    image:
      "https://img.freepik.com/premium-photo/drawing-plant-with-sun-it_1320300-7204.jpg?uid=R191150260&ga=GA1.1.766574978.1765429508&semt=ais_hybrid&w=740&q=85",
    date: "2024-02-14",
    description: "Dreamy original with physical texture you can only find in original work.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 16,
    title: "Mountain Echoes",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    date: "2023-05-30",
    description: "Mountain peaks rendered with professional palette knife techniques.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 17,
    title: "Sapphire Mist",
    price: 1950,
    image:
      "https://img.freepik.com/premium-photo/drawing-plant-with-sun-it_1320300-7204.jpg?uid=R191150260&ga=GA1.1.766574978.1765429508&semt=ais_hybrid&w=740&q=85",
    date: "2023-08-11",
    description: "Small original atmospheric painting, sapphire blue and silhouetted forms.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 18,
    title: "Amber Horizon",
    price: 2650,
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
    date: "2023-10-25",
    description: "Original sunset landscape, painted in professional acrylics on board.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 19,
    title: "Frosty Silence",
    price: 1400,
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    date: "2023-12-01",
    description: "A chillingly beautiful original winter scene, signed by the artist.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 20,
    title: "Emerald Grove",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop",
    date: "2024-03-01",
    description: "A vibrant original exploration of color and light in a deep forest.",
    stockStatus: "Out of Stock",
    thumbnails: commonThumbnails,
    quantity: 0,
  },
  {
    id: 21,
    title: "Tangled Twilight",
    price: 2750,
    image:
      "https://citydecor.by/image/catalog/webp/catalog/fotooboi/blossom11-3.webp",
    date: "2024-01-15",
    description: "An intricate original abstract work with complex layering and depth.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
  {
    id: 22,
    title: "Gilded Petals",
    price: 2100,
    image:
      "https://i.etsystatic.com/15649312/c/1904/1904/47/0/il/7c6aad/5255873664/il_800x800.5255873664_h55w.jpg",
    date: "2023-11-30",
    description: "Original work on canvas with mixed media and gold leaf accents.",
    stockStatus: "In Stock",
    thumbnails: commonThumbnails,
    quantity: 1,
  },
];
