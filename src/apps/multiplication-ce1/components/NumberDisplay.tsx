import React from 'react';

interface NumberDisplayProps {
  number: number;
  maxLength: number;
}

export const NumberDisplay = ({ number, maxLength }: NumberDisplayProps) => {
  const digits = number.toString().padStart(maxLength, '0').split('');
  
  return (
    <div className="flex gap-1">
      {digits.map((digit, index) => (
        <div key={`digit-${index}`} className="w-12 h-12 border rounded flex items-center justify-center bg-white">
          {digit}
        </div>
      ))}
    </div>
  );
};