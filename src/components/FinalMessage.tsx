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
    <div className="mt-4 text-center">
      <p className="text-lg font-semibold">{getFinalMessage(score)}</p>
    </div>
  );
};

export default FinalMessage;