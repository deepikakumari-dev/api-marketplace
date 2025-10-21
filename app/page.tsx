import APIsByCategory from "@/components/home/APIsByCategory";
import FeaturedAPIs from "@/components/home/FeaturedAPIs";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Reviews from "@/components/home/Reviews";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedAPIs />
      <APIsByCategory />
      <Reviews />
      <Newsletter />
    </div>
  );
}
