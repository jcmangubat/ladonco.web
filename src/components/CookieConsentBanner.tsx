import { useEffect, useState } from "react";

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    //localStorage.removeItem("cookieConsent");
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleCustomize = () => {
    alert("Redirecting to cookie preferences...");
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[9999]
                 bg-yellow-100 dark:bg-yellow-700 text-gray-800 dark:text-white
                 shadow-2xl px-6 py-5 rounded-xl border border-yellow-300 dark:border-yellow-500
                 max-w-3xl w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <p className="text-sm leading-relaxed">
          We use cookies to personalize content and ads, to provide social media features, and to analyze our traffic. You can manage your cookie preferences or accept all.
        </p>
        <div className="flex justify-end gap-2 sm:justify-end">
          {/* <button
            onClick={handleCustomize}
            className="text-sm underline text-blue-700 dark:text-blue-300 hover:opacity-80"
          >
            Customize
          </button> */}
          <button
            onClick={handleAccept}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
