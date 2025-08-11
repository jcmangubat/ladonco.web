import { createRoot } from "react-dom/client";
import { SITE_MODE } from "./config/site-config.ts";
import { ThemeProvider } from "./components/theme-provider.tsx";
import UnderConstruction from "./pages/UnderConstruction.tsx";
import UnderMaintenance from "./pages/UnderMaintenance.tsx";
import App from "./App.tsx";
import './styles/global.css';

const root = createRoot(document.getElementById("root")!);
window.global ||= window;

const renderApp = () => {
  switch (SITE_MODE) {
    case "construction":
      return <UnderConstruction />;
    case "maintenance":
      return <UnderMaintenance />;
    default:
      return (
        <ThemeProvider defaultTheme="light">
          <App />
        </ThemeProvider>
      );
  }
};

root.render(renderApp());
