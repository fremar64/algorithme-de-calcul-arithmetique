import React from 'react';
import { Input } from "@/components/ui/input";

interface NumberTableProps {
  number: string;
  onDigitInput: (index: number, value: string) => void;
}

const NumberTable = ({ number, onDigitInput }: NumberTableProps) => {
  const digits = number.padStart(12, '0').split('');

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={3} className="text-center border p-2">Billions</th>
            <th colSpan={3} className="text-center border p-2">Millions</th>
            <th colSpan={3} className="text-center border p-2">Thousands</th>
            <th colSpan={3} className="text-center border p-2">Units</th>
          </tr>
          <tr>
            {['H', 'T', 'U'].map((unit, index) => (
              <React.Fragment key={`billions-${unit}`}>
                <th className="border p-2">{unit}</th>
              </React.Fragment>
            ))}
            {['H', 'T', 'U'].map((unit, index) => (
              <React.Fragment key={`millions-${unit}`}>
                <th className="border p-2">{unit}</th>
              </React.Fragment>
            ))}
            {['H', 'T', 'U'].map((unit, index) => (
              <React.Fragment key={`thousands-${unit}`}>
                <th className="border p-2">{unit}</th>
              </React.Fragment>
            ))}
            {['H', 'T', 'U'].map((unit, index) => (
              <React.Fragment key={`units-${unit}`}>
                <th className="border p-2">{unit}</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {digits.map((digit, index) => (
              <td key={index} className="border p-2">
                <Input
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl"
                  value={digit}
                  onChange={(e) => onDigitInput(index, e.target.value)}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NumberTable;