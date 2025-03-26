# 단위 테스트의 필요성 

단위 테스트는 개별 컴포넌트나 함수의 기능을 검증하여 어플리케이션의 신뢰성을 보장하는 작업이다.
단위 테스트의 강점은 여러가지로 이점은 여러가지가 있지만 다음과 같이 요약할 수 있다.

* 버그 방지: 코드 변경이나 추가 시 발생할 수 있는 버그를 사전에 찾아낼 수 있다.
* 리팩토링 용이: 안전하게 코드를 리팩토링 할 수 있으며, 예상치 못한 사이드 이펙트를 줄일 수 있다.
* 테스트 시간 절약: 자동화된 테스트는 수동 테스트에 비해 시간을 크게 절약해준다.
* 코드 품질 보장: 테스트를 통해 코드의 안정성과 품질을 유지하몀, 더 나은 코드 설계를 하기위한 촉진제 역활을 할 수 있다.

# 테스팅 도구

리액트 프로젝트에서 테스팅 도구로는 크게 React Testing Library와 Jest를 주로 쓰는데, 
React Testing Library와 Jest는 둘 다 테스팅 도구이지만, 각각이 주로 다루는 테스팅 영역과 접근 방식에는 차이가 있다.

각 기술에 대한 설명과 목적성은 다음과 같다. 

## 1.React Testing Library
React Testing Library는 리액트 컴포넌트를 테스트하는 데에 주로 사용되는 라이브러리이다. 
이 라이브러리는 사용자 관점에서 테스트를 수행할 수 있게 도와주며, 주로 DOM 요소의 존재 및 이벤트 핸들링과 같은 사용자 인터랙션을 테스트한다. 
또한, 간편한 API를 제공하여 더 직관적이고 사용자 친화적인 테스트 케이스 작성이 가능하다는 장점이 있다.

### [테스팅 영역과 접근 방식]

* <strong>사용자 중심의 테스트</strong>: React Testing Library는 사용자 경험을 중심으로 한 테스트 작성을 강조한다. 즉, 사용자가 보고 상호 작용할 수 있는 것만 테스트하는 것을 목적으로 한다.
* <strong>컴포넌트 렌더링 및 인터랙션 테스트</strong>: 주로 컴포넌트가 올바르게 렌더링되고, 사용자 인터랙션(클릭, 입력 등)에 대해 예상대로 반응하는지를 테스트 한다.

## 2.Jest
Jest는 Facebook이 개발한 광범위한 테스트 라이브러리로, 유닛 테스트 뿐만 아니라 통합 테스트까지 수행할 수 있다.
Jest는 빠른 실행 속도와 유연한 설정 옵션을 제공하며, 모의(Mocking) 기능과 스냅샷 테스팅이라는 강력한 기능을 통해 테스트의 복잡성을 줄이고, 복잡한 상황에서도 높은 테스트 커버리지를 달성할 수 있다.

### [테스팅 영역과 접근 방식]

* <strong>다양한 범위의 테스트 지원</strong>: Jest는 유닛 테스트뿐만 아니라 통합 테스트, 스냅샷 테스트 등도 지원하는 종합적인 테스트 라이브러리이다.
* <strong>모킹과 스냅샷 테스트 기능</strong>: Jest는 함수나 모듈을 모킹할 수 있는 기능을 제공하여, 복잡한 의존성을 가진 코드의 테스트를 용이하게 하며, 스냅샷 테스트를 통해 UI의 변화를 쉽게 추적하게 해준다.
* <strong>테스트 수행 속도 및 성능 최적화</strong>: Jest는 병렬 테스트 실행 기능을 통해 빠른 테스트 수행 속도를 제공한다.

## 예시코드

위에 설명한 React Testing Library와 Jest의 활용을 간단한 예시코드를 보면서 정리하면 다음과같다. 

```javascript
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabled] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{counter}</h3>{" "}
        <div>
          <button
            data-testid="plus-button"
            onClick={() => setCounter((count) => count + 1)}
            disabled={disabled}
          >
            +
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
```

App 컴포넌트에 다음과같이 코드가 작성되어있다고 가정하면,
테스트 코드는 다음과 같은 형태로 작성될 수 있다.

