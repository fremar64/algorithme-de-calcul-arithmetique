import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addition from "./apps/addition/Index";
import Subtraction from "./apps/subtraction/Subtraction";
import PlaceValue from "./apps/place-value/PlaceValue";
import PlaceValueSmall from "./apps/place-value-small/PlaceValueSmall";
import NumberWriting from "./apps/number-writing/NumberWriting";
import NumberWritingCE1 from "./apps/number-writing-ce1/NumberWritingCE1";
import NumberWritingCP2 from "./apps/number-writing-cp2/NumberWritingCP2";
import NumberWritingCM1 from "./apps/number-writing-cm1/NumberWritingCM1";
import NumberWritingCM2 from "./apps/number-writing-cm2/NumberWritingCM2";
import MultiplicationCE2 from "./apps/multiplication-ce2/MultiplicationCE2";
import MultiplicationCE1 from "./apps/multiplication-ce1/MultiplicationCE1";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addition" element={<Addition />} />
          <Route path="/subtraction" element={<Subtraction />} />
          <Route path="/place-value" element={<PlaceValue />} />
          <Route path="/place-value-small" element={<PlaceValueSmall />} />
          <Route path="/number-writing" element={<NumberWriting />} />
          <Route path="/number-writing-ce1" element={<NumberWritingCE1 />} />
          <Route path="/number-writing-cp2" element={<NumberWritingCP2 />} />
          <Route path="/number-writing-cm1" element={<NumberWritingCM1 />} />
          <Route path="/number-writing-cm2" element={<NumberWritingCM2 />} />
          <Route path="/multiplication-ce2" element={<MultiplicationCE2 />} />
          <Route path="/multiplication-ce1" element={<MultiplicationCE1 />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;