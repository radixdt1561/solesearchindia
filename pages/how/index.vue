<template>
  <div>
    <Header />
    <TheSideNav />
    <div>
      <img width="100%" src="~assets/images/banners/how/1.png" alt="banner" />
      <img width="100%" src="~assets/images/banners/how/2.png" alt="banner" />
      <img width="100%" src="~assets/images/banners/how/3.png" alt="banner" />
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
      script: [
        {
          type: 'text/javascript',
          defer: true,
          async: true,
          id: "hs-script-loader",
          src: "//js-na1.hs-scripts.com/21973152.js"
        }
      ]
    }
  }
};
</script>
<style lang="scss" scoped></style>
