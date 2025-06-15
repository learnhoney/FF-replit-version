import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (email: string) => apiRequest("POST", "/api/newsletter", { email }),
    onSuccess: () => {
      toast({
        title: "Welcome to the Financial Frequency! 🎵💰",
        description: "Thanks for subscribing! Check your email for confirmation.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      mutation.mutate(email);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#1DB954] via-[#FFD700] to-[#FF6B35] p-10 rounded-2xl text-center text-black relative overflow-hidden">
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex justify-center mb-4">
          <div className="bg-black/20 p-3 rounded-full">
            <span className="text-3xl">🎧</span>
          </div>
        </div>
        <h3 className="text-3xl font-black mb-4">Tune Into Financial Freedom</h3>
        <p className="mb-8 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Subscribe to our exclusive financial frequency. Get market beats, investment insights, 
          and wealth-building strategies delivered directly to your playlist.
        </p>
        <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-r-none text-black focus:ring-2 focus:ring-[#FFD700]"
            required
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="bg-black text-white hover:bg-gray-800 font-medium rounded-l-none px-8"
          >
            {mutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}
