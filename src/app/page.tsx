"use client";

import { motion } from "framer-motion";
import {
  Gift,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import cake from "@/assets/cake.png";
import gift1 from "@/assets/gift.png";
import celeb from "@/assets/confettis.png";
import poppers from "@/assets/poppers.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { features, testimonials } from "@/lib/data";
import Image from "next/image";
import confetti from "canvas-confetti";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <div className="h-dvh overflow-hidden flex items-center justify-center px-4 pt-20 pb-16 mx-auto bg-linear-to-t from-primary/30 to-black/20 relative">
        <Image
          src={celeb}
          alt=""
          placeholder="blur"
          className="absolute -top-28 opacity-30 select-none left-0 w-full h-full object-cover -z-10"
        />
        <Image
          src={poppers}
          alt=""
          placeholder="blur"
          draggable="false"
          className="absolute size-32 select-none top-20  rotate-12 left-48 object-cover z-10"
        />
        <Image
          src={gift1}
          alt=""
          placeholder="blur"
          draggable="false"
          className="absolute size-32 select-none top-20 -rotate-12 right-48 object-cover z-10"
        />
        <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] llg:h-[800px] rounded-[100%] bg-black/20 left-1/2 -translate-x-1/2 border border-primary/20 bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            onMouseEnter={() => {
              confetti({
                particleCount: 140,
                spread: 150,
                gravity: 0.7,
                origin: { y: 0.6 },
              });
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mt-12">
                Never Forget a{" "}
                <span className="bg-linear-to-l glow-text bric px-2 from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                  Birthday
                </span>{" "}
                Again!
              </h1>
              <p className="max-w-2xl mx-auto mb-8 text-lg text-muted-foreground">
                Your all-in-one birthday reminder solution with AI-powered
                wishes, custom celebration websites, and more!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-md space-x-4"
            >
              <Link href="/dashboard">
                <Button size="lg">Start now!</Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  Dashboard
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image
              alt="Birthday Celebration"
              src="https://ournews.bs/wp-content/uploads/2023/04/birthday-celebration.jpeg"
              className="object-cover size-full rounded-lg glow"
              width={800}
              height={600}
            />
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container px-4 py-16 mx-auto">
        <h2 className="mb-12 text-3xl md:text-5xl font-bold text-center">
          Features
        </h2>
        <div className="grid gap-8 md:grid-cols-2 mx-auto max-w-5xl">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="p-6 bg-muted/30 rounded-xl hover:shadow-primary/20 shadow-md transition-all cursor-pointer"
            >
              <feature.icon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container px-4 py-16 mx-auto max-w-6xl">
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
        className="container px-4 py-16 mx-auto text-center max-w-6xl"
      >
        <div className="p-8 bg-linear-to-b from-primary to-primary/50 rounded-2xl">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">
            Ready to Start?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            Join thousands of users who never miss a birthday celebration
          </p>
          <Button
            size="lg"
            variant="secondary"
            // onClick={() => setShowConfetti(true)}
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
