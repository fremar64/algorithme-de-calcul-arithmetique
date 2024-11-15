import React from 'react';

interface PartialProductsProps {
  multiplierLength: number;
  maxLength: number;
  carries: string[];
  onCarryInput: (index: number, value: string) => void;
}

export const PartialProducts = ({ multiplierLength, maxLength, carries, onCarryInput }: PartialProductsProps) => {
  return (
    <div className="space-y-2">
      {Array(multiplierLength).fill(0).map((_, lineIndex) => (
        <div key={`product-${lineIndex}`} className="flex gap-1">
          {Array(maxLength).fill(0).map((_, digitIndex) => (
            <input
              key={`product-${lineIndex}-${digitIndex}`}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center border rounded"
              value={carries[lineIndex * maxLength + digitIndex] || ''}
              onChange={(e) => onCarryInput(lineIndex * maxLength + digitIndex, e.target.value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};