import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbExchange } from "react-icons/tb";
import { BsTrash } from "react-icons/bs";
import { getCurrency } from "../src/actions/index.js";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import "../src/CurrencyChange.css";

const CurrencyChange = () => {
  const dispatch = useDispatch();

  const currencyData = useSelector((state) => state.currency);
  console.log(currencyData.blue, "hi ");

  const [peso, setPeso] = useState(0.0);
  const [blue, setBlue] = useState(0.0);

  const [currencyBox, setCurrency] = useState(true);

  useEffect(() => {
    dispatch(getCurrency());
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
    <div className="currency-container">
      <h4 className="styleTitle">Operación de cambio</h4>
      <div className="currency-converter">
        <div className="col">
          <div>
            {" "}
            <span>
              Tipo de cambio <strong>compra</strong> es:{" "}
              {currencyData.blue ? currencyData.blue.value_buy : ""}
            </span>
          </div>
          <div>
            <span>
              Tipo de cambio <strong>venta</strong> es:{" "}
              {currencyData.blue ? currencyData.blue.value_sell : ""}
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
                placeholder="S/ 0"
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

        <div className="col">
          {currencyBox ? (
            <div className="col">
              <p>
                {" "}
                <strong>Envio </strong>
                <span>
                  $.{" "}
                  {peso === undefined || peso === isNaN || peso === ""
                    ? Number.parseFloat(0.0).toFixed(2)
                    : Number.parseFloat(peso).toFixed(2)}{" "}
                  peso{" "}
                </span>
              </p>
              <p>
                {" "}
                <strong> Recibo</strong>{" "}
                <span>
                  {" "}
                  $
                  {blue === undefined || blue === isNaN || blue === ""
                    ? Number.parseFloat(0.0).toFixed(2)
                    : Number.parseFloat(blue).toFixed(2)}{" "}
                  dolares
                </span>
              </p>
            </div>
          ) : (
            <div className="col">
              <p>
                {" "}
                <strong>Envío </strong>
                <span>
                  $.{" "}
                  {blue === undefined || blue === isNaN || blue === ""
                    ? 0
                    : Number.parseFloat(blue).toFixed(2)}{" "}
                  dolares{" "}
                </span>
              </p>
              <p>
                {" "}
                <strong>Recibo </strong>
                <span>
                  {" "}
                  $
                  {peso === undefined || peso === isNaN || peso === ""
                    ? 0
                    : Number.parseFloat(peso).toFixed(2)}{" "}
                  peso
                </span>
              </p>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyChange;
