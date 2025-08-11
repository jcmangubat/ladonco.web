import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center p-8 rounded-lg border border-border bg-card shadow-md"
    >
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 rounded-lg border border-border bg-card shadow-md animate-slide-in">
          <AlertTriangle className="mx-auto mb-4 text-primary" size={48} />
          <h1 className="text-5xl font-bold mb-6 text-primary">404</h1>
          <p className="text-xl text-card-foreground mb-6">Page not found</p>
          <p className="text-sm text-muted-foreground mb-2">
            Tried to access: <code>{location.pathname}</code>
          </p>
          {/* <a href="/" className="text-primary hover:text-primary/80 underline transition-colors">
          Return to Home
        </a> */}
          <Link
            to="/"
            className="text-primary hover:text-primary/80 underline transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;
