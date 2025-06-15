import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Star, Shield, Clock } from "lucide-react";
import { Link } from "wouter";
import type { Course } from "@shared/schema";

const CheckoutForm = ({ course }: { course: Course }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/course/${course.id}?success=true`,
      },
    });

    setProcessing(false);

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful! 🎉",
        description: "Welcome to your new course! You can start learning immediately.",
      });
      setLocation(`/course/${course.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#282828] p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-[#1DB954]" />
          Secure Payment
        </h3>
        <PaymentElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#9ca3af',
                },
              },
            },
          }}
        />
      </div>
      
      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold py-4 text-lg"
      >
        {processing ? (
          <div className="flex items-center">
            <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2" />
            Processing Payment...
          </div>
        ) : (
          `Complete Purchase - $${course.price}`
        )}
      </Button>

      <div className="text-center text-xs text-gray-400">
        <p>🔒 Your payment information is secure and encrypted</p>
        <p className="mt-1">30-day money-back guarantee • Cancel anytime</p>
      </div>
    </form>
  );
};

export default function CheckoutPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  const { data: course, isLoading: courseLoading } = useQuery<Course>({
    queryKey: [`/api/courses/${courseId}`],
  });

  const paymentIntentMutation = useMutation({
    mutationFn: ({ amount, courseId }: { amount: number; courseId: string }) =>
      apiRequest("POST", "/api/create-payment-intent", { amount, courseId }),
    onSuccess: async (response) => {
      const data = await response.json();
      setClientSecret(data.clientSecret);
    },
    onError: (error: any) => {
      toast({
        title: "Payment Setup Failed",
        description: error.message || "Unable to initialize payment. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (course) {
      paymentIntentMutation.mutate({
        amount: parseFloat(course.price),
        courseId: course.id.toString(),
      });
    }
  }, [course]);

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-600 rounded w-32 mb-8" />
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="h-6 bg-gray-600 rounded mb-4" />
                <div className="h-64 bg-gray-600 rounded" />
              </div>
              <div>
                <div className="h-6 bg-gray-600 rounded mb-4" />
                <div className="h-32 bg-gray-600 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!clientSecret && !paymentIntentMutation.isPending) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Payment Setup Failed</h1>
          <p className="text-gray-400 mb-4">Unable to initialize payment for this course.</p>
          <Link href={`/course/${course.id}`}>
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (paymentIntentMutation.isPending || !clientSecret) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#1DB954] border-t-transparent rounded-full mx-auto mb-4" />
          <p>Setting up your payment...</p>
        </div>
      </div>
    );
  }

  const appearance = {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#1DB954',
      colorBackground: '#282828',
      colorText: '#ffffff',
      colorDanger: '#df1b41',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/course/${course.id}`}>
            <Button variant="ghost" className="mb-4 hover:bg-[#282828]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
          <p className="text-gray-400">You're one step away from accessing premium financial education!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Course Summary */}
          <div>
            <Card className="bg-[#282828] border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="flex gap-4 mb-6">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {course.isPremium && (
                        <Badge className="bg-[#FFD700] text-black text-xs">PREMIUM</Badge>
                      )}
                      <Badge variant="outline" className="border-gray-500 text-xs">
                        {course.level}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-400">By {course.instructor}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-300">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{course.duration} of content</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Star className="w-4 h-4 mr-2 text-[#FFD700] fill-current" />
                    <span>{course.rating} rating ({course.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                </div>

                <Separator className="mb-4 bg-gray-600" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Course price:</span>
                    <span>${course.price}</span>
                  </div>
                  {course.originalPrice && (
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Original price:</span>
                      <span className="line-through">${course.originalPrice}</span>
                    </div>
                  )}
                  {course.originalPrice && (
                    <div className="flex justify-between text-sm text-[#1DB954]">
                      <span>You save:</span>
                      <span>
                        ${(parseFloat(course.originalPrice) - parseFloat(course.price)).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <Separator className="my-4 bg-gray-600" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-[#FFD700]">${course.price}</span>
                </div>

                <div className="mt-6 p-4 bg-[#1DB954]/10 rounded-lg border border-[#1DB954]/20">
                  <h4 className="font-semibold text-[#1DB954] mb-2">What's included:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Lifetime access to course content</li>
                    <li>• Mobile and desktop streaming</li>
                    <li>• Certificate of completion</li>
                    <li>• 30-day money-back guarantee</li>
                    <li>• Priority support access</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Elements 
              stripe={stripePromise} 
              options={{ 
                clientSecret,
                appearance 
              }}
            >
              <CheckoutForm course={course} />
            </Elements>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p className="mb-2">🔐 Your payment is processed securely by Stripe</p>
          <p>We never store your payment information on our servers</p>
        </div>
      </div>
    </div>
  );
}
