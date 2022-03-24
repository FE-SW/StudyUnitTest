import SummaryPage from "../SummaryPage";
import { render, screen } from "../../../test-utils";

test("checkbox and button", () => {
  render(<SummaryPage />);

  //체크박스 내용,노체크 확인
  const checkbox = screen.getByRole("checkbox", {
    name: "주문하려는 것을 확인하셨나요?",
  });
  expect(checkbox.checked).toEqual(false);

  //확인버튼 내용,비활성화 확인
  const confirmButton = screen.getByRole("button", { name: "주문 확인" });
  expect(confirmButton.disabled).toBeTruthy();
});

//basic과 다르게 getByTestId가 아닌 getByRole