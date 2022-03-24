import "@testing-library/jest-dom";

import { server } from "./mocks/server";

beforeAll(() => server.listen()); //테스트 전에 서버를 시작

afterEach(() => server.resetHandlers()); //하나하나 테스트 이후에 핸들러들을 reset시켜줌

afterAll(() => server.close()); // 모든테스트 종료후 서버를 닫음


//api mocking설정
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom