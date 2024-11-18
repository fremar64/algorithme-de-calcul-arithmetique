import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import OrderModeSelector from './OrderModeSelector';
import DraggableNumber from './DraggableNumber';
import FinalMessage from '@/components/FinalMessage';
import ScoreDisplay from '@/components/ScoreDisplay';

interface OrderingGameProps {
  title: string;
  minNumber: number;
  maxNumber: number;
}

const OrderingGame = ({ title, minNumber, maxNumber }: OrderingGameProps) => {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [mode, setMode] = useState<"asc" | "desc">("asc");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const generateNumbers = () => {
    const nums = [];
    for (let i = 0; i < 5; i++) {
      nums.push(Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber);
    }
    setNumbers(nums);
  };

  useEffect(() => {
    generateNumbers();
  }, [questionNumber]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setNumbers((items) => {
        const oldIndex = items.findIndex((item) => item.toString() === active.id);
        const newIndex = items.findIndex((item) => item.toString() === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const checkOrder = () => {
    const sortedNumbers = [...numbers].sort((a, b) => mode === "asc" ? a - b : b - a);
    const isCorrect = numbers.every((num, index) => num === sortedNumbers[index]);

    if (isCorrect) {
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
          setMessage("");
          setAttempts(0);
        }, 1500);
      }
    } else {
      if (attempts === 0) {
        setMessage("Faux ! Encore un essai !");
        setAttempts(1);
      } else {
        setMessage("Regarde bien la correction...");
        setNumbers(sortedNumbers);
        setTimeout(() => {
          if (questionNumber < 10) {
            setQuestionNumber(questionNumber + 1);
            setMessage("");
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
    setMessage("");
    setAttempts(0);
    generateNumbers();
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="bg-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <img src="/ceredis.png" alt="Ceredis Logo" className="h-12 w-auto" />
          <h1 className="text-xl font-semibold text-gray-700">
            Exercice n°{questionNumber} : {title}
          </h1>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 space-y-6">
          <OrderModeSelector mode={mode} onModeChange={setMode} />

          <div className="bg-gray-100 p-4 rounded-lg">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={numbers.map(n => n.toString())} strategy={horizontalListSortingStrategy}>
                <div className="flex justify-center gap-4 mb-8">
                  {numbers.map((number) => (
                    <DraggableNumber key={number} id={number.toString()} number={number} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {message && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end">
            {!isComplete ? (
              <Button onClick={checkOrder} className="bg-green-600 hover:bg-green-700">
                Valider
              </Button>
            ) : (
              <Button onClick={handleRestart} className="bg-blue-600 hover:bg-blue-700">
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

export default OrderingGame;