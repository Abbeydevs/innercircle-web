import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {

  galleryImageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 20 } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Gallery image uploaded:", file.url);
      return { uploadedBy: "admin", url: file.url };
    }),

  videoThumbnailUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      return { uploadedBy: "admin", url: file.url };
    }),

  vaultVideoUploader: f({ video: { maxFileSize: "256MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      return { uploadedBy: "admin", url: file.url };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;