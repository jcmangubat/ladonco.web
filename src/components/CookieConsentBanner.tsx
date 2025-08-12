import { useEffect, useState } from "react";
import styles from "../styles/_components/CookieConsentBanner.module.css";

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    //localStorage.removeItem("cookieConsent");
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Add a small delay before showing to improve UX
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem("cookieConsent", "necessary");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.cookieContainer}>
        <div className={styles.cookieHeader}>
          <div className={styles.cookieIcon}>🍪</div>
          <h3 className={styles.cookieTitle}>Cookie Preferences</h3>
          <button 
            className={styles.closeButton}
            onClick={() => setVisible(false)}
            aria-label="Close cookie banner"
          >
            ✕
          </button>
        </div>
        
        <div className={styles.cookieContent}>
          <p className={styles.cookieMessage}>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies.
          </p>
          
          {showDetails && (
            <div className={styles.cookieDetails}>
              <div className={styles.cookieType}>
                <div className={styles.cookieTypeHeader}>
                  <h4>Strictly Necessary Cookies</h4>
                  <span className={styles.alwaysActive}>Always Active</span>
                </div>
                <p>These cookies are essential for the website to function and cannot be switched off.</p>
              </div>
              
              <div className={styles.cookieType}>
                <div className={styles.cookieTypeHeader}>
                  <h4>Analytics Cookies</h4>
                  <label className={styles.toggleSwitch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
              </div>
              
              <div className={styles.cookieType}>
                <div className={styles.cookieTypeHeader}>
                  <h4>Marketing Cookies</h4>
                  <label className={styles.toggleSwitch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <p>These cookies may be set through our site by our advertising partners to build a profile of your interests.</p>
              </div>
            </div>
          )}
          
          <div className={styles.cookieActions}>
            <button 
              onClick={handleCustomize}
              className={styles.customizeButton}
            >
              {showDetails ? "Hide Details" : "Customize"}
            </button>
            
            <div className={styles.actionButtons}>
              <button 
                onClick={handleAcceptNecessary}
                className={styles.necessaryButton}
              >
                Accept Necessary
              </button>
              <button 
                onClick={handleAccept}
                className={styles.acceptButton}
              >
                Accept All
              </button>
            </div>
          </div>
          
          <div className={styles.cookieLinks}>
            <a href="/privacy-policy" className={styles.cookieLink}>Privacy Policy</a>
            <span className={styles.linkSeparator}>•</span>
            <a href="/cookie-policy" className={styles.cookieLink}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;