import { logoutAdmin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "@uploadthing/react/styles.css";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0B0F] flex flex-col selection:bg-[#E5C158]/30">
      <header className="top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="relative h-6 w-24 opacity-50 hover:opacity-100 transition-opacity">
            <Image 
              src="/innercircle-logo.png" 
              alt="Inner Circle" 
              fill
              className="object-contain object-left"
            />
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-[#E5C158] text-xs font-bold uppercase tracking-widest">
            Control Center
          </span>
        </div>

        <form action={logoutAdmin}>
          <Button 
            type="submit" 
            variant="ghost" 
            className="text-white/50 hover:text-white hover:bg-white/5 rounded-none text-xs uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Lock Vault
          </Button>
        </form>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}