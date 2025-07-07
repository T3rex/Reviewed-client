function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <span className="animate-spin rounded-full border-4 border-purple-600 border-t-transparent w-10 h-10"></span>
    </div>
  );
}

export default LoadingSpinner;
