import { Smartphone } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-black bg-opacity-50 p-6">
      <div className="container mx-auto flex justify-center md:justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center">
          <Smartphone className="mr-2" />
          Tuma ezila
        </h1>
        {/* Hide navigation links on mobile (only visible on medium and larger screens) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
