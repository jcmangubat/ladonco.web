import "@/styles/_pages/underConstruction.css";

const UnderConstruction = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-yellow-50 text-yellow-900 overflow-hidden">
      {/* Animated construction icon */}
      <div className="animate-bounce-slow mb-6">
        <span className="text-6xl">🚧</span>
      </div>

      {/* Animated heading */}
      <h1 className="text-4xl font-bold mb-4 animate-fade-in">
        <span className="inline-block animate-slide-up">
          Site Under Construction
        </span>
      </h1>

      {/* Animated paragraph */}
      <p className="text-lg animate-fade-in animation-delay-300">
        We're working hard to launch soon. Stay tuned!
      </p>

      {/* Construction animation */}
      <div className="mt-12 flex items-center animate-fade-in animation-delay-600">
        <div className="hammer-animation mr-2">🔨</div>
        <div className="wrench-animation ml-2">🔧</div>
      </div>
    </div>
  );
};

export default UnderConstruction;

// Uncomment the following code if you want a simpler version without animations

// const UnderConstruction = () => (
//   <div className="h-screen flex flex-col items-center justify-center bg-yellow-50 text-yellow-900">
//     <h1 className="text-4xl font-bold mb-4">🚧 Site Under Construction</h1>
//     <p className="text-lg">We're working hard to launch soon. Stay tuned!</p>
//   </div>
// );

// export default UnderConstruction;
