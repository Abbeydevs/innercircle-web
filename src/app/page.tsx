import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Founder } from "@/components/sections/Founder";
import { Gallery, GalleryImage } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { VideoItem, VideoVault } from "@/components/sections/VideoVault";
import { Vision } from "@/components/sections/Vision";

const placeholderImages: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
    alt: "Worship gathering crowd",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1501281668745-f7f57922c3b1?q=80&w=2070&auto=format&fit=crop",
    alt: "Stage lights",
    className: "col-span-1 row-span-1",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop",
    alt: "Band playing",
    className: "col-span-1 row-span-1",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1525926477800-7a3b10316ac6?q=80&w=2070&auto=format&fit=crop",
    alt: "Hands raised",
    className: "md:col-span-2 row-span-1", 
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1533174000255-598d415e6129?q=80&w=2061&auto=format&fit=crop",
    alt: "Dark silhouette",
    className: "col-span-1 md:col-span-2 row-span-1", 
  },
];

const placeholderVideos: VideoItem[] = [
  { id: "v1", title: "February Recap", thumbnailUrl: "https://images.unsplash.com/photo-1501281668745-f7f57922c3b1?q=80&w=2070&auto=format&fit=crop", videoUrl: "#" },
  { id: "v2", title: "Worship Medley", thumbnailUrl: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop", videoUrl: "#" },
  { id: "v3", title: "The Word", thumbnailUrl: "https://images.unsplash.com/photo-1525926477800-7a3b10316ac6?q=80&w=2070&auto=format&fit=crop", videoUrl: "#" },
];

export default function Home() {
  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Vision />
      <Gallery images={placeholderImages} />
      <VideoVault videos={placeholderVideos} />
      <Founder />
      <Footer />
    </main>
  );
}