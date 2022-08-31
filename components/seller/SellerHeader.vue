<template>
  <header class="sell__header--wrapper">
    <TheSideNav />
    <div class="sell__top">
      <nuxt-link to="/">
        <div
          class="d-flex flex-row justify-content-center align-items-center"
          style="height: 100%"
        >
          <img
            width="80px"
            height="80px"
            src="~/assets/images/dryp_logo_img/logo2.png"
            alt="logo"
          />
          <img
            width="200px"
            height="80px"
            src="~/assets/images/dryp_logo_img/wordmark.png"
            alt="logo"
          />
        </div>
      </nuxt-link>
    </div>
    <b-navbar class="sell__small">
      <button
        style="background: none; border: none"
        @click="$store.dispatch('nav/showSidebar', true)"
      >
        <img
          width="30px"
          height="30px"
          src="~/assets/images/rounded-rectangle-3/rounded-rectangle-3-copy-2@2x.png"
          alt=""
        />
      </button>
      <b-navbar-nav class="nav-noncollapse d-flex flex-row">
        <b-nav-item
          to="/login"
          class="nav-noncollapse__login"
          v-if="user == null"
          ><img
            src="~/assets/images/header/login-icon/login-icon@2x.jpg"
            alt="man-icon"
        /></b-nav-item>
        <b-nav-item to="/" class="nav-noncollapse__dryp-log">
          <img
            width="40px"
            height="40px"
            src="~/assets/images/dryp_logo_img/logo2.png"
            alt="logo"
          />
        </b-nav-item>
        <b-nav-item
          to="/wishlist/user-wishlist"
          class="nav-noncollapse__wishlist mx-lg-3"
        >
          <img
            src="~/assets/images/header/wishlist-icon/wishlist-icon@2x.png"
            alt="heart-icon"
            style="max-height: 2.5rem"
          />
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="sell__header">
      <ul class="sell__header--list">
        <li class="sell__header--item">
          <nuxt-link to="/seller" class="sell__header--link" exact>
            <img
              class="sell__header--link-img"
              src="~/assets/images/seller/sell-icon@2x.png"
              alt="sell-icon"
            />
            <p class="sell__header--link-text">Sell A Product</p>
          </nuxt-link>
        </li>
        <li class="sell__header--item">
          <nuxt-link to="/seller/storefront" class="sell__header--link">
            <img
              class="sell__header--link-img"
              src="~/assets/images/seller/inventory-icon@2x.png"
              alt="inventory-icon"
            />
            <p class="sell__header--link-text">Store Front</p>
          </nuxt-link>
        </li>
        <li class="sell__header--item">
          <nuxt-link to="/seller/orders" class="sell__header--link" exact>
            <img
              class="sell__header--link-img"
              src="~/assets/images/seller/orders@2x.png"
              alt="orders"
            />
            <p class="sell__header--link-text">Your Orders</p>
          </nuxt-link>
        </li>
        <li class="sell__header--item">
          <nuxt-link to="/seller/bids" class="sell__header--link" exact>
            <img
              class="sell__header--link-img"
              src="~/assets/images/seller/orders@2x.png"
              alt="orders"
            />
            <p class="sell__header--link-text">Your Bids</p>
          </nuxt-link>
        </li>
        <li class="sell__header--item">
          <nuxt-link to="/seller/profile" class="sell__header--link">
            <img
              class="sell__header--link-img"
              src="~/assets/images/seller/login-icon@2x.png"
              alt="login-icon"
            />
            <p class="sell__header--link-text">Profile Info</p>
          </nuxt-link>
        </li>
        <li class="sell__header--item">
          <nuxt-link to="/seller/support" class="sell__header--link" exact>
            <img
              class="sell__header--link-img"
              src="~/assets/images/seller/customer-support-icon@2x.png"
              alt="payment-icon"
            />
            <p class="sell__header--link-text">Customer Support</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import TheSideNav from "@/components/TheSidenav.vue";
import { BNavbar, BNavbarNav, BNavbarToggle, BNavItem } from "bootstrap-vue";

export default {
  name: "SellerHeader",
  components: {
    "b-navbar-toggle": BNavbarToggle,
    "b-navbar": BNavbar,
    "b-navbar-nav": BNavbarNav,
    "b-nav-item": BNavItem,
    TheSideNav,
  },
  data() {
    return {
      path: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters["authentication/getUser"];
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch("authentication/updateLogout")
        .then(() => this.$router.replace("/"));
      let successMessage = {
        message: "Logged out successfully.",
        error: false,
      };
      this.$store.dispatch(
        "notification_alert/updateNotification",
        successMessage
      );
      webengage.user.logout();
    },
  },

  components: {
    TheSideNav,
  },
  mounted() {
    if (!this.user) {
      this.path = "/login";
    } else {
      this.path = "/seller";
    }
  },
};
</script>

