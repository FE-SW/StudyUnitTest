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

* <strong>사용자 중심의 테스트</strong>: React Testing Library는 사용자 경험을 중심으로 한 테스트 작성을 강조한다. 즉, 사용자가 보고 상호 작용할 수 있는 것만 테스트하는 것을 목적으로 합니다.
* <strong>컴포넌트 렌더링 및 인터랙션 테스트</strong>: 주로 컴포넌트가 올바르게 렌더링되고, 사용자 인터랙션(클릭, 입력 등)에 대해 예상대로 반응하는지를 테스트합니다.

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
이 코드에서 RTL는 App 컴포넌트를 렌더링하고, 요소를 선택하여 단언을 수행하는데 사용된다.<br/>
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

## 결론 

React Testing Library는 컴포넌트를 렌더링하고 사용자처럼 상호 작용한다(클릭 등).<br/>
Jest는 테스트 케이스와 단언을 정의하고, 그러한 상호 작용의 결과를 확인하는데 사용된다

## 참고
* https://testing-library.com/docs/
* https://jestjs.io/docs/getting-started#using-typescript
* https://techblog.woowahan.com/8942/
