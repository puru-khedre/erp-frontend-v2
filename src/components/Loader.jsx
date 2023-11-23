const Loader = ({ className }) => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center ${className}`}
    >
      <div className="text-3xl font-extrabold">Loading...</div>
    </div>
  );
};

export default Loader;
