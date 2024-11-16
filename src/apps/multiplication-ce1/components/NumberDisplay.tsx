import React from 'react';

interface NumberDisplayProps {
  number: number;
  maxLength: number;
}

export const NumberDisplay = ({ number }: NumberDisplayProps) => {
  const digits = number.toString().split('');
  
  return (
    <div className="flex gap-1 justify-end">
      {digits.map((digit, index) => (
        <div key={`digit-${index}`} className="w-12 h-12 border rounded flex items-center justify-center bg-white text-2xl">
          {digit}
        </div>
      ))}
    </div>
  );
};