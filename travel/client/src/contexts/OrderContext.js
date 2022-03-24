import { createContext, useState, useMemo, useEffect } from "react";

export const OrderContext = createContext();

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
  const [orderCounts, setOrderCounts] = useState({
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

  const value = useMemo(() => { //provider로 감싼 모든 component는 리랜더링함 , 따라서 orderCounts,totals 만 바꿀때만 리렌더링함
    
    function updateItemCount(itemName, newItemCount, orderType) {//상품 수량 업데이트함수//상품이름(product,option),상품갯수,상품종류 
      const newOrderCounts = { ...orderCounts };

      const orderCountsMap = orderCounts[orderType]; //product or option
      orderCountsMap.set(itemName, parseInt(newItemCount)); //set을 이용해 map을 업데이트 (상품이름,상품수량)

      setOrderCounts(newOrderCounts);
    }

    const resetOrderDatas = () => {//상품주문 초기화 (주문완료하고 첫페이지 이동시)
      setOrderCounts({
        products: new Map(),
        options: new Map(),
      });
    };

    return [{ ...orderCounts, totals }, updateItemCount, resetOrderDatas];
  }, [orderCounts, totals]);
  

  return <OrderContext.Provider value={value} {...props} />;

}
