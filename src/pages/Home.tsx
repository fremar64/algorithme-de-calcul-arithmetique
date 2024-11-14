import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="bg-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4 max-w-2xl mx-auto">
          <img 
            src="/ceredis.png" 
            alt="Ceredis Logo" 
            className="h-12 w-auto"
          />
          <h1 className="text-xl font-semibold text-gray-700">
            Exercices de mathématiques
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/addition">
            <Button className="w-full h-32 text-lg">
              Additions posées
            </Button>
          </Link>
          <Link to="/subtraction">
            <Button className="w-full h-32 text-lg">
              Soustractions posées
            </Button>
          </Link>
          <Link to="/place-value">
            <Button className="w-full h-32 text-lg">
              Position des chiffres
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;