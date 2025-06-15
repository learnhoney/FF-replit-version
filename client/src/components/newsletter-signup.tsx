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
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-lg text-center">
      <h3 className="text-2xl font-bold mb-4">Join the Financial Frequency</h3>
      <p className="mb-6 text-purple-100">
        Get weekly market insights, exclusive content, and early access to new courses delivered to your inbox.
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
          className="bg-[#FFD700] text-black hover:bg-yellow-400 font-medium rounded-l-none px-8"
        >
          {mutation.isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </section>
  );
}
