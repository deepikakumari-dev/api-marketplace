import APIsByCategory from "@/components/home/APIsByCategory";
import FeaturedAPIs from "@/components/home/FeaturedAPIs";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedAPIs />
      <APIsByCategory />
      <Newsletter />
    </div>
  );
}
