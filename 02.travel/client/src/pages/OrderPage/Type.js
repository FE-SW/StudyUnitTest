import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Products from "./Products";
import Options from "./Options";
import ErrorBanner from "../../components/ErrorBanner";
import { OrderContext } from "../../contexts/OrderContext";

//orderType = products , options
function Type({ orderType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDatas, updateItemCount] = useContext(OrderContext); //context api// orderDatas: { ...orderCounts, totals }
                                                                               // updateItemCount:  updateItemCount
  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`http://localhost:5000/${orderType}`); //msw get request 
      setItems(response.data); //msw response data
    } catch (error) { 
      setError(true); 
    }
  }
  if (error) { 
    return <ErrorBanner message="에러가 발생했습니다." />; //서버에서 데이터 가져올떄 에러발생시 에러처리 테스트
  }

  const ItemComponents = orderType === "products" ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, orderType)}
    />
  ));

  let orderTypeKorean = orderType === "products" ? "상품" : "옵션";
  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>
         {orderTypeKorean} 총 가격: {orderDatas.totals[orderType]}{/* orderContext에서 가져오 totals 출력 */}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" && "column",
        }}
      >
        {optionItems}
      </div>
    </>
  );
}

export default Type;
