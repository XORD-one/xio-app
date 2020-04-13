var priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})


export const formattedNum = (number, usd = false) => {
    if (isNaN(number) || number === '') {
      return ''
    }
    let num = parseFloat(number)
    if (num === 0) {
      return 0
    }
    if (num < 0.0001) {
      return '< 0.0001'
    }
  
    if (num > 1000) {
      return Number(parseFloat(num).toFixed(0)).toLocaleString()
    }
  
    if (usd) {
      if (num < 0.01) {
        return Number(parseFloat(num).toFixed(4))
      }
      let usdString = priceFormatter.format(num)
      return usdString.slice(1, usdString.length)
    }
    return Number(parseFloat(num).toFixed(4))
  }
  

export const getCurrentGasPrices = async () => {
  const res = await fetch('https://ethgasstation.info/json/ethgasAPI.json');
  const response = await res.json();
  const prices = {
      low: response.safeLow / 10,
      medium: response.average / 10,
      high: response.fast / 10,
  };
  return prices;
};