import { useState } from "react";
import OrderPage from "./pages/OrderPage/OrderPage";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
import CompletePage from "./pages/CompletePage/CompletePage";
import { OrderContextProvider } from "./contexts/OrderContext";

function App() {
  const [step, setStep] = useState(0);
  return (
    <div style={{ padding: "4rem" }}>
      <OrderContextProvider> 
        {step === 0 && <OrderPage setStep={setStep} />}
        {step === 1 && <SummaryPage setStep={setStep} />}
        {step === 2 && <CompletePage setStep={setStep} />}
      </OrderContextProvider>
    </div>
  );
}

export default App;

//provider로 감싸야 각 컴포넌트에서 데이터,데이터업데이트함수를 사용가능함
