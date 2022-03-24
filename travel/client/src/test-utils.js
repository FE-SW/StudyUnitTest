import { render } from "@testing-library/react";
import { OrderContextProvider } from "./contexts/OrderContext";

const customRender = (ui, options) =>  //ui:jsx // wrapper에 context provider 적용 //
    render(ui, {wrapper: OrderContextProvider, ...options})

export * from '@testing-library/react' // testing-library 에 render함수말고 다른부분도 export함(screen 등등)

export {customRender as render} //render함수만 customRender로 override시킴

//test코드에서 context를 실행하기 위한 작업 //wrapper로 감싸주기 ->custom render