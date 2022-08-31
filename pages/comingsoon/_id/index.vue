<template>
  <div class="comingsoon">
    <Header />
    <TheSideNav />
    <div class="coming__soon--img-wrapper">
      <div
        class="image__wrapper"
        :class="[
          { streetwear: streetwear },
          { watches: watches },
          { handbags: handbags },
          { collectibles: collectibles },
        ]"
      ></div>
    </div>
    <div
      v-if="signup"
      class="comingsoon__text container d-flex flex-column align-items-center"
    >
      <h5>Keep you posted?</h5>
      <p>
        Please provide your information below and <br />
        we will inform you when this collection goes live.
      </p>
      <form class="d-flex flex-column align-items-center">
        <input
          type="email"
          name="comingsoonemail"
          id="comingsoonemail"
          placeholder="Email Address"
          v-model="email"
        />
        <button class="black-button" type="submit" @click.prevent="subscribers">
          Yeah, I’m in!
        </button>
      </form>
    </div>
    <signupack
      :heading="heading"
      :description="description"
      :msg="msg"
      :href="href"
      v-else
    />
    <Footer />
  </div>
</template>
<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import TheSideNav from "@/components/TheSidenav.vue";
import Footer from "@/components/Footer.vue";
import signupack from "@/components/signupack.vue";
export default {
  data() {
    return {
      description:
        "We will notify you as soon as we add the product to our range.",
      msg: "See other products",
      href: "/products",
      heading: "Thank you!",
      getImageUrl: "",
      left: "",
      right: "",
      watches: "",
      collectibles: "",
      streetwear: "",
      handbags: "",
      email: "",
      signup: true,
    };
  },
  components: {
    Header,
    TheSideNav,
    Footer,
    signupack,
  },
  computed: {
    validateEmail() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // this.error.email.touch = true;

      // if (!this.email) {
      //   // this.error.email.required = true;
      //   return false;
      // }
      if (re.test(String(this.email).toLowerCase())) {
        // this.error.email.required = false;
        return true;
      } else {
        // this.error.email.required = false;
        // this.error.email.invalid = true;
        return false;
      }
    },
  },
  methods: {
    subscribers() {
      if (this.email !== "" && this.validateEmail) {
        const payload = {};
        payload.collections = this.$route.params.id;
        payload.email = this.email;
        axios
          .post("/subscribers", payload)
          .then((res) => {
            if (res.status == 200) {
              this.signup = false;
              let successMessage =
                res.data && res.data.message
                  ? { message: res.data.message, error: false }
                  : { message: "Email sent successfully.", error: false };
              this.$store.dispatch(
                "notification_alert/updateNotification",
                successMessage
              );
            }
          })
          .catch((err) => {
            let errorMesssage =
              err.response.data &&
              err.response.data.message &&
              err.response.data.error
                ? {
                    message: "Invalid email id.",
                    error: true,
                  }
                : {
                    message: "Invalid email id.",
                    error: true,
                  };
            this.$store.dispatch(
              "notification_alert/updateNotification",
              errorMesssage
            );
          });
      } else {
        this.$store.dispatch("notification_alert/updateNotification", {
          message: "Invalid email id.",
          error: true,
        });
      }
    },
  },
  mounted() {
    if (this.$route.params.id == "nft") {
      this.left = true;
      this.collectibles = true;
    }
    if (this.$route.params.id == "handbags") {
      this.left = true;
      this.handbags = true;
    }
    if (this.$route.params.id == "streetwear") {
      this.right = true;
      this.streetwear = true;
    }
    if (this.$route.params.id == "watches") {
      this.right = true;
      this.watches = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (
        vm.$route.params.id == "nft" ||
        vm.$route.params.id == "handbags" ||
        vm.$route.params.id == "streetwear" ||
        vm.$route.params.id == "watches"
      ) {
        next();
      } else vm.$router.replace("/");
    });
  },
};
</script>
<style lang="scss" scoped>
.comingsoon {
  .coming__soon--img-wrapper {
    max-width: 100%;
  }
  .image__wrapper {
    margin-bottom: 4.2rem;
    min-height: 51rem;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @media screen and (max-width: 1200px) and (min-width: 992px) {
      margin-bottom: 0;
    }
    @media screen and (max-width: 900px) and (min-width: 601px) {
      margin-bottom: 0;
    }
    @media screen and (max-width: 992px) {
      min-height: 38rem;
    }
    @media screen and (max-width: 600px) {
      min-height: 23rem;
    }
    @media screen and (max-width: 500px) {
      // min-height: 44rem;
      background-size: contain;
    }
    p {
      font-size: 6rem;
      color: black;
      margin-right: 27rem;
      text-align: center;
      @media screen and (max-width: 1210px) {
        font-size: 4rem;
        span {
          font-size: 2.5rem !important;
        }
      }
    }
  }
  .streetwear {
    background-image: url("./../../../assets/images/comingsoon/streetwear-banner@2x.png");
    @media screen and (max-width: 500px) {
      background-image: url("./../../../assets/images/comingsoon/mobile-streetwear@2x.png");
    }
  }
  .watches {
    background-image: url("./../../../assets/images/comingsoon/watches.png");
    @media screen and (max-width: 500px) {
      background-image: url("./../../../assets/images/comingsoon/watches.png");
    }
  }
  .handbags {
    background-image: url("./../../../assets/images/comingsoon/bags.png");
    @media screen and (max-width: 500px) {
      background-image: url("./../../../assets/images/comingsoon/bags.png");
    }
  }
  .collectibles {
    background-image: url("./../../../assets/images/comingsoon/nft.png");
    @media screen and (max-width: 500px) {
      background-image: url("./../../../assets/images/comingsoon/nft.png");
    }
  }
  &__text {
    text-align: center;
    color: black;
    h5 {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 3.6rem;
    }
    p {
      font-size: 1.4rem;
      margin-bottom: 3.1rem;
      font-weight: 500;
    }
    form {
      input {
        min-width: 100%;
        border: solid 1px #8c8c8c;
        background-color: #ffffff;
        height: 3rem;
        outline: none;
        font-size: 1.6rem;
        color: #646464;
        padding: 1.9rem 0 1.9rem 1.9rem;
      }
      button {
        margin-bottom: 11.6rem;
        margin-top: 2.6rem;
      }
    }
  }
}
</style>
