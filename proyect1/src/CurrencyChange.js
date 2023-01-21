import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbExchange } from "react-icons/tb";
import { BsTrash } from "react-icons/bs";
import {
  getCurrency,
  getListCountrys,
  getConvert,
} from "../src/actions/index.js";
import "../src/CurrencyChange.css";

const CurrencyChange = () => {
  const dispatch = useDispatch();
  const currencyData = useSelector((state) => state.currency);
  const listData = useSelector((state) => state.listCountrys.currencies);
  const fx = useSelector((state) => state.convertion);
  const [currencyBox, setCurrency] = useState(true);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [curr1, setCurr1] = useState("EUR");
  const [curr2, setCurr2] = useState("USD");

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = Number.parseFloat(amount * fx).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = Number.parseFloat(amount / fx).toFixed(2);
  }

  useEffect(() => {
    dispatch(getCurrency());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getListCountrys());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getConvert(curr1, curr2));
  }, [curr1, curr2]);

  function handleSwitch() {
    let keepCurr2 = curr2;
    let keepCurr1 = curr1;
    setCurr1(keepCurr2);
    setCurr2(keepCurr1);
  }

  function handelSelect1(e) {
    e.preventDefault();
    setCurr1(e.target.value);

    setAmountInFromCurrency(false);
  }

  function handelSelect2(e) {
    e.preventDefault();
    setCurr2(e.target.value);

    setAmountInFromCurrency(true);
  }

  function handleChangeFrom(e) {
    e.preventDefault();
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleChangeTo(e) {
    e.preventDefault();
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function handleReset() {
    setAmount(0);
  }
  return (
    <section>
      <div>
        <article>
          <div className="styleMe">
            <div>
              <h3>
                <a href="https://www.noriegabarbara.com/" target="_blank">Barbara Noriega</a>
              </h3>
              <p>Currency Converter App</p>
            </div>
          </div>
        </article>

        <div className="main">
          <div className="currency-container">
            <h4 className="styleTitle">Converter Calculator</h4>
            <h4 className="col">Exchange rate = {fx}</h4>
            <div className="currency-converter">
              <div className="currency-box">
                {currencyBox ? (
                  <div className="currency-form currency-from">
                    <input
                      value={fromAmount}
                      onChange={(e) => handleChangeFrom(e)}
                      placeholder="$ 0"
                      className="maskStyle"
                    />
                    <br />
                    <select
                      name="left"
                      onChange={handelSelect1}
                      value={curr1}
                      className="selectStyle"
                    >
                      {listData
                        ? Object.keys(listData)?.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                ) : (
                  <div className="currency-form currency-to">
                    <input
                      value={fromAmount}
                      onChange={(e) => handleChangeFrom(e)}
                      placeholder="$ 0"
                      className="maskStyle"
                    />
                    <br />
                    <select
                      name="left"
                      onChange={handelSelect1}
                      value={curr1}
                      className="selectStyle"
                    >
                      {listData
                        ? Object.keys(listData)?.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                )}
                <div className="iconStyle1">
                  <button className="iconStyle3" onClick={handleSwitch}>
                    <TbExchange />
                  </button>
                  <button className="iconStyle2" onClick={handleReset}>
                    <BsTrash />
                  </button>
                </div>

                {currencyBox ? (
                  <div className="currency-form currency-from">
                    <input
                      value={toAmount}
                      onChange={(e) => handleChangeTo(e)}
                      placeholder="$ 0"
                      className="maskStyle"
                    />
                    <br />
                    <select
                      name="right"
                      onChange={handelSelect2}
                      value={curr2}
                      className="selectStyle"
                    >
                      {listData
                        ? Object.keys(listData).map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                ) : (
                  <div className="currency-form currency-to">
                    <input
                      value={toAmount}
                      onChange={(e) => handleChangeTo(e)}
                      placeholder="$ 0"
                      className="maskStyle"
                    />
                    <br />
                    <select
                      name="right"
                      onChange={handelSelect2}
                      value={curr2}
                      className="selectStyle"
                    >
                      {listData
                        ? Object.keys(listData).map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrencyChange;