<style lang="scss" scoped>
.sell {
  &__top {
    height: 10rem;
    background-color: white;
    @media screen and (max-width: 1400px) {
      margin: auto;
    }
    @media screen and (max-width: 992px) {
      display: none;
    }
  }
  &__small {
    justify-content: space-between;
    max-width: 136.6rem;
    min-height: 6rem;
    margin: auto;
    display: none;
    padding: 0rem 1rem;
    background-color: #fff;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    @media screen and (max-width: 992px) {
      display: flex;
    }
    //css for the collapsable menu sandwiched menu
    .navbar-toggler {
      height: 2rem;
      width: 2.5rem;
      border: none;
      outline: none;
      padding: 0rem;

      img {
        height: 100%;
        width: 100%;
      }
      @media screen and (max-width: 580px) {
        margin: 2rem 0rem;
      }
    }
    .nav-noncollapse {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0px;

      &__login {
        height: 2.48rem;
        a,
        .nav-link {
          height: 100%;
          padding: 0rem;
          img {
            height: 100%;
          }
          svg {
            transform: rotate(-90deg);
          }
        }
        @media (max-width: 992px) {
          margin: 0 1rem;
          height: 2.48rem;
          flex: 1;

          & a,
          .nav-link {
            display: inline-block;
            height: inherit;

            & img {
              height: inherit;
            }
          }
        }
      }
      &__button {
        border-bottom: 0px;
        .sell {
          color: #ffffff;
          outline: none;
          font-size: 1.5rem;
          padding: 0.9rem 0px;
          width: 6.7rem;
          height: 3.7rem;
          background-color: #323232;
          @media screen and (max-width: 1366px) {
            padding: 0.5rem 0rem;
            font-size: 1rem;
            width: 4.7rem;
            height: 2.48rem;
          }
        }
        .sell:hover,
        .sell:active {
          border: 1px solid #323232;
          color: #323232;
          background-color: #ffffff;
        }
      }
      &__dryp-log {
        display: none;
        a {
          border-bottom: none;
          padding: 0rem;
          height: 2.3rem;
          width: auto;
          img {
            height: 46px;
            margin-top: -10px;
          }
        }

        @media screen and (max-width: 992px) {
          display: flex;
          justify-content: space-around;
          height: 2.5rem;
          flex: 1;
        }
      }

      @media screen and (max-width: 1366px) {
        .nav-link {
          font-size: none;
        }
        &__wishlist {
          a {
            padding: 0rem;
            height: inherit;
            display: inline-block;
          }
          img {
            height: inherit;
          }
        }
      }
      @media screen and (max-width: 992px) {
        width: 95%;
        display: flex;
        justify-content: space-between;
        &__wishlist {
          margin-right: 2rem;
          height: 2.3rem;
        }
      }
      @media screen and (max-width: 575px) {
        width: 92%;
      }

      @media screen and (max-width: 768px) {
        &__wishlist {
          margin-right: 1.5rem;
        }
      }

      @media screen and (min-width: 992px) {
        flex: 0.5;
        justify-content: space-between;
      }
    }
  }
  &__banner {
    margin: auto;
    padding: 0rem;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    a {
      border-bottom: none !important;
    }
    img {
      max-height: 4rem;
      backface-visibility: hidden;
    }
  }
  &__header {
    height: 10rem;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: $base-white;
    @media screen and (max-width: 1400px) and (min-width: 992px) {
      padding: 0 5%;
    }
    @media screen and (max-width: 992px) {
      height: fit-content;
      background-color: $grey-light;
      box-shadow: none;
    }

    &--list {
      display: flex;
      padding: 0;
      justify-content: space-between;
      max-width: 136.6rem;
      margin: auto;
      height: 100%;
      list-style: none;
      @media screen and (max-width: 992px) {
        flex-wrap: wrap;
        padding: 1rem;
      }
    }
    &--item {
      width: 20rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;

      @media screen and (max-width: 992px) {
        width: 49%;
        margin: 0.4rem auto;
        background-color: $base-white;
      }
    }

    &--link {
      display: block;
      color: $primary;
      text-decoration: none;
      font-size: 1.6rem;
      width: 100%;
      height: 100%;
      text-align: center;
      border-bottom: 6px solid transparent;
      @media screen and (max-width: 992px) {
        padding: 1.5rem;
        height: 100%;
      }
      &-img {
        height: 2.6rem;
        width: auto;
        backface-visibility: hidden;
        margin: 0 auto;
        margin-bottom: 1.4rem;
        display: block;
        @media screen and (max-width: 580px) {
          margin-bottom: 1rem;
        }
        &-text {
          align-self: center;
        }
      }
      &-text {
        @media screen and (max-width: 575px) {
          font-size: 1.3rem;
          margin-bottom: 0;
        }
      }
      &.nuxt-link-active {
        border-bottom: 6px solid $button-dark;
      }
    }
  }
}
.full-width {
  @media screen and (max-width: 992px) {
    width: 100%;
  }
}
</style>
