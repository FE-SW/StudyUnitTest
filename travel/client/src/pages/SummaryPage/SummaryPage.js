import React, { useState, useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";

const SummaryPage = ({ setStep }) => {
  const [orderDatas] = useContext(OrderContext);
  const [checked, setChecked] = useState(false);

  const productArray = Array.from(orderDatas.products); //map->array 변환
  const productList = productArray.map(([key, value]) => ( //상품 주문 나열
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions = orderDatas.options.size > 0;
  let optionsRender = null;
  if (hasOptions) {
    const optionsArray = Array.from(orderDatas.options.keys()); //map->array 변환
    const optionList = optionsArray.map((key) => <li key={key}>{key}</li>); //옵션 주문 나열
    optionsRender = (
      <>
        <h2>옵션: {orderDatas.totals.options}</h2>
        <ul>{optionList}</ul>
      </>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(2); //완료페이지 이동
  };

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDatas.totals.products}</h2> {/*product 총가격 */}
      <ul>{productList}</ul>
      {optionsRender}
      <form onSubmit={handleSubmit}>
        <input type="checkbox" id="confirm-checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)}  />
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type="submit">
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