```javascript

test("+버튼을 눌렀을때 텍스트가 1로 변하는지 테스트!", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("plus-button");
  fireEvent.click(buttonElement);
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent(1); 
});
```

## [React Testing Library]:
이 코드에서 RTL는 App 컴포넌트를 렌더링하고, DOM 요소를 선택하고, 사용자 상호작용을 시뮬레이션 하는데 사용된다.<br/>
RTL의 역활은 크게 3가지 순서로 진행되고 다음과같다.

<strong>1.컴포넌트 렌더링</strong>: RTL의 render 함수를 사용하여 App 컴포넌트를 렌더링한다.<br/>
이 함수는 React 컴포넌트를 테스트 환경에 마운트시킨다.
  
```javascript
render(<App />);
```

<strong>2.요소 선택</strong>: RTL의 screen 객체를 사용하여 DOM에서 특정 요소를 선택한다.<br/> 
이는 데이터 테스트 ID 속성을 사용하여 요소를 쉽게 찾을 수 있게 해준다.
  
```javascript
const buttonElement = screen.getByTestId("plus-button");
const counterElement = screen.getByTestId("counter");
```

<strong>3.사용자 이벤트 시뮬레이션</strong>: RTL의 fireEvent 함수를 사용하여 버튼 클릭 이벤트를 시뮬레이션한다.<br/>
이 함수를 사용하면, 단위 테스트에서 사용자의 상호작용을 재현할 수 있다.
  
```javascript
fireEvent.click(buttonElement);
```

## [Jest]:
Jest는 테스트를 구조화하고 단언을 수행하는 데 사용된다. 위 테스트 코드에서 Jest가 활용된 부분을 살펴보면

<strong>1.테스트 구조화</strong>: Jest의 test 함수를 사용하여 개별 테스트 케이스를 정의한다. <br/>
이 함수는 테스트의 설명 문자열과 테스트 로직을 포함하는 콜백 함수를 인자로 받는다.
  
```javascript
test("+버튼을 눌렀을때 텍스트가 1로 변하는지 테스트!", () => { ... });
```

<strong>2.단언</strong>:  Jest의 expect 함수와 toHaveTextContent 매처를 사용하여 특정 조건이 충족되는지 검증한다. <br/>
여기서는 counterElement가 텍스트 내용으로 "1"을 포함하고 있는지 검사한다.
  
```javascript
expect(counterElement).toHaveTextContent(1);
```

UI 상호 작용 없이 Jest만을 사용하여 유닛 테스트를 수행하는 것은 예시코드는 다음과 같다.

```javascript
test('단순 산술 테스트', () => {
  expect(1 + 1).toBe(2);
});
```

이 단순한 테스트는 유틸리티 함수나 모델과 같은 순수 자바스크립트 로직을 테스트할 때, UI 컴포넌트 렌더링이 필요 없이 Jest의 단언 기능을 보여준다.

## 요약

React Testing Library는 컴포넌트를 렌더링하고 사용자처럼 상호 작용한다(클릭 등).<br/>
Jest는 테스트 케이스와 단언을 정의하고, 그러한 상호 작용의 결과를 확인하는데 사용된다

## Mocking API Test

Mocking API 테스트는 실제 백엔드 API를 가짜(mock) API로 대체하여 프론트엔드나 클라이언트 코드를 테스트하는 방법이다.
이런 방식은 API 응답의 형태나 동작을 정확히 알고 있는 상황에서, 프론트엔드의 동작을 검증하거나 UI 개발할때 많이 사용한다.
Mocking 테스트의 장점은 다음으로 요약할 수 있다.


* 비용 및 시간 절약:<br/>
실제 서버와 통신할 필요가 없기 때문에 테스트 속도가 빨라진다. 이로 인해 테스트 실행 비용과 시간을 절약할 수 있다.

* 시뮬레이션:<br/>
특정한 API 응답을 조작하여 예상치 못한 상황이나 오류 상황, 그리고 다양한 엣지 케이스를 쉽게 시뮬레이션 할 수 있다.

* 백엔드와의 독립성:<br/>
백엔드와 독립적으로 프론트엔드는 Mocking API를 통해 독립적으로 테스트와 개발을 진행할 수 있다.


