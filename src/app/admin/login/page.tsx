"use client";

import { useState, useTransition } from "react";
import { loginWithCode } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await loginWithCode(formData);
      
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0B0F] px-4 selection:bg-[#E5C158]/30">
      <div className="w-full max-w-md space-y-8 p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
        
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-[#E5C158]" />
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white">
            Admin Access
          </h1>
          <p className="text-white/50 text-sm">
            Enter your secure passcode to continue.
          </p>
        </div>

        <form action={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              name="code"
              placeholder="Enter passcode..."
              required
              className="bg-black/50 border-white/10 text-white text-center tracking-widest h-14 rounded-none focus-visible:ring-[#E5C158]/50"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center font-medium animate-in fade-in slide-in-from-top-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-14 bg-[#E5C158] hover:bg-[#c9a642] text-[#0B0B0F] rounded-none uppercase tracking-widest font-bold transition-all"
          >
            {isPending ? "Verifying..." : "Enter Vault"}
          </Button>
        </form>
        
      </div>
    </main>
  );
}