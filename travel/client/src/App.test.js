import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

//주문 -> 주문확인-> 주문성공 
//findByRole:비동기
//getByRole:동기
test("From order to order completion", async () => {
  render(<App />);

  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, "2");

  const englandInput = await screen.findByRole("spinbutton", {
    name: "England",
  });
  userEvent.clear(englandInput);
  userEvent.type(englandInput, "3");

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  userEvent.click(insuranceCheckbox);

  const orderButton = screen.getByRole("button", {
    name: "주문하기",
  });
  userEvent.click(orderButton);

  ////////////////////   주문 확인 페이지   //////////////////
  const summaryHeading = screen.getByRole("heading", {
    name: "주문 확인",
  });
  expect(summaryHeading).toBeInTheDocument();//toBeInTheDocument: element가 이 document에 있는지 확인

  const productsHeading = screen.getByRole("heading", {
    name: "여행 상품: 5000",  //아메리카2 + 잉글랜드3
  });
  expect(productsHeading).toBeInTheDocument();

  const optionsHeading = screen.getByRole("heading", {
    name: "옵션: 500",        //보험 1
  });
  expect(optionsHeading).toBeInTheDocument();

  //아메리카,잉글랜드,보험 잘출력되는지
  expect(screen.getByText("2 America")).toBeInTheDocument();
  expect(screen.getByText("3 England")).toBeInTheDocument();
  expect(screen.getByText("Insurance")).toBeInTheDocument();

  const confirmCheckbox = screen.getByRole("checkbox", {
    name: "주문하려는 것을 확인하셨나요?",
  });
  userEvent.click(confirmCheckbox);

  //주문 확인메시지 체크후 주문확인 버튼 클릭가능
  const confirmOrderButton = screen.getByRole("button", {
    name: "주문 확인",
  });
  userEvent.click(confirmOrderButton);

  ////////////////////   주문 완료 페이지   //////////////////
  const loading = screen.getByText(/loading/i); //i 대소문자 구별x => 데이터를 아직 받지못했으면 로딩출력
  expect(loading).toBeInTheDocument();

  const completeHeader = await screen.findByRole("heading", {
    name: "주문이 성공했습니다.",
  });
  expect(completeHeader).toBeInTheDocument();

  const loadingDisappeared = screen.queryByText("loading"); //데이터를 받은이후 loading 문구는 없어졌는지 확인
  expect(loadingDisappeared).not.toBeInTheDocument();

  const firstPageButton = screen.getByRole("button", { //주문완료이후 첫페이지로 돌아가는 button
    name: "첫페이지로",
  });
  userEvent.click(firstPageButton);

  //첫페이지로 돌아갔을때 상품,옵션이 초기화된것을 테스트
  const productsTotal = screen.getByText("상품 총 가격: 0");
  expect(productsTotal).toBeInTheDocument();

  const optionsTotal = screen.getByText("옵션 총 가격: 0");
  expect(optionsTotal).toBeInTheDocument();

  // 둘중 하나 선택
  await waitFor(() => { 
    screen.getByRole("spinbutton", { name: "America" });
  });
  // await screen.findByRole("spinbutton", { name: "America" });
});
//이떄는 waitFor api를 이용해서 테스트가 끝나기 전에 컴포넌트가 다 업데이트 되기를 기다려 줘야 한다
//즉 테스트가 컴포넌트를 기다려줘야됨->첫페이지 컴포넌트를 테스트 해야되기떄문
//await wailtForElementToBeRemoved : 테스트 끝나기전에 컴포넌트가 사라지는걸 기다려줌