"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import OrderForm from '@/components/OrderForm';
import ThankYou from '@/components/ThankYou';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    product: '',
    memory: '',
    ram: '',
    brand: '',
    color: '',
    priceRange: '',
    paymentMethod: '',
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem('orderFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleFormSubmit = async (data: Record<string, any>) => {
    setFormData(data as typeof formData);
    localStorage.setItem('orderFormData', JSON.stringify(data));
    setIsSubmitted(true);

    // Send email to client
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        {!isSubmitted ? (
          <OrderForm onSubmit={handleFormSubmit} initialData={formData} />
        ) : (
          <ThankYou formData={formData} />
        )}
      </main>

      {/* WhatsApp and Call buttons */}
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
    </div>
  );
}
