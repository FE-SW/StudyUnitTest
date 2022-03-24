import { rest } from "msw";

//mock service worker
//client에 보낼 데이터
// 핸들러 Type: Rest 또는 Graphql
//ttp method:get, post...
// req, 매칭 요청에 대한 정보;
// res, 모의 응답을 생성하는 기능적유틸리티;
// ctx, 모의 응답의 상태 코드, 헤더, 본문 등을 설정하는 데도움이 되는 함수 그룹입니다.

export const handlers = [
  rest.get("http://localhost:5000/products", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "America",
          imagePath: "/images/america.jpeg",
        },
        {
          name: "England",
          imagePath: "/images/england.jpeg",
        },
      ])
    );
  }),
  rest.get("http://localhost:5000/options", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Insurance",
        },
        {
          name: "Dinner",
        },
      ])
    );
  }),
  rest.post("http://localhost:5000/order", (req, res, ctx) => { //주문 api
    let dummyData = [{ orderNumber: 2131234324, price: 2000 }];
    return res(ctx.json(dummyData));
  }),
];
