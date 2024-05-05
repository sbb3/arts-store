import HeroSection from "@/components/layout/hero-section";
import TitleSection from "@/components/layout/title-section";
import ProductsGrid from "@/components/product/products-grid";

export default function Index() {
  return (
    <div className="animate-in w-full h-full flex flex-col gap-10 md:gap-15 lg:gap-20 items-center">
      <HeroSection />
      <TitleSection />
      <div className="flex w-full gap-4">
        <div className="flex-1">
          <ProductsGrid />
        </div>
      </div>
    </div>
  );
}
