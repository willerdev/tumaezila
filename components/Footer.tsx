import { Facebook, Instagram, Twitter } from 'lucide-react';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black bg-opacity-50 p-6">
      {/* This section will only be visible on medium and larger screens */}
      <div className="container mx-auto text-center hidden md:block">
        <p>&copy; 2023 Tuma ezila. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* WhatsApp and Call buttons for mobile only */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between bg-white md:hidden">
        <a
          href="tel:+1234567890"
          className="bg-black text-white w-1/2 text-center p-4 flex items-center justify-center"
        >
          <FaPhone className="mr-2" />
          <span>Call</span>
        </a>
        <a
          href="https://wa.me/+1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black w-1/2 text-center p-4 flex items-center justify-center"
        >
          <FaWhatsapp className="mr-2" />
          <span>WhatsApp</span>
        </a>
      </div>
    </footer>
  );
}
