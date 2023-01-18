import { useState, useEffect } from "react";
import { TbExchange } from "react-icons/tb";
import { BsTrash } from "react-icons/bs";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import '../src/CurrencyChange.css';

const CurrencyChange = ({ }) => {
  const tipoDeCambio = 3.8263;
  const cambioVenta = 3.8463;
  const [soles, setSoles] = useState(0.0);
  const [usd, setUsd] = useState(0.0);
  const [currencyBox, setCurrency] = useState(true);

  useEffect(() => {
  }, []);
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

  function handleConvertSoles(e) {
    e.preventDefault();
    e.target.value.split(",").join("");
    setUsd(e.target.value.split(",").join("") / tipoDeCambio);
    setSoles(e.target.value.split(",").join(""));
    console.log(typeof soles);
  }

  function handleConvertUsd(e) {
    e.preventDefault();
    e.target.value.split(",").join("");
    setSoles(e.target.value.split(",").join("") * tipoDeCambio);
    setUsd(e.target.value.split(",").join(""));
  }

  function handleOption(e) {
    // COL IZQ
    if (e.target.name === "left") {
      console.log("primer if izq," + e.target.name);
      if (e.target.value === "usd") {
        setCurrency(false);
      } else {
        setCurrency(true);
      }
    } else {
      if (e.target.value === "usd") {
        setCurrency(true);
      } else {
        setCurrency(false);
      }
    }
  }

 
  function handleReset() {
    setSoles(0);
    setUsd(0);
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
              {Number.parseFloat(tipoDeCambio).toFixed(2)}
            </span>
          </div>
          <div>
            <span>
              Tipo de cambio <strong>venta</strong> es:{" "}
              {Number.parseFloat(cambioVenta).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="currency-box">
          {currencyBox ? (
            <div className="currency-form currency-from">
              <MaskedInput
                mask={maskText}
                value={soles === 0 ? "" : soles}
                onChange={(e) => handleConvertSoles(e)}
                placeholder="S/ 0"
                className="maskStyle"
              />
              <br />
              <select name="left" value="soles" onChange={handleOption}>
                <option value="soles">Soles</option>
                <option value="usd">Dolares</option>
              </select>
            </div>
          ) : (
            <div className="currency-form currency-to">
              <MaskedInput
                mask={maskText}
                value={usd === 0 ? "" : usd}
                onChange={(e) => handleConvertUsd(e)}
                placeholder="$ 0"
                className="maskStyle"
              />
              <br />
              <select name="left" value="usd" onChange={handleOption}>
                <option value="usd">Dolares</option>
                <option value="soles">Soles</option>
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
                value={usd === 0 ? "" : usd}
                onChange={(e) => handleConvertUsd(e)}
                placeholder="$ 0"
                className="maskStyle"
              />
              <br />
              <select name="right" value="usd" onChange={handleOption}>
                <option value="usd">Dolares</option>
                <option value="soles">Soles</option>
              </select>
            </div>
          ) : (
            <div className="currency-form currency-to">
              <MaskedInput
                mask={maskText}
                value={soles === 0 ? "" : soles}
                onChange={(e) => handleConvertSoles(e)}
                placeholder="S/ 0"
                className="maskStyle"
              />
              <br />
              <select name="right" value="soles" onChange={handleOption}>
                <option value="soles">Soles</option>
                <option value="usd">Dolares</option>
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
                  S/.{" "}
                  {soles === undefined || soles === isNaN || soles === ""
                    ? Number.parseFloat(0.0).toFixed(2)
                    : Number.parseFloat(soles).toFixed(2)}{" "}
                  soles{" "}
                </span>
              </p>
              <p>
                {" "}
                <strong> Recibo</strong>{" "}
                <span>
                  {" "}
                  $
                  {usd === undefined || usd === isNaN || usd === ""
                    ? Number.parseFloat(0.0).toFixed(2)
                    : Number.parseFloat(usd).toFixed(2)}{" "}
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
                  S/.{" "}
                  {usd === undefined || usd === isNaN || usd === ""
                    ? 0
                    : Number.parseFloat(usd).toFixed(2)}{" "}
                  dolares{" "}
                </span>
              </p>
              <p>
                {" "}
                <strong>Recibo </strong>
                <span>
                  {" "}
                  $
                  {soles === undefined || soles === isNaN || soles === ""
                    ? 0
                    : Number.parseFloat(soles).toFixed(2)}{" "}
                  soles
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

