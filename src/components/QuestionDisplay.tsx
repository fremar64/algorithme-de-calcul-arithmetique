import React from 'react';
import { Input } from "@/components/ui/input";

interface QuestionDisplayProps {
  number: string;
  placeValue: string;
  onAnswerChange: (value: string) => void;
  answer: string;
}

const QuestionDisplay = ({ number, placeValue, onAnswerChange, answer }: QuestionDisplayProps) => {
  return (
    <div className="flex items-center gap-4 mt-4">
      <p className="text-lg">
        Dans le nombre <span className="text-2xl text-blue-600">{number}</span>{' '}
        le chiffre des <span className="text-blue-600 underline">{placeValue}</span> est :
      </p>
      <Input
        type="text"
        maxLength={1}
        className="w-16 h-12 text-center text-xl"
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
      />
    </div>
  );
};

export default QuestionDisplay;