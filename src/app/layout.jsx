import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full">
        <body className="flex flex-col min-h-screen">
        <ClerkProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </ClerkProvider>
        </body>
        </html>
    );
}