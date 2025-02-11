import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import './globals.css'
import React from 'react'
import Navbar from "../components/Navbar";
export default function RootLayout({children,}: { children: React.ReactNode })
{
    return (
        <ClerkProvider>
            <html>
            <body>
            <Navbar />
            <main>{children}</main>
            </body>
            </html>
        </ClerkProvider>

    )
}
