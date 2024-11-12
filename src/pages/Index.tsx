import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [numbers, setNumbers] = useState({ top: 0, bottom: 0 });
  const [userAnswer, setUserAnswer] = useState(['', '', '', '']);
  const [carries, setCarries] = useState(['', '']);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const generateNumbers = () => {
    const top = Math.floor(Math.random() * 1000);
    const bottom = Math.floor(Math.random() * 1000);
    setNumbers({ top, bottom });
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
    const correctAnswer = (numbers.top + numbers.bottom).toString().padStart(4, '0');
    const userAnswerString = userAnswer.join('');
    
    if (userAnswerString === '') {
      setMessage("Effectue l'addition !");
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
          setCarries(['', '']);
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

  const getFinalMessage = () => {
    if (score === 5) return "Bravo ! Performance très satisfaisante !";
    if (score === 4) return "Bravo ! Performance satisfaisante !";
    if (score === 3) return "Performance insuffisante ! Tu dois encore t'entraîner";
    return "Performance très insuffisante ! Tu dois encore t'entraîner";
  };

  const restart = () => {
    setScore(0);
    setQuestionNumber(1);
    setIsComplete(false);
    setUserAnswer(['', '', '', '']);
    setCarries(['', '']);
    setMessage('');
    setAttempts(0);
    setShowContinue(false);
    generateNumbers();
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="bg-gray-200 p-4 mb-6">
        <h1 className="text-xl font-semibold text-gray-700">
          Addition n°{questionNumber} : Effectuer des additions posées
        </h1>
      </div>

      <Card className="max-w-2xl mx-auto bg-[#FFF8DC]">
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-2 text-center text-2xl mb-4">
            {/* Carries */}
            <div className="col-span-4 grid grid-cols-4 gap-2 mb-2">
              {carries.map((carry, index) => (
                <input
                  key={`carry-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-10 h-10 text-center border rounded"
                  value={carry}
                  onChange={(e) => handleCarryInput(index, e.target.value)}
                />
              ))}
            </div>

            {/* Numbers */}
            <div className="col-span-4 grid grid-cols-4 gap-2 mb-4">
              <div className="col-span-4 text-right pr-4">
                {numbers.top.toString().padStart(4, '0')}
              </div>
              <div className="col-span-4 text-right pr-4 border-b-2 border-black">
                + {numbers.bottom.toString().padStart(4, '0')}
              </div>
            </div>

            {/* Answer inputs */}
            <div className="col-span-4 grid grid-cols-4 gap-2">
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
            {!showContinue ? (
              <Button onClick={checkAnswer} className="bg-green-600 hover:bg-green-700">
                Valider
              </Button>
            ) : (
              <Button onClick={() => {
                setShowContinue(false);
                setQuestionNumber(questionNumber + 1);
                setUserAnswer(['', '', '', '']);
                setCarries(['', '']);
                setMessage('');
                setAttempts(0);
              }} className="bg-blue-600 hover:bg-blue-700">
                Continuer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-lg font-bold">
          Mon score : {score} sur {questionNumber}
        </p>
        
        {isComplete && (
          <>
            <Alert className="mt-4 max-w-2xl mx-auto">
              <AlertDescription>{getFinalMessage()}</AlertDescription>
            </Alert>
            <Button onClick={restart} className="mt-4">
              Recommencer
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;