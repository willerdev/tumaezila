"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormStep from './FormStep';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';

const formSteps = [
  { fields: ['name', 'email', 'phone', 'address'], title: "Let's Get to Know You" },
  { fields: ['product', 'brand', 'color'], title: "What's Your Dream Device?" },
  { fields: ['memory', 'ram', 'priceRange'], title: "Let's Talk Specs" },
  { fields: ['paymentMethod'], title: "Almost There!" },
];

export default function OrderForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: Record<string, any>) => void;
  initialData: Record<string, any>;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: Record<string, any>) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    onSubmit(formData);
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden" // Removed background styles
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">{formSteps[currentStep].title}</h2>
        <div className="mb-6 flex justify-between items-center">
          {formSteps.map((_, index) => (
            <div
              key={index}
              className={`w-1/4 h-2 rounded-full ${
                index <= currentStep ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            <FormStep
              key={currentStep}
              fields={formSteps[currentStep].fields}
              formData={formData}
              onChange={handleInputChange}
            />
          </AnimatePresence>
          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="bg-gray-200 text-black"
              >
                Previous
              </Button>
            )}
            {currentStep < formSteps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Order
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
}
