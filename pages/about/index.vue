<template>
  <div>
    <Header />
    <TheSideNav />
    <div class="terms">
      <h1 class="text-center" style="font-size: 4rem;">About Us</h1>
      <p style="font-size:16px;margin-top:24px;margin-bottom:32px">
        SoleSearch is India’s leading marketplace for limited edition and high
        demand Sneakers, Streetwear, Accessories and Collectibles. We connect
        Buyers with sellers from across the country, ensuring that all items are
        100% authentic and provide a safe buying experience for our users.
      </p>
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
