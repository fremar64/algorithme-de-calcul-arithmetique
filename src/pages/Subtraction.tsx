import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FinalMessage from '@/components/FinalMessage';
import ScoreDisplay from '@/components/ScoreDisplay';

const Subtraction = () => {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [numbers, setNumbers] = useState({ top: 0, bottom: 0 });
  const [userAnswer, setUserAnswer] = useState(['', '', '', '']);
  const [borrows, setBorrows] = useState(['', '', '']);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const generateNumbers = () => {
    // Generate a larger number for the top (minuend)
    const top = Math.floor(Math.random() * 9000) + 1000; // Between 1000 and 9999
    // Generate a smaller number for the bottom (subtrahend)
    const bottom = Math.floor(Math.random() * (top - 100)) + 100; // Ensures bottom is smaller than top
    setNumbers({ top, bottom });
  };

  useEffect(() => {
    generateNumbers();
  }, [questionNumber]);

  const handleBorrowInput = (index: number, value: string) => {
    const newBorrows = [...borrows];
    newBorrows[index] = value;
    setBorrows(newBorrows);
  };

  const handleAnswerInput = (index: number, value: string) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = value;
    setUserAnswer(newAnswer);
  };

  const checkAnswer = () => {
    const correctAnswer = (numbers.top - numbers.bottom).toString().padStart(4, '0');
    const userAnswerString = userAnswer.join('');
    
    if (userAnswerString === '') {
      setMessage("Effectue la soustraction !");
      return;
    }

    if (userAnswerString === correctAnswer) {
      setMessage('Bravo !');
      setScore(score + 1);
      if (questionNumber === 5) {
        setIsComplete(true);
      } else {
        setTimeout(() => {
          setQuestionNumber(questionNumber + 1);
          setUserAnswer(['', '', '', '']);
          setBorrows(['', '', '']);
          setMessage('');
          setAttempts(0);
        }, 1500);
      }
    } else {
      if (attempts === 0) {
        setMessage('Une erreur ! Encore un essai !');
        setAttempts(1);
      } else {
        setMessage('Regarde bien la correction...');
        setShowContinue(true);
        setUserAnswer(correctAnswer.split(''));
      }
    }
  };

  const restart = () => {
    setScore(0);
    setQuestionNumber(1);
    setIsComplete(false);
    setUserAnswer(['', '', '', '']);
    setBorrows(['', '', '']);
    setMessage('');
    setAttempts(0);
    setShowContinue(false);
    generateNumbers();
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="bg-gray-200 p-4 mb-6">
        <h1 className="text-xl font-semibold text-gray-700">
          Soustraction n°{questionNumber} : Effectue la soustraction ci-dessous.
        </h1>
      </div>

      <Card className="max-w-2xl mx-auto bg-[#FFF8DC]">
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-2 text-center text-2xl mb-4">
            {/* Borrows */}
            <div className="col-span-4 grid grid-cols-4 gap-1 mb-2">
              {borrows.map((borrow, index) => (
                <input
                  key={`borrow-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-6 h-6 text-center border rounded text-sm ml-auto"
                  value={borrow}
                  onChange={(e) => handleBorrowInput(index, e.target.value)}
                />
              ))}
            </div>

            {/* Numbers display grid */}
            <div className="col-span-4 grid grid-cols-4 gap-1 mb-4 relative">
              <div className="col-span-4 grid grid-cols-4 gap-1">
                {numbers.top.toString().padStart(4, '0').split('').map((digit, index) => (
                  <div key={`top-${index}`} className="w-12 h-12 border rounded flex items-center justify-center bg-white">
                    {digit}
                  </div>
                ))}
              </div>
              <div className="absolute left-[-2rem] top-[3.7rem] text-2xl">-</div>
              <div className="col-span-4 grid grid-cols-4 gap-1">
                {numbers.bottom.toString().padStart(4, '0').split('').map((digit, index) => (
                  <div key={`bottom-${index}`} className="w-12 h-12 border rounded flex items-center justify-center bg-white">
                    {digit}
                  </div>
                ))}
              </div>
              <div className="col-span-4 border-b-2 border-black mt-2"></div>
            </div>

            {/* Answer inputs */}
            <div className="col-span-4 grid grid-cols-4 gap-1">
              {userAnswer.map((digit, index) => (
                <input
                  key={`answer-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center border rounded"
                  value={digit}
                  onChange={(e) => handleAnswerInput(index, e.target.value)}
                />
              ))}
            </div>
          </div>

          {message && (
            <Alert className="mt-4">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end mt-4">
            {!isComplete ? (
              !showContinue ? (
                <Button onClick={checkAnswer} className="bg-green-600 hover:bg-green-700">
                  Valider
                </Button>
              ) : (
                <Button onClick={() => {
                  setShowContinue(false);
                  setQuestionNumber(questionNumber + 1);
                  setUserAnswer(['', '', '', '']);
                  setBorrows(['', '', '']);
                  setMessage('');
                  setAttempts(0);
                }} className="bg-blue-600 hover:bg-blue-700">
                  Continuer
                </Button>
              )
            ) : (
              <Button onClick={restart} className="bg-blue-600 hover:bg-blue-700">
                Recommencer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <ScoreDisplay score={score} questionNumber={questionNumber} />
        <FinalMessage score={score} isComplete={isComplete} />
      </div>
    </div>
  );
};

export default Subtraction;