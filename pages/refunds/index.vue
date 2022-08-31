<template>
  <div>
    <Header />
    <TheSideNav />
    <div class="terms">
      <h1 class="text-center" style="font-size: 4rem;">
        Refund Policy / Returns
      </h1>
      <div style="font-size:16px;margin-top:24px;margin-bottom:32px">
        <p>
          ALL SALES ARE FINAL ONCE THE PRODUCT IS AUTHENTICATED AND DELIVERED.
        </p>
        <p>
          Your Ask or Bid cannot be cancelled once it has been accepted. This
          policy is in place to ensure that every Bid and Ask is genuine,
          active, and dependable in the marketplace.
        </p>
        <p>
          Remember that on the opposite side of the transaction, there is a
          buyer or a seller who is counting on it to be completed. When you post
          a Bid or an Ask for an item on Solesearch, you are agreeing to
          complete the transaction if one occurs. We encourage our customers to
          resell your item once it has been received and fulfils the condition
          standards if you no longer want it.
        </p>
        <p>
          In case the item purchased is deemed fake or not in a condition to be
          delivered. You will be refunded within 24 hours after the
          authentication is complete.
        </p>
      </div>
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
    Footer
  },
  head() {
    return {
      title: "FAQ: Frequently asked questions",
      meta: [
        {
          hid: "faq-page-description",
          name: "description",
          content:
            "Get help with Frequently asked questions when buying or selling on Solesearch."
        }
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
  }
};
</script>
<style lang="scss" scoped>
.terms {
  margin-top: 2rem;
  padding: 1rem;
}
</style>
