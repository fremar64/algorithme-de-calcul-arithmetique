import { Alert, AlertDescription } from "@/components/ui/alert";

interface FinalMessageProps {
  score: number;
  isComplete: boolean;
}

export const getFinalMessage = (score: number): string => {
  if (score === 5) {
    return "Bravo ! Performance très satisfaisante !";
  } else if (score === 4) {
    return "Bravo ! Performance satisfaisante !";
  } else if (score === 3) {
    return "Performance insuffisante ! Clique sur Recommencer.";
  } else if (score <= 2) {
    return "Performance très insuffisante ! Clique sur Recommencer.";
  } else {
    return ""; // Default case, should never happen
  }
};

const FinalMessage = ({ score, isComplete }: FinalMessageProps) => {
  if (!isComplete) return null;

  return (
    <Alert className="mt-4 max-w-2xl mx-auto">
      <AlertDescription>{getFinalMessage(score)}</AlertDescription>
    </Alert>
  );
};

export default FinalMessage;