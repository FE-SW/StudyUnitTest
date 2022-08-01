import { createContext, useState, useMemo, useEffect } from "react";

export const OrderContext = createContext(); //주문에관한 context 생성

const pricePerItem = { 
  products: 1000,
  options: 500,
};

function calculateSubtotal(orderType, orderCounts) { //타입에따라 총가격 계산
  let optionCount = 0;
  console.log(orderCounts[orderType].values())
  for (const count of orderCounts[orderType].values()) { //["america",10],["england",12]  일경우 optionCount = 22 
    optionCount += count;
  }
  return optionCount * pricePerItem[orderType];   
}


export function OrderContextProvider(props) { //더 복잡한 로직을 구현하기 위해서 provider를 위한 함수생성
  const [orderCounts, setOrderCounts] = useState({ //상품,옵션 각 갯수
    products: new Map(), //map:간단한 키와 값을 서로 매핑시켜 저장,저장된 순서대로 각 요소들을 반복적으로 접근 ["america",1] 
    options: new Map(),
  });

  const [totals, setTotals] = useState({ //총가격 
    products: 0, 
    options: 0,
    total: 0,
  });

  useEffect(() => { //총가격 계산 : 주문수량이 바뀔때마다 실행 
    const productsTotal = calculateSubtotal("products", orderCounts);
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productsTotal + optionsTotal; 
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]); 


  const value = useMemo(() => { //value 바뀌면 provider안에있는 모든컴포넌트가 랜더링을 다시함->성능상 안좋음
    
    function updateItemCount(itemName, newItemCount, orderType) {//상품 수량 업데이트함수//상품이름(product,option),상품갯수,상품종류 
      const newOrderCounts = { ...orderCounts };
      const orderCountsMap = orderCounts[orderType]; //product or option
      orderCountsMap.set(itemName, parseInt(newItemCount)); //set을 이용해 map을 업데이트 (상품이름,상품수량)
      setOrderCounts(newOrderCounts);
    }

    const resetOrderDatas = () => {//상품주문 초기화 (주문완료하고 첫페이지 이동시)
      setOrderCounts({
        products: new Map(), //map:키와 값으르 서로 연결시켜 저장,저장된 순서대로 각 요소에 반복적 접근가능
        options: new Map(),
      });
    };

    return [{ ...orderCounts, totals }, updateItemCount, resetOrderDatas]; //{주문갯수(상품,옵션) , 전체가격},상품 업데이트함수
  }, [orderCounts, totals]); //dependency가 변할때만 함수작동
  

  return <OrderContext.Provider value={value} {...props} />; //provider로 감싸야 각 컴포넌트에서 데이터,데이터업데이트함수를 사용가능함
  //value값이 복잡하기떄문에 app.js에서 provider를 정의하는거보다 여기서 정의하고 app.js에서 불러와서 사용

}
