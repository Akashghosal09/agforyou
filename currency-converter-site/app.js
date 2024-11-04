const apiKeys = {
    openExchange: 'YOUR_OPEN_EXCHANGE_RATES_KEY',
    currencyLayer: 'YOUR_CURRENCY_LAYER_KEY',
    exchangeRateAPI: 'YOUR_EXCHANGE_RATE_API_KEY',
  };
  
  // Initialize dropdowns and conversion functionality
  document.addEventListener("DOMContentLoaded", async () => {
    const baseDropdown = document.getElementById("base");
    const targetDropdown = document.getElementById("target");
  
    // Fetch currency list from Open Exchange Rates (any provider for the list)
    const currencies = await fetchCurrencies();
    populateDropdown(baseDropdown, currencies);
    populateDropdown(targetDropdown, currencies);
  
    document.getElementById("convertButton").addEventListener("click", convertCurrency);
  });
  
  async function fetchCurrencies() {
    try {
      const response = await fetch(`https://openexchangerates.org/api/currencies.json?app_id=${apiKeys.openExchange}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching currency list:", error);
    }
  }
  
  // Populate dropdown with currency list
  function populateDropdown(dropdown, currencies) {
    for (const code in currencies) {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = `${code} - ${currencies[code]}`;
      dropdown.appendChild(option);
    }
  }
  
  // Perform currency conversion based on selected provider
  async function convertCurrency() {
    const provider = document.getElementById("provider").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const base = document.getElementById("base").value;
    const target = document.getElementById("target").value;
  
    if (!amount || !base || !target) {
      document.getElementById("result").textContent = "Please fill in all fields.";
      return;
    }
  
    try {
      let rate = await getConversionRate(provider, base, target);
      let convertedAmount = (amount * rate).toFixed(2);
      document.getElementById("result").textContent = `${amount} ${base} = ${convertedAmount} ${target}`;
    } catch (error) {
      document.getElementById("result").textContent = "Error in conversion.";
    }
  }
  
  // Fetch conversion rate based on provider
  async function getConversionRate(provider, base, target) {
    let url;
  
    switch (provider) {
      case 'openExchange':
        url = `https://openexchangerates.org/api/latest.json?app_id=${apiKeys.openExchange}`;
        break;
      case 'currencyLayer':
        url = `https://api.currencylayer.com/live?access_key=${apiKeys.currencyLayer}`;
        break;
      case 'exchangeRateAPI':
        url = `https://v6.exchangerate-api.com/v6/${apiKeys.exchangeRateAPI}/latest/${base}`;
        break;
        case 'freecurrencyAPI':
        url = `https://api.freecurrencyapi.com/v1/status?apikey=fca_live_bKlVbFs6Q8R1ArDu2ltWqkipaqtzhhgXKAKwIGyf`;
        break;
      default:
        throw new Error("Provider not supported");
    }
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (provider === 'freecurrencyAPI') {
      return data.conversion_rates[target];
    } else {
      const rateBaseUSD = data.rates[base];
      const rateTargetUSD = data.rates[target];
      return rateTargetUSD / rateBaseUSD;
    }
  }
  