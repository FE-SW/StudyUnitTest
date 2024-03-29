import { render, screen, fireEvent } from "@testing-library/react";
import App from './App';


test('the counter starts at 0', () => { //test:jest 개별테스트 수행 <-> 그룹화:describe
  render(<App />);//render = dom의 컴포넌트를 렌더하는 함수(인자로 react컴포넌트가 들어감)
  
  const counterElement = screen.getByTestId("counter")//screen = 원하는 element에 접근해주는 객체 //getByTestId(query함수)=요소를 찾기위한 방법//
  
  expect(counterElement).toHaveTextContent(0)  //jest의 expect와 matcher //test id가 counter인 요소를 찾아서 해당text 0 예측
                                               //counterElement = <h3 data-testid="counter">{counter}</h3> //toBe는 counterElement와 같음 toHaveTextContent사용
});

//마이너스 버튼 테스트
test("minus button has correct text", () => {
  render(<App />);
  const minusButtonElement = screen.getByTestId("minus-button");
  expect(minusButtonElement).toHaveTextContent("-");
});
//플러스 버튼 테스트
test("plus button has correct text", () => {
  render(<App />);
  const plusButtonElement = screen.getByTestId("plus-button");
  expect(plusButtonElement).toHaveTextContent("+");
});


//유저가 발생시키는 액션이벤트에 대한 테스트는 fireEvent으로 진행
//플러스 버튼 클릭스 count증가 했나 테스트
test("When the + button is pressed, the counter changes to 1", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("plus-button");
  fireEvent.click(buttonElement);
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent(1); 
});

//유저가 발생시키는 액션이벤트에 대한 테스트는 fireEvent으로 진행
//플러스 버튼 클릭스 count감소 했나 테스트
test("When the - button is pressed, the counter changes to -1", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("minus-button");
  fireEvent.click(buttonElement);
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent(-1);
});

//버튼 css요소 테스트
test("on/off button has blue color", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("on/off-button");
  expect(buttonElement).toHaveStyle({ backgroundColor: "blue" });
});

// on/off버튼 클릭시  -,+ 버튼 작동,불작동 테스트
test("Prevent the -,+ button from being pressed when the on/off button is cliecked", () => {
  render(<App />);
  const onOffButtonElement = screen.getByTestId("on/off-button");
  fireEvent.click(onOffButtonElement);
  const plusButtonElement = screen.getByTestId("plus-button");
  const minusButtonElement = screen.getByTestId("minus-button");
  expect(plusButtonElement).toBeDisabled();
  expect(minusButtonElement).toBeDisabled();
});

//test.only = 따른테스트케이스 제외하고 이것만 테스트
//test.skip = 해당테스트만 제외하고 테스트

//https://testing-library.com/docs/queries/about/#priority 쿼리우선순위
//https://github.com/testing-library/react-testing-library
//https://jestjs.io/docs/getting-started
//https://github.com/facebook/jest
