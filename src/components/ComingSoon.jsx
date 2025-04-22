import React from "react";

function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[300px] p-6 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 shadow-md">
      <img
        src="https://i.gifer.com/ZZ5H.gif" // funny loading gif — change if you want something else!
        alt="Under construction"
        className="w-40 h-40 mb-6"
      />
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 dark:text-blue-300 mb-2">
        Coming Soon!
      </h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg max-w-lg">
        🚧 This feature is currently under construction. We’re working hard to
        bring it to life — hang tight, exciting things are on the way!
      </p>
    </div>
  );
}

export default ComingSoon;
