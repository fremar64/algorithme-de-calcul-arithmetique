import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import NumberTable from '@/components/NumberTable';
import FinalMessage from '@/components/FinalMessage';
import ScoreDisplay from '@/components/ScoreDisplay';

const NumberWriting = () => {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currentNumber, setCurrentNumber] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const generateNumber = () => {
    const max = 100000;
    const min = 1;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  useEffect(() => {
    setCurrentNumber(generateNumber());
  }, [questionNumber]);

  const handleAnswerSubmit = () => {
    if (!userAnswer) {
      setMessage("Il faut saisir une réponse !");
      return;
    }

    const correctAnswer = currentNumber.replace(/\s/g, '');
    if (userAnswer === correctAnswer) {
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
          if (questionNumber < 10) {
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
    setCurrentNumber(generateNumber());
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
              Exercice n°{questionNumber} : Écrire les nombres entiers en chiffres
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <NumberTable 
          number={currentNumber}
          onDigitInput={() => {}}
          userInputMode={false}
        />

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <p className="text-lg">
              Le nombre <span className="text-xl font-semibold text-blue-600">{currentNumber}</span> s'écrit en chiffres :
            </p>
            <input
              type="text"
              className="w-40 h-10 px-3 border rounded"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
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

export default NumberWriting;