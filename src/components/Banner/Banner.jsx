import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className="bg-[url('/banner2.jpg')] bg-cover">
      <div className="h-[400px] flex flex-col justify-around px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3">Crypto Hunter</h1>
          <p className="text-gray-400">
            Get all the Info regarding your favorite Crypto Currency
          </p>
        </div>
        <Carousel />
      </div>
    </div>
  );
};

export default Banner;
