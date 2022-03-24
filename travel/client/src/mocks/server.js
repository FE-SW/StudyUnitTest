import { setupServer } from "msw/node";
import { handlers } from "./handlers";
export const server = setupServer(...handlers)



// mocking server 생성 : 백엔드에서 데이터를 가져오는부분을 테스트하기위해 
// mock service worker라는것으로 요청처리하고 모의응답을보냄
// 요청을 보냈을때 서버안에 있는 핸들러로 가게되어있음