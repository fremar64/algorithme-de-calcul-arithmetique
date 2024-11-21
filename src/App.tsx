import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Addition from "./apps/addition/Index";
import Subtraction from "./apps/subtraction/Subtraction";
import SubtractionCP2 from "./apps/subtraction-cp2/SubtractionCP2";
import SubtractionCE1 from "./apps/subtraction-ce1/SubtractionCE1";
import SubtractionCM1 from "./apps/subtraction-cm1/SubtractionCM1";
import PlaceValue from "./apps/place-value/PlaceValue";
import PlaceValueSmall from "./apps/place-value-small/PlaceValueSmall";
import NumberWriting from "./apps/number-writing/NumberWriting";
import NumberWritingCE1 from "./apps/number-writing-ce1/NumberWritingCE1";
import NumberWritingCP2 from "./apps/number-writing-cp2/NumberWritingCP2";
import NumberWritingCM1 from "./apps/number-writing-cm1/NumberWritingCM1";
import NumberWritingCM2 from "./apps/number-writing-cm2/NumberWritingCM2";
import MultiplicationCE2 from "./apps/multiplication-ce2/MultiplicationCE2";
import MultiplicationCE1 from "./apps/multiplication-ce1/MultiplicationCE1";
import OrderingNumbersCP1 from "./apps/ordering-numbers-cp1/OrderingNumbersCP1";
import OrderingNumbersCP2 from "./apps/ordering-numbers-cp2/OrderingNumbersCP2";
import OrderingNumbersCE1 from "./apps/ordering-numbers-ce1/OrderingNumbersCE1";
import OrderingNumbersCE2 from "./apps/ordering-numbers-ce2/OrderingNumbersCE2";
import OrderingNumbersCM1 from "./apps/ordering-numbers-cm1/OrderingNumbersCM1";
import OrderingNumbersCM2 from "./apps/ordering-numbers-cm2/OrderingNumbersCM2";
import RecompositionNumbersCP2 from "./apps/recomposition-numbers-cp2/RecompositionNumbersCP2";
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
          <Route path="/subtraction-cp2" element={<SubtractionCP2 />} />
          <Route path="/subtraction-ce1" element={<SubtractionCE1 />} />
          <Route path="/subtraction-cm1" element={<SubtractionCM1 />} />
          <Route path="/place-value" element={<PlaceValue />} />
          <Route path="/place-value-small" element={<PlaceValueSmall />} />
          <Route path="/number-writing" element={<NumberWriting />} />
          <Route path="/number-writing-ce1" element={<NumberWritingCE1 />} />
          <Route path="/number-writing-cp2" element={<NumberWritingCP2 />} />
          <Route path="/number-writing-cm1" element={<NumberWritingCM1 />} />
          <Route path="/number-writing-cm2" element={<NumberWritingCM2 />} />
          <Route path="/multiplication-ce2" element={<MultiplicationCE2 />} />
          <Route path="/multiplication-ce1" element={<MultiplicationCE1 />} />
          <Route path="/ordering-numbers-cp1" element={<OrderingNumbersCP1 />} />
          <Route path="/ordering-numbers-cp2" element={<OrderingNumbersCP2 />} />
          <Route path="/ordering-numbers-ce1" element={<OrderingNumbersCE1 />} />
          <Route path="/ordering-numbers-ce2" element={<OrderingNumbersCE2 />} />
          <Route path="/ordering-numbers-cm1" element={<OrderingNumbersCM1 />} />
          <Route path="/ordering-numbers-cm2" element={<OrderingNumbersCM2 />} />
          <Route path="/recomposition-numbers-cp2" element={<RecompositionNumbersCP2 />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;