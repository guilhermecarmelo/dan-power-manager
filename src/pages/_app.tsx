import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "../../node_modules/evil-icons/assets/evil-icons.css";
import "../components/EmblaCarousel/embla.css";
import { AssignToast } from "../hooks/Toast";
import { AssignTokenProvider } from "../hooks/Token";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AssignTokenProvider>
      <PrimeReactProvider>
        <AssignToast>
          <Component {...pageProps} />
          <Analytics />
          <SpeedInsights />
        </AssignToast>
      </PrimeReactProvider>
    </AssignTokenProvider>
  );
}
