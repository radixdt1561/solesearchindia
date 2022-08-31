<template>
  <div>
    <Header />
    <TheSideNav />
    <signupack
      class="ack"
      :heading="heading"
      :description="description"
      :msg="msg"
      :href="href"
      :src="src"
    />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import TheSideNav from "@/components/TheSidenav.vue";
import signupack from "@/components/signupack.vue";
export default {
  data() {
    return {
      description: "Login to view items in your wishlist.",
      msg: "Log In",
      href: "/login",
      heading: "Please Log In",
      src: "wishlist@2x.png",
      alt: "Wishlist login",
    };
  },
  components: {
    Header,
    Footer,
    TheSideNav,
    signupack,
  },
  middleware: ["check-auth"],

  computed: {
    token() {
      return this.$store.getters["authentication/idToken"];
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if(vm.token) vm.$router.replace(`/wishlist/user-wishlist`)
      // if (vm.token) vm.$router.push(`/wishlist/${vm.token}`);
    });
  },
};
</script>