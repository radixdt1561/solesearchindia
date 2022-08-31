export default () => {
  const utils = {
    removeProductDuplicates(products) {
      if (products.hits.hits) {
        const names = products.hits.hits.map(
          sneaker => sneaker.slug
        );
        const formattedData = products.hits.hits.filter(
          (val, index) => !names.includes(val.slug, index + 1)
        );
        return formattedData;
      } else {
        return [];
      }
    },
    getOriginalProductPrice(price) {
      if (typeof price === 'string' || price instanceof String) {
        price = parseFloat(price);
      }
      return Math.ceil(price - Math.ceil(0.10 * price));
    },
    formatPrice(price) {
      return parseInt(price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    sellingFee: 0.1,
    debounce(fn, delay) {
      var timeoutID = null;
      return function() {
        clearTimeout(timeoutID);
        var args = arguments;
        var that = this;
        timeoutID = setTimeout(function() {
          fn.apply(that, args);
        }, delay);
      };
    }
  };

  return utils;
};
