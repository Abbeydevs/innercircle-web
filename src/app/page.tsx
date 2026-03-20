import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Vision } from "@/components/sections/Vision";
import { Gallery } from "@/components/sections/Gallery";
import { VideoVault } from "@/components/sections/VideoVault";
import { Founder } from "@/components/sections/Founder";
import { Footer } from "@/components/layout/Footer";

import { getGalleryImages, getVideoItems } from "@/actions/media";

export default async function Home() {
  const rawGalleryImages = await getGalleryImages();
  const videoItems = await getVideoItems();

  const allGalleryImages = rawGalleryImages.map((img) => ({
    id: img.id,
    url: img.url,
    alt: img.alt,
    className: undefined, 
  }));

  const homepageImages = allGalleryImages.slice(0, 12);

  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-hidden bg-[#0B0B0F]">
      <Navbar />
      <Hero />
      <Vision />
      
      <Gallery images={homepageImages} />

      <div className="w-full bg-[#07070A] pb-24 flex justify-center">
        <a 
          href="/gallery" 
          className="px-8 py-4 border border-[#E5C158]/30 text-[#E5C158] uppercase tracking-widest text-sm font-bold hover:bg-[#E5C158] hover:text-[#07070A] transition-all duration-500"
        >
          View Full Archive
        </a>
      </div>
      
      <VideoVault videos={videoItems} />
      
      <Founder />
      <Footer />
    </main>
  );
}