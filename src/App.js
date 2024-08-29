import React, { useState, useEffect } from 'react';
import './demo.css';

const URL = "https://api.exchangerate-api.com/v4/latest/USD";

// Country list with currency and country codes
const countryList = {
  AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
};

function Demo() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [rates, setRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
  }, []);

  const handleConversion = () => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount(amount * rate);
      setShowResult(true); 
    }
  };

  const renderDropdown = (selectedCurrency, setSelectedCurrency) => (
    <select
      className='choose'
      value={selectedCurrency}
      onChange={(e) => setSelectedCurrency(e.target.value)}
    >
      <option value="">Select a currency</option>
      {Object.keys(countryList).map((currencyCode) => (
        <option key={currencyCode} value={currencyCode}>
          {currencyCode}
        </option>
      ))}
    </select>
  );

  return (
    <div className='container'>
      <h2>Currency Converter</h2>
      <form>
        <div className='amount'>
          <p>Enter amount:</p>
          <input
            className='amount-input'
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className='dropdown'>
          <div className='from'>
            <p>From</p>
            <div className='dropdown-container'>
              {renderDropdown(fromCurrency, setFromCurrency)}
              {fromCurrency && (
                <img
                  src={`https://flagcdn.com/24x18/${countryList[fromCurrency].toLowerCase()}.png`}
                  alt={fromCurrency}
                  className="flag-icon"
                />
              )}
            </div>
          </div>

          <div className='to'>
            <p>To</p>
            <div className='dropdown-container'>
              {renderDropdown(toCurrency, setToCurrency)}
              {toCurrency && (
                <img
                  src={`https://flagcdn.com/24x18/${countryList[toCurrency].toLowerCase()}.png`}
                  alt={toCurrency}
                  className="flag-icon"
                />
              )}
            </div>
          </div>
        </div>

        <button type='button' onClick={handleConversion}>Convert</button>
      </form>

      {showResult && convertedAmount !== null && (
        <div className='result'>
          <p>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
}

export default Demo;
