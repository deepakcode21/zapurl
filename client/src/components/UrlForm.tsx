import React, { useState, useEffect } from "react";
import { 
  Clipboard, Link, Loader2, QrCode, X, Zap, BarChart, 
  ShieldCheck, Rocket, Smile, Users, Github  // Add GitHub icon here
} from "lucide-react";
import QRCode from "react-qr-code";

interface ShortenResponse {
  shortUrl: string;
  qrCode?: string;
}

interface UrlHistory {
  longUrl: string;
  shortUrl: string;
  timestamp: number;
  clicks?: number;
}

function UrlForm() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [history, setHistory] = useState<UrlHistory[]>([]);
  const [stats, setStats] = useState({ totalUrls: 6000, activeLinks: 2345 });

  useEffect(() => {
    const savedHistory = localStorage.getItem("zapurl-history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("zapurl-history", JSON.stringify(history));
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(longUrl)) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setIsLoading(true);
    setError("");
    setCopied(false);
    setShowQR(false);

    try {
      const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl }),
      });

      if (!response.ok) throw new Error("Failed to shorten URL");

      const data: ShortenResponse = await response.json();
      setShortUrl(data.shortUrl);
      setStats(prev => ({ ...prev, totalUrls: prev.totalUrls + 1 }));

      const newEntry: UrlHistory = {
        longUrl,
        shortUrl: data.shortUrl,
        timestamp: Date.now(),
        clicks: 0
      };

      setHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearUrl = () => {
    setLongUrl("");
    setShortUrl("");
    setError("");
    setCopied(false);
    setShowQR(false);
  };

  const formatUrl = (url: string, maxLength = 40) => {
    return url.length <= maxLength ? url : `${url.substring(0, maxLength)}...`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen ">
  
  {/* GitHub Banner */}
  <a
    href="https://github.com/deepakcode21/zapurl"  // Replace with your actual repo URL
    target="_blank"
    rel="noopener noreferrer"
    className="fixed top-4 right-4 z-50 p-2 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors animate-bounce hover:animate-none"
    aria-label="View source code on GitHub"
  >
    <Github className="h-6 w-6" />
  </a>
      {/* Hero Section */}
      <header className="pt-15 pb-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6 space-x-3">
            <Zap className="h-12 w-12 text-blue-600 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ZapURL
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform long URLs into short, memorable links and gain powerful insights into your audience
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <div className="py-4">
        <div className="max-w-6xl mx-auto px-4  grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center bg-white rounded-md shadow shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black  ease-out hover:translate-y-1 transition-all  p-4">
            <BarChart className="h-8 w-8 text-blue-600  mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900">{stats.totalUrls}+</div>
            <div className="text-gray-500">Links Created</div>
          </div>
           <div className="text-center bg-white rounded-md shadow shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black  ease-out hover:translate-y-1 transition-all  p-4">
            <Rocket className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900">24/7</div>
            <div className="text-gray-500">Uptime</div>
          </div>
           <div className="text-center bg-white rounded-md shadow shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black  ease-out hover:translate-y-1 transition-all  p-4">
            <ShieldCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900">100%</div>
            <div className="text-gray-500">Secure</div>
          </div>
           <div className="text-center bg-white rounded-md shadow shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black  ease-out hover:translate-y-1 transition-all  p-4">
            <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900">10K+</div>
            <div className="text-gray-500">Users</div>
          </div>
        </div>
      </div>

      {/* Shortener Section */}
      <section id="shortener" className="py-6">
        <div className="max-w-3xl mx-auto px-4">
          <div className=" rounded-2xl  overflow-hidden transition-all duration-300">
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    placeholder="Paste your long URL here..."
                    className="block w-full pl-10 pr-10 py-4 border-2 border-black bg-white rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900"
                    value={longUrl}
                    onChange={(e) => {
                      setLongUrl(e.target.value);
                      setError("");
                    }}
                    required
                  />
                  {longUrl && (
                    <button
                      type="button"
                      onClick={clearUrl}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-black to-slate-500 hover:from-orange-400 hover:to-red-500 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Shortening...
                    </span>
                  ) : (
                    "Shorten URL"
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-start">
                  <div className="flex-shrink-0 mr-2">⚠️</div>
                  <p>{error}</p>
                </div>
              )}

              {shortUrl && (
                <div className="mt-6 animate-fadeIn">
                  <div className="p-5 bg-white rounded-xl border border-blue-100">
                    <p className="text-sm font-medium text-blue-800 mb-2">
                      Your shortened URL:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 items-center">
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow text-blue-600 hover:text-blue-800 font-medium break-all"
                      >
                        {shortUrl}
                      </a>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(shortUrl)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                            copied
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <Clipboard className="h-4 w-4 mr-1" />
                          {copied ? "Copied!" : "Copy"}
                        </button>
                        <button
                          onClick={() => setShowQR(!showQR)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                            showQR
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <QrCode className="h-4 w-4 mr-1" />
                          QR Code
                        </button>
                      </div>
                    </div>
                    {showQR && (
                      <div className="flex flex-col items-center mt-6">
                        <QRCode value={shortUrl} size={160} />
                        <p className="text-sm text-gray-500 mt-3">
                          Scan QR code to visit URL
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
     
      {/* History Section */}
      {history.length > 0 && (
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Recent Links
                </h2>
                <div className="divide-y divide-gray-200">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm text-gray-500 truncate"
                          title={item.longUrl}
                        >
                          {formatUrl(item.longUrl)}
                        </p>
                        <a
                          href={item.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {formatUrl(item.shortUrl, 30)}
                        </a>
                        <p className="text-xs text-gray-400">
                          {formatDate(item.timestamp)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(item.shortUrl)}
                          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                          title="Copy to clipboard"
                        >
                          <Clipboard className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setShortUrl(item.shortUrl);
                            setLongUrl(item.longUrl);
                            setShowQR(true);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                          title="Show QR code"
                        >
                          <QrCode className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      
    </div>
  );
}

export default UrlForm;