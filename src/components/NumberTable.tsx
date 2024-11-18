import React from 'react';
import { Input } from "@/components/ui/input";

interface NumberTableProps {
  number: string;
  onDigitInput: (index: number, value: string) => void;
  userInputMode?: boolean;
  userDigits?: string[];
}

const NumberTable = ({ number, onDigitInput, userInputMode = true, userDigits = [] }: NumberTableProps) => {
  const handleDigitInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    onDigitInput(index, value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={3} className="text-center border p-2">Milliards</th>
            <th colSpan={3} className="text-center border p-2">Millions</th>
            <th colSpan={3} className="text-center border p-2">Mille</th>
            <th colSpan={3} className="text-center border p-2">Unités</th>
          </tr>
          <tr>
            {['C', 'D', 'U'].map((unit, index) => (
              <React.Fragment key={`billions-${unit}`}>
                <th className="border p-2">{unit}</th>
              </React.Fragment>
            ))}
            {['C', 'D', 'U'].map((unit, index) => (
              <React.Fragment key={`millions-${unit}`}>
                <th className="border p-2">{unit}</th>
              </React.Fragment>
            ))}
            {['C', 'D', 'U'].map((unit, index) => (
              <React.Fragment key={`thousands-${unit}`}>
                <th className="border p-2">{unit}</th>
              </React.Fragment>
            ))}
            {['C', 'D', 'U'].map((unit, index) => (
              <React.Fragment key={`units-${unit}`}>
                <th className="border p-2">{unit}</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array(12).fill('').map((_, index) => (
              <td key={index} className="border p-2">
                {userInputMode ? (
                  <Input
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl"
                    value={userDigits[index] || ''}
                    onChange={(e) => handleDigitInput(index, e.target.value)}
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center text-xl">
                    {number.split(' ').join('')[index] || ''}
                  </div>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NumberTable;