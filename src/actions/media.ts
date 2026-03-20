"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function getGalleryImages() {
  try {
    return await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return [];
  }
}

export async function addGalleryImages(urls: string[]) {
  try {
    const imageData = urls.map((url) => ({
      url,
      alt: "Inner Circle Experience",
    }));

    await prisma.galleryImage.createMany({
      data: imageData,
    });
    
    revalidatePath("/");
    revalidatePath("/admin"); 
    
    return { success: true };
  } catch (error) {
    console.error("Failed to add images to database:", error);
    return { success: false, error: "Database error" };
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    await prisma.galleryImage.delete({
      where: { id },
    });
    
    revalidatePath("/");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete image:", error);
    return { success: false, error: "Database error" };
  }
}

export async function getVideoItems() {
  try {
    return await prisma.videoItem.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return [];
  }
}

export async function addVideoItem(title: string, thumbnailUrl: string, videoUrl: string) {
  try {
    await prisma.videoItem.create({
      data: { title, thumbnailUrl, videoUrl },
    });
    
    revalidatePath("/");
    revalidatePath("/admin"); 
    
    return { success: true };
  } catch (error) {
    console.error("Failed to add video to database:", error);
    return { success: false, error: "Database error" };
  }
}

export async function deleteVideoItem(id: string) {
  try {
    await prisma.videoItem.delete({
      where: { id },
    });
    
    revalidatePath("/");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete video:", error);
    return { success: false, error: "Database error" };
  }
}