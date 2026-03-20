"use client";

import { useState } from "react";
import { UploadButton } from "@/components/ui/uploadthing";
import { addVideoItem, deleteVideoItem } from "@/actions/media";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Video, Image as ImageIcon, CheckCircle2 } from "lucide-react";

type VideoItem = {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
};

export function VideoManager({ initialVideos }: { initialVideos: VideoItem[] }) {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleSave = async () => {
    if (!title || !thumbnailUrl || !videoUrl) return alert("Please fill all fields");
    
    setIsSaving(true);
    await addVideoItem(title, thumbnailUrl, videoUrl);
    
    setTitle("");
    setThumbnailUrl("");
    setVideoUrl("");
    setIsSaving(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    await deleteVideoItem(id);
    setIsDeleting(null);
    router.refresh();
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      <div className="bg-[#0B0B0F] border border-white/10 p-6 space-y-6">
        <div>
          <h3 className="text-white font-medium uppercase tracking-widest text-sm mb-4">Add New Video</h3>
          <Input 
            placeholder="e.g., February Encounter Recap" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white/5 border-white/10 text-white h-12 rounded-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-white/5 bg-black/20 p-4 flex flex-col items-center justify-center text-center space-y-3">
            {thumbnailUrl ? (
              <CheckCircle2 className="w-8 h-8 text-[#E5C158]" />
            ) : (
              <ImageIcon className="w-8 h-8 text-white/20" />
            )}
            <p className="text-xs text-white/50 uppercase tracking-widest">
              {thumbnailUrl ? "Thumbnail Uploaded" : "1. Upload Cover Image"}
            </p>
            {!thumbnailUrl && (
              <UploadButton
                endpoint="videoThumbnailUploader"
                onClientUploadComplete={(res) => setThumbnailUrl(res[0].url)}
                className="ut-button:bg-white/10 ut-button:text-white ut-button:rounded-none ut-button:h-8 ut-button:text-xs"
              />
            )}
          </div>

          <div className="border border-white/5 bg-black/20 p-4 flex flex-col items-center justify-center text-center space-y-3">
            {videoUrl ? (
              <CheckCircle2 className="w-8 h-8 text-[#E5C158]" />
            ) : (
              <Video className="w-8 h-8 text-white/20" />
            )}
            <p className="text-xs text-white/50 uppercase tracking-widest">
              {videoUrl ? "Video File Uploaded" : "2. Upload MP4 File"}
            </p>
            {!videoUrl && (
              <UploadButton
                endpoint="vaultVideoUploader"
                onClientUploadComplete={(res) => setVideoUrl(res[0].url)}
                className="ut-button:bg-white/10 ut-button:text-white ut-button:rounded-none ut-button:h-8 ut-button:text-xs"
              />
            )}
          </div>
        </div>

        <Button 
          onClick={handleSave}
          disabled={!title || !thumbnailUrl || !videoUrl || isSaving}
          className="w-full h-12 bg-[#E5C158] hover:bg-[#c9a642] text-[#0B0B0F] rounded-none uppercase tracking-widest font-bold transition-all disabled:opacity-50"
        >
          {isSaving ? "Saving to Vault..." : "Save Video to Vault"}
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">
          Current Vault Entries
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {initialVideos.map((video) => (
            <div key={video.id} className="relative group aspect-video bg-white/5 border border-white/10 overflow-hidden">
              <Image 
                src={video.thumbnailUrl} 
                alt={video.title} 
                fill 
                className="object-cover opacity-50 group-hover:opacity-30 transition-opacity" 
              />
              
              <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-[#0B0B0F] to-transparent">
                <p className="text-white font-medium text-sm truncate">{video.title}</p>
              </div>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(video.id)}
                  disabled={isDeleting === video.id}
                  className="rounded-none bg-red-500/80 hover:bg-red-500 text-white h-8 w-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {initialVideos.length === 0 && (
            <div className="col-span-full py-12 text-center text-white/40 border border-dashed border-white/10 text-sm uppercase tracking-widest">
              No videos in the vault yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}