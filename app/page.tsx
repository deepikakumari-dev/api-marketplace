import APIsByCategory from "@/components/home/APIsByCategory";
import FeaturedAPIs from "@/components/home/FeaturedAPIs";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Reviews from "@/components/home/Reviews";
import { getFeaturedAPIs, rankAPIs } from "@/lib/data/apis";
import Image from "next/image";

export default async function Home() {
  const featuredAPIs = await getFeaturedAPIs()
  const topAPIs = await rankAPIs()
  return (
    <>
      <Hero />
      <div className="w-full container mx-auto px-2">
        <FeaturedAPIs apis={featuredAPIs} />
        <APIsByCategory />
        <Reviews />
        <Newsletter />
      </div>
    </>
  );
}
