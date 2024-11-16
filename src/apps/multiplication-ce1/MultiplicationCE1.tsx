import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FinalMessage from '@/components/FinalMessage';
import ScoreDisplay from '@/components/ScoreDisplay';
import { NumberDisplay } from './components/NumberDisplay';
import { PartialProducts } from './components/PartialProducts';

const MultiplicationCE1 = () => {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [numbers, setNumbers] = useState({ multiplicand: 0, multiplier: 0 });
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [carries, setCarries] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const generateNumbers = () => {
    const multiplicand = Math.floor(Math.random() * 999);
    const validDigits = [1, 2, 3];
    let multiplier = '';
    for (let i = 0; i < 2; i++) {
      multiplier += validDigits[Math.floor(Math.random() * validDigits.length)];
    }
    setNumbers({ 
      multiplicand, 
      multiplier: parseInt(multiplier)
    });
  };

  useEffect(() => {
    generateNumbers();
  }, [questionNumber]);

  const handleCarryInput = (index: number, value: string) => {
    const newCarries = [...carries];
    newCarries[index] = value;
    setCarries(newCarries);
  };

  const handleAnswerInput = (index: number, value: string) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = value;
    setUserAnswer(newAnswer);
  };

  const checkAnswer = () => {
    const result = numbers.multiplicand * numbers.multiplier;
    const correctAnswer = result.toString();
    const userAnswerString = userAnswer.join('');
    
    if (userAnswerString === '') {
      setMessage("Effectue la multiplication !");
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
          setUserAnswer([]);
          setCarries([]);
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
    setUserAnswer(['', '', '', '', '']);
    setCarries(['', '', '', '']);
    setMessage('');
    setAttempts(0);
    setShowContinue(false);
    generateNumbers();
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="bg-gray-200 p-4 mb-6">
        <div className="flex items-center gap-12 max-w-2xl mx-auto">
          <img src="/ceredis.png" alt="Ceredis Logo" className="h-12 w-auto" />
          <h1 className="text-xl font-semibold text-gray-700">
            Multiplication n°{questionNumber} : Effectue la multiplication ci-dessous.
          </h1>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto bg-[#DAE7ED]">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative pl-8">
              <NumberDisplay number={numbers.multiplicand} maxLength={5} />
              <div className="absolute left-0 top-[3.7rem] text-2xl">×</div>
              <NumberDisplay number={numbers.multiplier} maxLength={5} />
              <div className="border-b-2 border-black mt-2" />
              
              <PartialProducts 
                multiplierLength={numbers.multiplier.toString().length}
                multiplicandLength={numbers.multiplicand.toString().length}
                carries={carries}
                onCarryInput={handleCarryInput}
              />
              
              <div className="border-b-2 border-black mt-2" />
              <div className="flex justify-end gap-1">
                {Array(numbers.multiplicand.toString().length + 1).fill(0).map((_, index) => (
                  <input
                    key={`answer-${index}`}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center border rounded text-2xl"
                    value={userAnswer[index] || ''}
                    onChange={(e) => handleAnswerInput(index, e.target.value)}
                  />
                ))}
              </div>
            </div>

            {message && (
              <Alert>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end">
              {!isComplete ? (
                !showContinue ? (
                  <Button onClick={checkAnswer} className="bg-green-600 hover:bg-green-700">
                    Valider
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      setShowContinue(false);
                      setQuestionNumber(questionNumber + 1);
                      setUserAnswer([]);
                      setCarries([]);
                      setMessage('');
                      setAttempts(0);
                    }} 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Continuer
                  </Button>
                )
              ) : (
                <Button onClick={restart} className="bg-blue-600 hover:bg-blue-700">
                  Recommencer
                </Button>
              )}
            </div>
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

export default MultiplicationCE1;
