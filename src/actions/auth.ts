"use server";

import { prisma } from "@/lib/prisma";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET;

export async function loginWithCode(formData: FormData) {
  const code = formData.get("code") as string;

  if (!code) {
    return { error: "Please enter an access code." };
  }

  const validCode = await prisma.adminCode.findUnique({
    where: { code },
  });

  if (!validCode) {
    return { error: "Invalid access code." };
  }

  await prisma.adminCode.update({
    where: { id: validCode.id },
    data: { lastUsedAt: new Date() },
  });

  const secretKey = new TextEncoder().encode(JWT_SECRET);
  const token = await new SignJWT({ authenticated: true, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secretKey);

  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}