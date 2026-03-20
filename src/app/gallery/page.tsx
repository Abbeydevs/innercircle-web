import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getGalleryImages } from "@/actions/media";
import { FullGallery } from "@/components/sections/FullGallery";

export default async function GalleryPage() {
  const rawGalleryImages = await getGalleryImages();

  const images = rawGalleryImages.map((img: { id: string; url: string; alt: string }) => ({
    id: img.id,
    url: img.url,
    alt: img.alt,
  }));

  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-hidden bg-[#07070A]">
      <Navbar />
      
      <FullGallery images={images} />
      
      <Footer />
    </main>
  );
}