import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import Type from "../Type";
import OrderPage from "../OrderPage";

//상품 총가격 테스트
test.only("update product's total when products change", async () => {
  render(<Type orderType="products" />);

  const productsTotal = screen.getByText("상품 총 가격:", { exact: false }); //정확이 "상품 총 가격:" 문자열을 잡는게 아니므로 exact: false
  expect(productsTotal).toHaveTextContent("0");

  // 아메리카 여행 상품 한개 올리기
  const americaInput = await screen.findByRole("spinbutton", {//getby 대신 findby인 이유는 서버에서 데이터를 가져온후 엘레멘트를 가질수있기 떄문에
    name: "America",
  });
  userEvent.clear(americaInput); //타입을주기전에 1번 clear해줌: input이나,textarea 선택한후 제거해줌
  userEvent.type(americaInput, "1");

  console.log('use', productsTotal.textContent);
  expect(productsTotal).toHaveTextContent("1000"); //1개를 올리면 총가격 1000
});

//옵션 총가격 테스트
test("update option's total when options change", async () => {
  render(<Type orderType="options" />);

  const optionsTotal = screen.getByText("옵션 총 가격:", { exact: false });
  expect(optionsTotal).toHaveTextContent("0");

  //옵션1 추가
  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent("500");

  //옵션2 추가
  const dinnerCheckbox = await screen.findByRole("checkbox", {
    name: "Dinner",
  });
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("1000");

  //옵션2 제거
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("500");
});


//상품+옵션 총가격 
describe("total price of goods and options", () => {
  //상품이 하나 더할떄 total price 변경
  test("total price starts with 0 and Updating total price when adding one product", async () => {
    render(<OrderPage />);

    const total = screen.getByText("Total Price:", { exact: false });
    expect(total).toHaveTextContent("0");

    //america product 추가
    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");

    expect(total).toHaveTextContent("1000");
  });

  //옵션 하나 더할때 total price 변경
  test("Updating total price when adding one option", async () => {
    render(<OrderPage />);
    const total = screen.getByText("Total Price:", { exact: false });

    //insurance 옵션 추가
    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent("500");
  });

  //옵션,상품 없앨때 total price 변경
  test("Updating total price when removing option and product", async () => {
    render(<OrderPage />);
    const total = screen.getByText("Total Price:", { exact: false });

    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    userEvent.click(insuranceCheckbox); //옵션1개

    const americaInput = await screen.findByRole("spinbutton", { //spinbutton = 작명
      name: "America",
    });
    userEvent.clear(americaInput);   
    userEvent.type(americaInput, "3");

    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1"); //상품1개

    expect(total).toHaveTextContent("1500");
  });
});
