import Categories from "@/components/UI/HomePage/Categories/Categories";
import MainSection from "@/components/UI/HomePage/MainSection/MainSection";
import TopRatedProducts from "@/components/UI/HomePage/TopRatedProducts/TopRatedProducts";
import WhyUs from "@/components/UI/HomePage/WhyUs/WhyUs";






const HomePage = () => {
  return (
    <>
      <MainSection/>
      <Categories/>
      <TopRatedProducts />
      <WhyUs />
    </>
  );
};

export default HomePage;
