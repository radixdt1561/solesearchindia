<template>
  <div>
    <Header />
    <TheSideNav />
    <div class="terms">
      <h1 class="text-center" style="font-size: 4rem">FAQ</h1>
      <ol>
        <li style="font-size: 24px"><strong>What is the usual delivery time for products?</strong></li>
        <span style="font-size: 16px">
          Our products are delivered within around 10-15 working days from the date of placing the order.
        </span>
        <li style="font-size: 24px"><strong>How can I become a seller/list a product on your website?</strong></li>
        <span style="font-size: 16px">
          - Sign up and Create an account with us<br />
          - Go to your profile and click on <strong>'Sell Now'</strong><br />
          - Search for the sneaker you want to sell, select the size and add your desired ask.<br />
          - Your listing will be approved and live within 2 hours.<br />
          For more details you can refer to our become a seller page <a href="https://www.solesearchindia.com/seller">(link)</a>
        </span>
        <li style="font-size: 24px"><strong>How do I track my order?</strong></li>
        <span style="font-size: 16px">
          Once the product is shipped/dispatched from our Authentication Centre, you will receive an email with your tracking details via Shiprocket & SoleSearch on your registered Email address.
        </span>
        <li style="font-size: 24px"><strong>When will my order be shipped?</strong></li>
        <span style="font-size: 16px">
          SoleSearch Guarantee ensures that your shipments get to you safely. It usually takes about 15 working days to receive the product once the order has been placed. The seller first ships the product to our authentication center where it is verified, and it is then shipped to your delivery address after passing all necessary checks.
        </span>
        <li style="font-size: 24px"><strong>Do you allow the return or exchange of sneakers?</strong></li>
        <span style="font-size: 16px">
          All sales from SoleSearch are final. For further details, you can visit our return/refund policy <a href="https://www.solesearchindia.com/refunds">page.</a>
        </span>
        <li style="font-size: 24px"><strong>Do you allow the return or exchange of streetwear/apparel?</strong></li>
        <span style="font-size: 16px">
          Every brand has a different policy for exchange and return of their products. For more details, you can visit our return/policy <a href="https://www.solesearchindia.com/refunds">page.</a>
        </span>
        <li style="font-size: 24px"><strong>Are your products brand new and authentic?</strong></li>
        <span style="font-size: 16px">
          Every product sold on SoleSearch website is brand new(DS) and 100 percent Authentic. Our Authentication Team follows a strict Authentication process and makes sure all sneakers are legit/authentic before shipping them to customers.
        </span>
        <li style="font-size: 24px"><strong>Do you offer Cash On Delivery?</strong></li>
        <span style="font-size: 16px">
          We only accept prepaid payments. You can browse through our various payment options which are all completed through our providers RazorPay.
        </span>
        <li style="font-size: 24px"><strong>Will my cards be saved on your website?</strong></li>
        <span style="font-size: 16px">
          No, we do not save any of your card details. Moreover, all transactions are processed by our payment service providers, RazorPay, via a secure gateway.
        </span>
        <li style="font-size: 24px"><strong>Can I buy from SoleSearch on EMI?</strong></li>
        <span style="font-size: 16px">
          Yes, we offer multiple EMI options through our payment provider Razorpay.
        </span>
        <li style="font-size: 24px"><strong>Which shipping service do you use?</strong></li>
        <span style="font-size: 16px">
          Shipping service is subject to the serviceability of your Pin code. The products are shipped through Shiprocket, Delhivery, Fedex, Blue Dart and more.
        </span>
        <li style="font-size: 24px"><strong>Do I need to pay Custom Duty on my order?</strong></li>
        <span style="font-size: 16px">
          No. All products are shipped from our warehouse in India so you don't have to pay custom duty or any additional charges.
        </span>
        <li style="font-size: 24px"><strong>How long will it take for me to get my payout?</strong></li>
        <span style="font-size: 16px">
          You will get your payout 48-72hours after your product is delivered to the authentication centre.
        </span>
      </ol>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import TheSideNav from "@/components/TheSidenav.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    TheSideNav,
    Footer,
  },
  head() {
    return {
      title: "FAQ: Frequently asked questions",
      meta: [
        {
          hid: "faq-page-description",
          name: "description",
          content:
            "Get help with Frequently asked questions when buying or selling on Solesearch.",
        },
      ],
      script: [
        {
          type: 'text/javascript',
          defer: true,
          async: true,
          id: "hs-script-loader",
          src: "//js-na1.hs-scripts.com/21973152.js"
        }
      ]
    };
  },
};
</script>
<style lang="scss" scoped>
.terms {
  margin-top: 2rem;
  padding: 1rem;
}
</style>
