"use client";

import { motion } from "framer-motion";
import {
  Gift,
  Mail,
  Brain,
  Star,
  Cloud,
  Sparkles,
  Calendar,
  Bell,
  Cake,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function LandingPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();
  if (isSignedIn) {
    router.replace("/dashboard");
  }
  const features = [
    {
      icon: Mail,
      title: "Smart Email Reminders",
      description:
        "Receive timely, personalized email reminders for upcoming birthdays. Our intelligent system ensures you never miss a special day.",
    },
    {
      icon: Brain,
      title: "AI-Powered Wish Generator",
      description:
        "Leverage cutting-edge AI to create heartfelt, personalized birthday wishes. Say goodbye to generic messages and writer's block.",
    },
    {
      icon: Cloud,
      title: "Secure Cloud Storage",
      description:
        "Store all your birthday data securely in the cloud. Access your information from any device, anytime, anywhere.",
    },
    {
      icon: Sparkles,
      title: "Custom Celebration Websites",
      description:
        "Generate beautiful, interactive birthday websites for your loved ones. Share memories, photos, and wishes in a unique online space.",
    },
    {
      icon: Calendar,
      title: "Calendar Integration",
      description:
        "Seamlessly sync birthday reminders with your favorite calendar apps. Stay organized across all your devices.",
    },
    {
      icon: Bell,
      title: "Multi-platform Notifications",
      description:
        "Get birthday alerts on your preferred platforms - email, SMS, or push notifications. Never miss a celebration, no matter where you are.",
    },
    {
      icon: Cake,
      title: "Gift Suggestions",
      description:
        "Receive personalized gift ideas based on the recipient's interests and your budget. Make every gift meaningful and appreciated.",
    },
    {
      icon: Gift,
      title: "Virtual Gift Cards",
      description:
        "Send instant virtual gift cards from popular retailers. Perfect for last-minute gifts or long-distance celebrations.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Busy Professional",
      quote:
        "This app has been a lifesaver! I used to forget birthdays all the time, but now I'm always prepared with the perfect wish and gift.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Family Man",
      quote:
        "The custom websites feature is amazing. I created a beautiful online celebration for my daughter's 10th birthday, and our relatives loved it!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Social Butterfly",
      quote:
        "The AI wish generator is so creative! It's helped me send unique and heartfelt messages to all my friends. Highly recommend!",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      {/* {showConfetti && (
        <Confetti
          numberOfPieces={200}
          recycle={false}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )} */}

      {/* Hero Section */}
      <div className="container px-4 pt-20 pb-16 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Gift className="w-16 h-16 mx-auto mb-8 text-primary" />
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-primary">
            Never Forget a Birthday Again
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-muted-foreground">
            Your all-in-one birthday reminder solution with AI-powered wishes,
            custom celebration websites, and more!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-md mx-auto space-y-4"
        >
          <Input
            type="email"
            placeholder="Enter your email to get started"
            className="text-center"
          />
          <Button
            size="lg"
            className="w-full"
            onClick={() => setShowConfetti(true)}
          >
            Start Remembering Birthdays
          </Button>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="container px-4 py-16 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">
          Powerful Features for Every Celebration
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="p-6 bg-white rounded-xl dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <feature.icon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container px-4 py-16 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">
          What Our Users Say
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="mb-4 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="container px-4 py-16 mx-auto text-center"
      >
        <div className="p-8 bg-primary rounded-2xl">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">
            Ready to Start?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            Join thousands of users who never miss a birthday celebration
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setShowConfetti(true)}
          >
            Get Started for Free
          </Button>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 py-12 mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Facebook />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Instagram />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            <p>&copy; 2023 Birthday Reminder App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
