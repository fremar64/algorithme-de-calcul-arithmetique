import { Alert, AlertDescription } from "@/components/ui/alert";

interface FinalMessageProps {
  score: number;
  isComplete: boolean;
}

export const getFinalMessage = (score: number): string => {
  if (score === 10) {
    return "Performance très satisfaisante !";
  } else if (score >= 8) {
    return "Performance satisfaisante !";
  } else if (score >= 5) {
    return "Performance insuffisante !";
  } else {
    return "Performance très insuffisante !";
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