import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGalleryImages, getVideoItems } from "@/actions/media";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { VideoManager } from "@/components/admin/VideoManager";

export default async function AdminDashboard() {
  const galleryImages = await getGalleryImages();
  const videoItems = await getVideoItems();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div>
        <h1 className="text-3xl font-bold uppercase tracking-wider text-white">
          Media Manager
        </h1>
        <p className="text-white/50 mt-2 text-sm">
          Upload and organize content for the landing page. Changes reflect instantly.
        </p>
      </div>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 rounded-none h-12 w-full justify-start overflow-x-auto">
          <TabsTrigger 
            value="gallery" 
            className="rounded-none data-[state=active]:bg-[#E5C158] data-[state=active]:text-[#0B0B0F] text-white/50 uppercase tracking-widest text-xs h-full px-8 transition-all"
          >
            Image Gallery
          </TabsTrigger>
          <TabsTrigger 
            value="vault" 
            className="rounded-none data-[state=active]:bg-[#E5C158] data-[state=active]:text-[#0B0B0F] text-white/50 uppercase tracking-widest text-xs h-full px-8 transition-all"
          >
            Video Vault
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="mt-6 border border-white/10 bg-white/5 p-6 min-h-[400px]">
          <GalleryManager initialImages={galleryImages} />
        </TabsContent>

        <TabsContent value="vault" className="mt-6 border border-white/10 bg-white/5 p-6 min-h-[400px]">
          <VideoManager initialVideos={videoItems} />
        </TabsContent>

      </Tabs>

    </div>
  );
}