<template></template>
<script>
export default {
  head() {
    return {
      title: "SoleSearch: Buy, Sell & Bid on Authentic Sneakers",
      meta: [
        {
          hid: "sneaker-page-description",
          name: "description",
          content:
            "Shop the latest sneakers & streetwear from Nike, Adidas, Reebok, Asics, Yeezy, Air Jordans & more at the best price. Authenticated & delivered to your door.",
        },
      ],
      script: [
        {
          type: "text/javascript",
          defer: true,
          async: true,
          id: "hs-script-loader",
          src: "//js-na1.hs-scripts.com/21973152.js",
        },
      ],
    };
  },
};
</script>
