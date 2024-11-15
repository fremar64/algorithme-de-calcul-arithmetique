import React from 'react';
import { Input } from "@/components/ui/input";

interface QuestionPromptProps {
  numberInWords: string;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
}

const QuestionPrompt = ({ numberInWords, userAnswer, onAnswerChange }: QuestionPromptProps) => {
  return (
    <div className="flex items-center gap-4">
      <p className="text-lg">
        Le nombre <span className="text-xl font-semibold text-blue-600">{numberInWords}</span> s'écrit en chiffres :
      </p>
      <Input
        type="text"
        className="w-40 h-10 px-3"
        value={userAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
        maxLength={15}
      />
    </div>
  );
};

export default QuestionPrompt;