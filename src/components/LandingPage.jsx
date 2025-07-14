import React from "react";

function LandingPage() {
  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen flex flex-col items-center justify-start text-center p-6 space-y-6">
      <div className="text-3xl mt-20 md:text-5xl font-bold dark:text-white max-w-md md:max-w-2xl">
        Get reviews from your customers with ease
      </div>
      <div className="text-base md:text-lg dark:text-gray-300 max-w-sm md:max-w-3xl">
        Collecting reviews is hard, we get it! So we built reviews. In minutes,
        you can collect text and video reviews from your customers with no need
        for a developer or website hosting.
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
          Get Started
        </button>
        <button className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-lg transition">
          Know More
        </button>
      </div>
      <div className="text-sm dark:text-gray-400">
        Get started with free credits on us.{" "}
        <a href="#" className="text-blue-500 hover:underline">
          See our pricing →
        </a>
      </div>

      <div className="text-3xl mt-20 md:text-5xl font-bold dark:text-white max-w-md md:max-w-2xl">
        Add testimonials to your website with no coding!
      </div>
      <div className="text-base md:text-lg dark:text-gray-300 max-w-sm md:max-w-2xl">
        Copy and paste our HTML code to add the Wall Of Love (👉 full version)
        to your website. We support any no-code platform (Webflow, WordPress,
        you name it!)
      </div>
    </div>
  );
}

export default LandingPage;
