<template>
  <div class="wishlist__wrapper">
    <Header />
    <TheSideNav />
    <p class="wishlist__wrapper-count" v-if="sneakersData.wishlistLength != 0">
      My Wishlist&nbsp; <span>{{ sneakersData.wishlistLength }} items</span>
    </p>
    <section class="p-0" v-if="sneakersData.wishlistLength != 0">
      <sneaker :sneakersData="sneakersData.wishlist" />
    </section>
    <signupack
      class="ack"
      :heading="heading"
      :description="description"
      :msg="msg"
      :href="href"
      :src="src"
      v-else
    />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import TheSideNav from "@/components/TheSidenav.vue";
import sneaker from "~/components/wishlist/WishlistSneaker.vue";
export default {
  data() {
    return {
      description: "Explore and shortlist some items.",
      msg: "Explore Collection",
      href: "/products",
      heading: "Your wishlist is empty!",
      src: "sad-face2x.png",
      alt: "Wishlist login",
    };
  },
  components: {
    Header,
    Footer,
    TheSideNav,
    sneaker,
  },
  // middleware: ["check-auth"],

  async asyncData(context) {
    try {
      const query = context.query.query;
      //get method for particular user.
      const result = await axios({
        url: "/wish-list",
        headers: {
          Authorization:
            "Bearer " + context.store.getters["authentication/idToken"],
        },
        method: "get",
      });
      context.store.commit(
        "sneakersData/getWishlistedSneakers",
        result.data.wish_list
      );
      return {
        numberOfItems: result.data.wish_list.length,
        page: result.data.page,
        numberOfPages: result.data.nbPages,
      };
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    sneakersData() {
      return this.$store.getters["sneakersData/getWishlistedSneakers"];
    },
    token() {
      return this.$store.getters["authentication/idToken"];
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.token && vm.$route.params.id == "user-wishlist") next();
      else {
        vm.$router.replace(from);
      }
    });
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.wishlist__wrapper {
  &-count {
    max-width: 136.6rem;
    margin: 3rem auto;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    color: $primary;
    span {
      font-weight: normal;
    }
    @media screen and (max-width: 1400px) {
      padding: 0 5%;
    }
    @media screen and (max-width: 992px) {
      text-align: center;
    }
  }
  .p-0 {
    background-color: $base-grey;
    @media screen and (max-width: 1400px) {
      padding: 0 5% !important;
    }
    @media screen and (max-width: 400px) {
      padding: 0 1rem !important;
    }
  }
}
</style>