## MSW
![react-msw-01](https://github.com/FE-SW/StudyUnitTest/assets/54196723/59f74079-c3ad-4068-aec2-f63fe98c80b1)
MSW (Mock Service Worker)는 브라우저와 Node.js 환경에서 API 목킹을 가능하게 하는 라이브러리이다. 실제 네트워크 요청을 가로채어 사용자가 정의한 응답을 반환하는 방식으로 동작한다.
API 통신 과정이 필요한 프론트엔드 개발과정에서 백엔드 의존성 없이 실제 요청과 유사한 모킹작업으로 프론트엔드를 테스트하거나 개발할 수 있다.

## 2가지 방법

MSW를 이용해 Mocking 테스트 하는 방법은 크게 2가지로 나뉘는데 바로 브라우저 통합 방식과 노드와 통합 방식이다.
각 방식의 차이점은 다음과 같다.

## [브라우저 통합]
브라우저와 통합 방식은 MSW(Mock Service Worker)를 사용하여 개발 환경의 브라우저 내에서 실제 네트워크 요청을 가로채고, 미리 정의된 응답을 반환하는 방법이다. 이를 통해 백엔드 서버 없이도 API 응답을 모방하여 프론트엔드 개발과 테스팅을 진행할 수 있다. <br/>

해당 방식의 단계는 다음과 같다.

### 1.핸들러 작성
핸들러 작성은 MSW를 사용하여 API 요청의 특정 경로와 메서드에 대한 가상의 응답을 정의하는 과정이다. 이 핸들러는 rest 객체의 메서드 (get, post, put 등)를 사용하여 요청 경로와 콜백 함수를 연결하여 작성된다. 콜백 함수 내에서는 가상의 응답 데이터와 상태 코드를 반환할 수 있다. 이렇게 정의된 핸들러는 후속 단계에서 서비스 워커에 등록되어 실제 네트워크 요청을 가로채는 데 사용된다.

```javascript
// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.example.com/user', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: 'Raphael',
      })
    );
  }),
];
```

### 2.서비스워커 생성
서비스워커 생성은 MSW가 제공하는 setupWorker 함수를 사용하여 앞서 정의한 핸들러들을 바탕으로 서비스 워커 인스턴스를 생성하는 과정이다. 이 생성된 서비스 워커는 브라우저에서 동작하며, 웹 애플리케이션과 네트워크 사이에서 중간자 역할을 하여 API 요청을 가로채고 핸들러에 정의된 가상의 응답을 반환한다. 생성 후에는 브라우저에 등록후 start 메서드를 호출하여 서비스 워커를 활성화해야 동작한다.

```javascript
// src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

### 3.생성한 서비스 워커 브라우저에 등록
생성한 서비스 워커 브라우저에 등록은 MSW의 start 함수를 호출하는 단계입이다. 이 함수는 내부적으로 서비스 워커를 브라우저에 등록하고, 해당 서비스 워커가 웹 애플리케이션의 네트워크 요청을 가로챌 수 있게 설정한다. 등록 후, 서비스 워커는 브라우저 내에서 백그라운드에서 동작하며, 정의된 핸들러를 사용해 요청에 대한 모의 응답을 제공한다.

```javascript
// src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

## [노드와 통합(Jest 테스트 환경)]
노드와 통합은 서버 측 환경에서 MSW를 사용하여 API를 모킹하는 방법을 의미한다. Jest와 같은 테스트 러너를 사용하여 테스트를 실행할 때 MSW는 실제 API 호출 대신 모킹된 응답을 반환하여, 실제 서버 없이 API와의 상호작용을 테스트할 수 있게 한다.
노드 환경에서의 MSW 사용은 서비스 워커 대신 setupServer 함수를 통해 직접적으로 요청을 가로채어 핸들러를 실행시키는 방식으로 동작합니다.
<br/>

해당 방식의 단계는 다음과 같다.

### 1.핸들러 작성
핸들러 작성은 MSW를 사용하여 API 요청의 특정 경로와 메서드에 대한 가상의 응답을 정의하는 과정이다. 이 핸들러는 rest 객체의 메서드 (get, post, put 등)를 사용하여 요청 경로와 콜백 함수를 연결하여 작성된다. 콜백 함수 내에서는 가상의 응답 데이터와 상태 코드를 반환할 수 있다.

```javascript
// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.example.com/user', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: 'Raphael',
      })
    );
  }),
];
```

### 2.서버 생성
서버 생성은 MSW의 setupServer 함수를 사용하여 테스트용 서버를 초기화하는 것을 포함하여 이전에 작성한 API 핸들러를 이 서버에 연결하게 된다. 그리고 테스트를 시작하기 전에 서버를 활성화하며 (listen 메서드 호출), 테스트가 종료된 후에는 서버를 비활성화(close 메서드 호출)하여 리소스를 정리한다.

```javascript
// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

### 3.API mocking 설정
MSW를 사용하여 API mocking을 설정하고 관리하기 위한 Jest 테스트 라이프사이클 훅을 사용한다. 
* beforeAll: 테스트 시작 전에 가상 서버를 활성화(listen) 한다.
* afterEach: 각 테스트 후에는 설정된 핸들러를 초기화(resetHandlers)하여 다음 테스트에 영향을 주지 않게 한다.
* afterAll: 모든 테스트가 완료된 후에는 서버를 비활성화(close)하여 리소스를 정리한다.

```javascript
// src/setupTests.js
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

```

### 요약 
#### 브라우저 통합:
* 1.핸들러 작성: 원하는 API 요청에 대한 응답을 정의 <br/>
* 2.서비스 워커 생성: MSW 라이브러리를 사용하여 mock 서비스 워커를 생성 <br/>
* 3.브라우저 등록: 생성된 서비스 워커를 브라우저에 등록하여, 실제 API 요청 대신 모킹된 응답을 사용하도록 설정 <br/>
* 4.동작 확인: 웹 애플리케이션을 브라우저에서 실행하여 모킹된 API 응답이 잘 동작하는지 확인

#### 노드 통합:
* 1.핸들러 작성: 원하는 API 요청에 대한 응답을 정의 <br/>
* 2.서버 생성: MSW를 사용하여 가상의 서버를 생성 <br/>
* 3.API 모킹 설정: 가상 서버를 활성화(listen)하고, 테스트 후 핸들러를 초기화(resetHandlers), 모든 테스트가 완료된 후에는 서버를 비활성화(close) <br/>
* 4.테스트 실행: Jest를 사용하여 테스트를 실행하며, 실제 API 대신 모킹된 응답을 사용하여 테스트

## MSW 이용한 유닛 테스트

MSW를 활용하여 가상 서버를 세팅하고, API 모킹을 통해 리액트 컴포넌트의 랜더링 전과 후 상황을 테스트하는 코드는 아래와 같다

```javascript
// Posts.js
import React, { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

export default Posts;
```

```javascript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Posts from './Posts';

const mockPosts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
];

const server = setupServer(
  rest.get('http://localhost:5000/posts', (req, res, ctx) => {
    return res(ctx.json(mockPosts));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders posts', async () => {
  render(<Posts />);
  
  // 초기에는 해당 포스트가 화면에 없는거 검증
  expect(screen.queryByText('Post 1')).toBeNull();
  expect(screen.queryByText('Post 2')).toBeNull();
  
  // API 응답 후에 해당 포스트가 화면에 있는거 검증
  await waitFor(() => expect(screen.getByText('Post 1')).toBeInTheDocument());
  expect(screen.getByText('Post 2')).toBeInTheDocument();
});

```

* waitFor:
비동기적인 DOM 업데이트를 기다리기 위해 사용되는 RTL의 유틸리티 함수이다. 이 함수는 주어진 콜백이 에러 없이 실행될 때까지 기다리며, 주로 비동기적인 UI 업데이트를 테스트할 때 사용된다.


## 참고
* https://testing-library.com/docs/
* https://jestjs.io/docs/getting-started#using-typescript
* https://techblog.woowahan.com/8942/
* https://mswjs.io/docs/
* https://blog.mathpresso.com/msw%EB%A1%9C-api-%EB%AA%A8%ED%82%B9%ED%95%98%EA%B8%B0-2d8a803c3d5c
