{/*This the the footer code */}
import Link from 'next/link';

// Export for access to other pages
export default function Footer() {
  return (
    <footer className="bg-[#577590] py-4 shadow-md mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 Quick about section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">About Us</h3>
            <p className="text-white text-sm">
              We provide you and your team with the best organization tools .
            </p>
          </div>

          {/* Column 2 Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:text-orange-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/PrivacyPolicy" className="text-white hover:text-orange-400">
                  Privacy Policy
                </Link>
              </li>
              {/* Really not sure what else to put here */}
              <li>
                <Link href="/contact" className="text-white hover:text-orange-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 Contact info and fake address */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="text-white text-sm space-y-2">
              <li>Email: info@TaskSync.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Wouldnt You Like To Know, Stillwater, OK 74074</li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and social content*/}
        <div className="border-t border-white mt-8 pt-8 text-center">
        <div className="flex justify-center space-x-4">
            {/* Facebook Social */}
            <a
              href="https://facebook.com"
              target="_blank"
              /* Adds privacy */
              rel="noopener noreferrer" 
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Facebook
            </a>
            {/* Instagram social */}
            <a
              href="https://instagram.com"
              target="_blank"
              /* Adds privacy */
              rel="noopener noreferrer" 
              className="text-white hover:text-pink-500 transition duration-300"
            >
              Instagram
            </a>
            {/* X social */}
            <a
              href="https://x.com"
              target="_blank"
              /* Adds privacy */
              rel="noopener noreferrer" 
              className="text-white hover:text-black transition duration-300"
            >
              X
            </a>
          </div>
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} TaskSync. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
}