<template>
  <div>
    <Header @beOnSearchID="beOnSearchID" />
    <TheSideNav @beOnSearchID="beOnSearchID" />
    <Productdetail
      ref="productdetail"
      :singleSneakerData="singleSneakerData"
      :sneakersData="sneakersData.hits"
    />
    <Footer class="mt-4" />
  </div>
</template>
<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
import TheSideNav from "@/components/TheSidenav.vue";
import Productdetail from "@/components/Productdetail.vue";
export default {
  head() {
    const name = this.singleSneakerData.product_attributes.name || "Product";
    return {
      title: `SoleSearch: ${name}`,
      meta: [
        {
          hid: "specific-product-page-description",
          name: "description",
          content: `Buy and Sell Authentic ${name} at SoleSearch.`
        }
      ]
    };
  },
  data() {
    return {
      beOnProductDetails: false
    };
  },
  components: {
    Header,
    TheSideNav,
    Productdetail,
    Footer
  },
  middleware: ["check-auth"],
  async asyncData(context) {
    try {
      const result = await axios({
        url: `/product/${context.route.params.id}`,
        method: "get"
      });
      console.log('111111111111111',result);
      context.store.commit("sneakersData/getSingleSneakers", result.data);
      return {
        page: result.data.page,
        numberOfPages: result.data.nbPages
      };
    } catch (err) {
      let errorMessage =
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.error
          ? err.response.data
          : { message: "Something went wrong", error: true };
      context.store.dispatch(
        "notification_alert/updateNotification",
        errorMessage
      );
    }
  },
  computed: {
    sneakersData() {
      return this.$store.getters["sneakersData/getSneakersData"];
    },
    singleSneakerData() {
      return this.$store.getters["sneakersData/getSingleSneakersData"];
    },
    topCollections() {
      return this.$store.getters["sneakersData/getTopCollections"];
    },
    token() {
      return this.$store.getters["authentication/idToken"];
    },
    addresses() {
      return this.$store.getters["address/getAllAddress"];
    }
  },
  methods: {
    beOnSearchID(value) {
      if (value) {
        this.$refs.productdetail.beOnProductDetails();
      }
    }
  },
  mounted() {
    if (this.singleSneakerData.product_attributes) {
      const query = this.singleSneakerData.product_attributes.brand_name;
      axios({
        url: `${this.$config.drypApiURL}/related-products/${query || ""}`, //instead of 'buyer' it was 'transfer_from' earlier
        method: "get"
      })
        .then(res => {
          this.$store.commit(
            "sneakersData/getSneakers",
            res.data.products.hits
          );
        })
        .catch(err => {
          let errorMessage =
            err.response &&
            err.response.data &&
            err.response.data.message &&
            err.response.data.error
              ? err.response.data
              : { message: "Something went wrong", error: true };
          this.$store.dispatch(
            "notification_alert/updateNotification",
            errorMessage
          );
        });
    } else {
      this.$store.dispatch("notification_alert/updateNotification", {
        message: "Product not found",
        error: true
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.token != null) {
        axios
          .get("/add-user-info", {
            headers: {
              Authorization: "Bearer " + vm.token
            }
          })
          .then(res => {
            vm.$store.dispatch("address/updateAddress", res.data.address);
          })
          .catch(err => {
            let errorMessage =
              err.response &&
              err.response.data &&
              err.response.data.message &&
              err.response.data.error
                ? err.response.data
                : { message: "Something went wrong", error: true };
            vm.$store.dispatch(
              "notification_alert/updateNotification",
              errorMessage
            );
          });
        axios
          .get("/default-address", {
            headers: {
              Authorization: "Bearer " + vm.token
            }
          })
          .then(res => {
            // console.log(res.data.unique_id)

            if (res.data && res.data.unique_id) {
              vm.addresses.forEach(el => {
                if (el.unique_id === res.data.unique_id) {
                  el.default_address = true;
                  return;
                }
              });
              // console.log(vm.addresses)
            }
            vm.$store.dispatch("address/updateAddress", vm.addresses);
          });
      }
    });
  }
};
</script>
<style lang="scss" scoped></style>
