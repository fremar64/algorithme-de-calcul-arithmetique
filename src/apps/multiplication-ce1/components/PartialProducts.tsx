import React from 'react';

interface PartialProductsProps {
  multiplierLength: number;
  multiplicandLength: number;
  carries: string[];
  onCarryInput: (index: number, value: string) => void;
}

export const PartialProducts = ({ 
  multiplierLength, 
  multiplicandLength,
  carries, 
  onCarryInput 
}: PartialProductsProps) => {
  return (
    <div className="space-y-2">
      {Array(multiplierLength).fill(0).map((_, lineIndex) => (
        <div key={`product-${lineIndex}`} className="flex justify-end gap-1">
          {Array(multiplicandLength + 1).fill(0).map((_, digitIndex) => (
            <input
              key={`product-${lineIndex}-${digitIndex}`}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center border rounded text-2xl"
              value={carries[lineIndex * (multiplicandLength + 1) + digitIndex] || ''}
              onChange={(e) => onCarryInput(lineIndex * (multiplicandLength + 1) + digitIndex, e.target.value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};