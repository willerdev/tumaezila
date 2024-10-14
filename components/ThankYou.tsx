"use client";

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface ThankYouProps {
  formData: {
    name: string;
    email: string;
    address: string;
    phone: string;
    product: string;
    memory: string;
    ram: string;
    brand: string;
    color: string;
    priceRange: string;
    paymentMethod: string;
  };
}

const ThankYou: React.FC<ThankYouProps> = ({ formData }) => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg overflow-hidden p-6 text-center"
    >
      <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
      <p className="text-lg mb-6">Your order has been successfully submitted. We'll contact you soon with further details.</p>
      <div className="flex justify-center items-center space-x-4 p-4 d-none">
        <Button
          className="px-6 py-2"
          onClick={() => {
            window.location.reload();
          }}
        >
          Place Another Order
        </Button>
        <Button variant="secondary" asChild className="px-6 py-2">
          <a
            href="https://wa.me/+821074276822"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <FaWhatsapp className="mr-2" />
            WhatsApp Ezila
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

export default ThankYou;
