import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import NumberTable from '@/components/NumberTable';
import FinalMessage from '@/components/FinalMessage';
import ScoreDisplay from '@/components/ScoreDisplay';
import { Input } from "@/components/ui/input";

const RecompositionNumbersCP2 = () => {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currentNumber, setCurrentNumber] = useState({ tens: 0, ones: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [userDigits, setUserDigits] = useState<string[]>([]);

  const generateNumber = () => {
    const tens = Math.floor(Math.random() * 9) + 1; // 1-9
    const ones = Math.floor(Math.random() * 10); // 0-9
    return { tens, ones };
  };

  useEffect(() => {
    const newNumber = generateNumber();
    setCurrentNumber(newNumber);
    setUserDigits(Array(12).fill(''));
  }, [questionNumber]);

  const handleAnswerSubmit = () => {
    if (!userAnswer) {
      setMessage("Il faut saisir une réponse !");
      return;
    }

    const correctAnswer = (currentNumber.tens * 10 + currentNumber.ones).toString();
    if (userAnswer === correctAnswer) {
      if (attempts === 0) {
        setScore(score + 1);
        setMessage("Bravo !");
      } else {
        setMessage("Bien ! Tu as corrigé ton erreur !");
      }

      if (questionNumber === 5) {
        setIsComplete(true);
      } else {
        setTimeout(() => {
          setQuestionNumber(questionNumber + 1);
          setUserAnswer('');
          setMessage('');
          setAttempts(0);
        }, 1500);
      }
    } else {
      if (attempts === 0) {
        setMessage("Faux ! Encore un essai !");
        setAttempts(1);
      } else {
        setMessage("Regarde bien la correction...");
        setUserAnswer(correctAnswer);
        setTimeout(() => {
          if (questionNumber < 5) {
            setQuestionNumber(questionNumber + 1);
            setUserAnswer('');
            setMessage('');
            setAttempts(0);
          } else {
            setIsComplete(true);
          }
        }, 2000);
      }
    }
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionNumber(1);
    setIsComplete(false);
    setUserAnswer('');
    setMessage('');
    setAttempts(0);
    const newNumber = generateNumber();
    setCurrentNumber(newNumber);
    setUserDigits(Array(12).fill(''));
  };

  const handleClearTable = () => {
    setUserDigits(Array(12).fill(''));
  };

  const handleDigitInput = (index: number, value: string) => {
    const newDigits = [...userDigits];
    newDigits[index] = value;
    setUserDigits(newDigits);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="bg-[#EEF2F5] p-4 mb-6">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <img 
            src="/ceredis.png" 
            alt="Ceredis Logo" 
            className="h-12 w-auto"
          />
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-gray-700">
              Exercice n°{questionNumber} : Décomposition des nombres entiers
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <NumberTable 
          number=""
          onDigitInput={handleDigitInput}
          userInputMode={true}
          userDigits={userDigits}
        />

        <div className="flex justify-end">
          <Button 
            onClick={handleClearTable}
            variant="outline"
            className="bg-gray-100"
          >
            Effacer
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <p className="text-lg">
              Le nombre ({currentNumber.tens} x 10) + {currentNumber.ones} est égal à :
            </p>
            <Input
              type="text"
              className="w-40 h-10 px-3"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              maxLength={3}
            />
          </div>

          {message && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-4">
            {!isComplete ? (
              <Button 
                onClick={handleAnswerSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                Valider
              </Button>
            ) : (
              <Button 
                onClick={handleRestart}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Recommencer
              </Button>
            )}
          </div>
        </div>

        <div className="text-center">
          <ScoreDisplay score={score} questionNumber={questionNumber} />
          <FinalMessage score={score} isComplete={isComplete} />
        </div>
      </div>
    </div>
  );
};

export default RecompositionNumbersCP2;