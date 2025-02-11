import Image from 'next/image';
import Link from 'next/link';
import {SignIn, SignUp} from "@clerk/nextjs";

export default function Navbar() {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
        </nav>
    )
}
