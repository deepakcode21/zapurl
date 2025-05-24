import UrlForm from "./components/UrlForm";

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-200 to-gray-200 overflow-hidden">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#00ADB5] rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#3f51b5] rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <UrlForm />
      </div>
    </div>
  );
}
export default App;
