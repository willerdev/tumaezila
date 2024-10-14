"use client";

import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, MapPin, Smartphone, HardDrive, Cpu, DollarSign, CreditCard } from 'lucide-react';
import React from 'react';

interface FormStepProps {
  fields: string[];
  formData: Record<string, any>;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const getIcon = (field: string) => {
  switch (field) {
    case 'name': return <User className="w-5 h-5" />;
    case 'email': return <Mail className="w-5 h-5" />;
    case 'phone': return <Phone className="w-5 h-5" />;
    case 'address': return <MapPin className="w-5 h-5" />;
    case 'product': return <Smartphone className="w-5 h-5" />;
    case 'memory': return <HardDrive className="w-5 h-5" />;
    case 'ram': return <Cpu className="w-5 h-5" />;
    case 'priceRange': return <DollarSign className="w-5 h-5" />;
    case 'paymentMethod': return <CreditCard className="w-5 h-5" />;
    default: return null;
  }
};

export default function FormStep({ fields, formData, onChange }: FormStepProps) {
  function handleSelectChange(name: string, value: string) {
    onChange({
      target: {
        name,
        value,
      },
    } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>);
  }

  return (
    <>
      {fields.map((field) => (
        <motion.div
          key={field}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Label htmlFor={field} className="block text-sm font-medium mb-1 capitalize">
            {field}
          </Label>
          <div className="relative">
            {field === 'product' || field === 'paymentMethod' ? (
              <Select name={field} onValueChange={(value) => handleSelectChange(field, value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  {field === 'product' ? (
                    <>
                      <SelectItem value="phone" className="text-black">Phone</SelectItem>
                      <SelectItem value="computer" className="text-black">Computer</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="topup" className="text-black">Top-up</SelectItem>
                      <SelectItem value="cash" className="text-black">Cash</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            ) : (
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  {getIcon(field)}
                </span>
                <Input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  required
                  className="pl-10 bg-gray-100 text-black"
                  placeholder={`Enter your ${field}`}
                  value={formData[field]}
                  onChange={onChange}
                />
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </>
  );
}
