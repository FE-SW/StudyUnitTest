import { render, screen } from "../../../test-utils";
import { server } from "../../../mocks/server";
import Type from "../Type";
import { rest } from "msw";

//상품이미지 테스트확인(Products.js 안 img)
//getby: 쿼리에 일치하는 노드를 반환하고 요소가없거나 둘이상이면 오류발생
//queryby:쿼리에 일치하는 노드를 반환하고 요소가없으면 null반환 둘이상이면 오류발생
//findby" 쿼리에 일치하는 요소를 발견하면 promise를 반환(ByRole,TestId)
test("displays product images from server", async () => {
  render(<Type orderType="products" />);

  // 이미지 찾기
  const productImages = await screen.findAllByRole("img", {
    name: /product$/i, //product 이름으로 끝나는 데이터들(ima alt)
  });
  //product imgae 갯수확인
  expect(productImages).toHaveLength(2);

  const altText = productImages.map((element) => element.alt); //(ima alt)
  //product imgae 상품명 확인
  expect(altText).toEqual(["America product", "England product"]);
});



//상품옵션 테스트확인
test("fetch option information from server", async () => {
  render(<Type orderType="options" />);

  // 체크박스 가져오기
  const optionCheckboxes = await screen.findAllByRole("checkbox");

  expect(optionCheckboxes).toHaveLength(2);
});


//서버에서 에러발생시 에러문구
test("when fetching product datas, face an error", async () => {
  server.resetHandlers( //에러발생시 핸들러 리셋시킴
    rest.get("http://localhost:5000/products", (req, res, ctx) => {
     return res(ctx.status(500));
    })
  );

  render(<Type orderType="products" />);  

  const errorBanner = await screen.findByTestId("error-banner"); //ErrorBanner(data-testid="error-banner")
  expect(errorBanner).toHaveTextContent("에러가 발생했습니다.")
});
