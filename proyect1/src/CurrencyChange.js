import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbExchange } from "react-icons/tb";
import { BsTrash } from "react-icons/bs";
import { getCurrency, getListCountrys } from "../src/actions/index.js";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import "../src/CurrencyChange.css";

const CurrencyChange = () => {
  const dispatch = useDispatch();

  const currencyData = useSelector((state) => state.currency);
  const listData = useSelector((state) => state.listCountrys.currencies);



  const [peso, setPeso] = useState(0.0);
  const [blue, setBlue] = useState(0.0);
  const [currencyBox, setCurrency] = useState(true);

  useEffect(() => {
    dispatch(getCurrency());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getListCountrys());
  }, [dispatch]);

  const maskText = createNumberMask({
    prefix: "",
    suffix: "",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ",",
    allowDecimal: true,
    decimalSymbol: ".",
    decimalLimit: 3, // how many digits allowed after the decimal
    integerLimit: 7, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
  });

  function handleConvertPeso(e) {
    e.preventDefault();
    e.target.value.split(",").join("");
    setBlue(e.target.value.split(",").join("") / currencyData.blue.value_sell);
    setPeso(e.target.value.split(",").join(""));
    console.log(typeof peso);
  }

  function handleConvertBlue(e) {
    e.preventDefault();
    e.target.value.split(",").join("");
    setPeso(e.target.value.split(",").join("") * currencyData.blue.value_sell);
    setBlue(e.target.value.split(",").join(""));
  }

  function handleOption(e) {
    // COL IZQ
    if (e.target.name === "left") {
      console.log("primer if izq," + e.target.name);
      if (e.target.value === "blue") {
        setCurrency(false);
      } else {
        setCurrency(true);
      }
    } else {
      if (e.target.value === "blue") {
        setCurrency(true);
      } else {
        setCurrency(false);
      }
    }
  }

  function handleReset() {
    setPeso(0);
    setBlue(0);
  }
  return (
    <section className="telephone">
      <div className="telephone__content">
        <article className="telephone__top">
          <div className="telephone__user">
            <div className="telephone__info">
              <h3 className="telephone__name">Barbara Noriega</h3>
              <p className="telephone__status">Currency Converter App</p>
            </div>
          </div>
        </article>

        <article className="telephone__main">
          <div className="currency-container">
            <h4 className="styleTitle">Converter Calculator</h4>
            <div className="currency-converter">
              <div className="col">
                <div>
                  <span>
                    Exchange rate =
                    {currencyData.blue ? currencyData.blue.value_buy : ""}
                  </span>
                </div>
              </div>

              <div className="currency-box">
                {currencyBox ? (
                  <div className="currency-form currency-from">
                    <MaskedInput
                      mask={maskText}
                      value={peso === 0 ? "" : peso}
                      onChange={(e) => handleConvertPeso(e)}
                      placeholder="$ 0"
                      className="maskStyle"
                    />
                    <br />
                    <select name="left" value="peso" onChange={handleOption}>
                      <option value="peso">Pesos</option>
                      <option value="blue">Blue</option>
                    </select>
                  </div>
                ) : (
                  <div className="currency-form currency-to">
                    <MaskedInput
                      mask={maskText}
                      value={blue === 0 ? "" : blue}
                      onChange={(e) => handleConvertBlue(e)}
                      placeholder="$ 0"
                      className="maskStyle"
                    />
                    <br />
                    <select name="left" value="blue" onChange={handleOption}>
                      <option value="blue">Blue</option>
                      <option value="peso">Pesos</option>
                    </select>
                  </div>
                )}
                <div className="iconStyle1">
                  <button
                    className="iconStyle3"
                    onClick={() => setCurrency(!currencyBox)}
                  >
                    <TbExchange />
                  </button>{" "}
                  <br />
                  <button className="iconStyle2" onClick={handleReset}>
                    <BsTrash />
                  </button>
                </div>

                {currencyBox ? (
                  <div className="currency-form currency-from">
                    <MaskedInput
                      mask={maskText}
                      value={blue === 0 ? "" : blue}
                      onChange={(e) => handleConvertBlue(e)}
                      placeholder="$ 0"
                      className="maskStyle"
                    />
                    <br />
                    <select name="right" value="blue" onChange={handleOption}>
                      <option value="blue">Blue</option>
                      <option value="peso">Pesos</option>
                    </select>
                  </div>
                ) : (
                  <div className="currency-form currency-to">
                    <MaskedInput
                      mask={maskText}
                      value={peso === 0 ? "" : peso}
                      onChange={(e) => handleConvertPeso(e)}
                      placeholder="$ 0"
                      className="maskStyle"
                    />
                    <br />
                    <select name="right" value="peso" onChange={handleOption}>
                      <option value="peso">Pesos</option>
                      <option value="blue">Blue</option>
                    </select>
                  </div>
                )}
              </div>

            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CurrencyChange;
