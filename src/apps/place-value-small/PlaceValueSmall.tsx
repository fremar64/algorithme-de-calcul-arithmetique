import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import NumberTable from './components/NumberTableSmall';
import QuestionDisplay from '@/components/QuestionDisplay';
import FinalMessage from '@/components/FinalMessage';
import ScoreDisplay from '@/components/ScoreDisplay';

const PLACE_VALUES = {
  2: "centaines",
  1: "dizaines",
  0: "unités"
};

const PlaceValueSmall = () => {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currentNumber, setCurrentNumber] = useState('');
  const [userDigits, setUserDigits] = useState<string[]>([]);
  const [placeValue, setPlaceValue] = useState('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const generateQuestion = () => {
    // Generate a random number between 100 and 999
    const digits = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));
    if (digits[0] === 0) digits[0] = Math.floor(Math.random() * 9) + 1; // Ensure first digit isn't 0
    
    const number = digits.join('');
    const formattedNumber = number;
    
    const placeValueIndex = Math.floor(Math.random() * 3);
    
    setCurrentNumber(formattedNumber);
    setPlaceValue(PLACE_VALUES[placeValueIndex]);
    setCorrectAnswer(digits[digits.length - 1 - placeValueIndex].toString());
    setAnswer('');
    setMessage('');
    setAttempts(0);
    setUserDigits(Array(3).fill(''));
  };

  useEffect(() => {
    generateQuestion();
  }, [questionNumber]);

  const handleDigitInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...userDigits];
    newDigits[index] = value;
    setUserDigits(newDigits);
  };

  const handleAnswerSubmit = () => {
    if (!answer) {
      setMessage("Il faut saisir une réponse !");
      return;
    }

    if (answer === correctAnswer) {
      if (attempts === 0) {
        setScore(score + 1);
        setMessage("Bravo !");
      } else {
        setMessage("Bien ! Tu as corrigé ton erreur !");
      }

      if (questionNumber === 10) {
        setIsComplete(true);
      } else {
        setTimeout(() => {
          setQuestionNumber(questionNumber + 1);
        }, 1500);
      }
    } else {
      if (attempts === 0) {
        setMessage("Faux ! Encore un essai !");
        setAttempts(1);
      } else {
        setMessage("Regarde bien la correction...");
        setAnswer(correctAnswer);
        setTimeout(() => {
          if (questionNumber < 10) {
            setQuestionNumber(questionNumber + 1);
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
    setAnswer('');
    setMessage('');
    setAttempts(0);
    setUserDigits(Array(3).fill(''));
    generateQuestion();
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="bg-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <img 
            src="/ceredis.png" 
            alt="Ceredis Logo" 
            className="h-12 w-auto"
          />
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-gray-700">
              Position des chiffres : nombres inférieurs à 1000
            </h1>
            <p className="text-sm text-gray-600">
              Question N°{questionNumber} : Place des chiffres dans un nombre
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <NumberTable 
          number={currentNumber}
          onDigitInput={handleDigitInput}
          userInputMode={true}
          userDigits={userDigits}
        />

        <QuestionDisplay
          number={currentNumber}
          placeValue={placeValue}
          answer={answer}
          onAnswerChange={setAnswer}
        />

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

        <div className="text-center">
          <ScoreDisplay score={score} questionNumber={questionNumber} />
          <FinalMessage score={score} isComplete={isComplete} />
        </div>
      </div>
    </div>
  );
};

export default PlaceValueSmall;