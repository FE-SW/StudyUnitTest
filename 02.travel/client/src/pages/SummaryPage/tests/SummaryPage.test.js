import SummaryPage from "../SummaryPage";
import { render, screen } from "../../../test-utils";

test("checkbox and button", () => {
  render(<SummaryPage />);

  //체크박스 내용,노체크 확인
  const checkbox = screen.getByRole("checkbox", {
    name: "주문하려는 것을 확인하셨나요?",
  });
  expect(checkbox.checked).toEqual(false); //체크박스 초기상태는 false

  //체크박스 비활성화 -> 확인버튼 비활성화
  const confirmButton = screen.getByRole("button", { name: "주문 확인" }); 
  expect(confirmButton.disabled).toBeTruthy(); //checkbox 체크안할시 주문확인버튼 비활성화
});

//웬만하면 우선순위 높은getByRole query이용