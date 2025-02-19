import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <Navbar />
          <main>{children}</main>
        </ClerkProvider>
        <Footer /> 
      </body>
      
    </html>
  );
}
