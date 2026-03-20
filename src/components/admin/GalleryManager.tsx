"use client";

import { useState } from "react";
import { UploadDropzone } from "@/components/ui/uploadthing";
import { addGalleryImages, deleteGalleryImage } from "@/actions/media";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type GalleryImage = {
  id: string;
  url: string;
  alt: string;
};

export function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    await deleteGalleryImage(id);
    setIsDeleting(null);
    router.refresh();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="border border-white/10 bg-[#0B0B0F] p-4">
        <UploadDropzone
          endpoint="galleryImageUploader"
          onClientUploadComplete={async (res) => {
            if (res && res.length > 0) {
              const urls = res.map((file) => file.url);
              await addGalleryImages(urls);
              router.refresh();
            }
          }}
          onUploadError={(error: Error) => {
            alert(`Upload Failed: ${error.message}`);
          }}
          className="ut-button:bg-[#E5C158] ut-button:text-[#0B0B0F] ut-button:font-bold ut-button:rounded-none ut-label:text-[#E5C158] border-white/10 hover:border-[#E5C158]/50 transition-colors bg-white/5"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {initialImages.map((img) => (
          <div key={img.id} className="relative group aspect-square bg-white/5 border border-white/10 overflow-hidden">
            <Image 
              src={img.url} 
              alt={img.alt} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(img.id)}
                disabled={isDeleting === img.id}
                className="rounded-none bg-red-500/80 hover:bg-red-500 text-white"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {initialImages.length === 0 && (
          <div className="col-span-full py-12 text-center text-white/40 border border-dashed border-white/10 text-sm uppercase tracking-widest">
            Vault is empty. Upload an image above.
          </div>
        )}
      </div>

    </div>
  );
}