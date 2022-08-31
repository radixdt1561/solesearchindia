<template>
  <div class="sidenav-container">
    <div
      class="sidenav-backdrop"
      v-if="toggleSidebar"
      @click="$store.dispatch('nav/hideSidebar', false)"
    ></div>
    <transition name="slide-side">
      <div v-if="toggleSidebar" class="sidenav">
        <b-navbar-nav>
          <b-nav-item class="aftertoggle">
            <img
              width="40px"
              height="40px"
              src="~/assets/images/dryp_logo_img/logo2.png"
              alt="logo"
            />
            <b-navbar-toggle @click="() => onClose()" target="nav-collapse">
              <b-x style="transform: scale(3)" />
            </b-navbar-toggle>
          </b-nav-item>
          <hr />
          <b-nav-item
            to="/products"
            @click="$store.dispatch('nav/hideSidebar', false)"
            >All</b-nav-item
          >
          <b-nav-item>
            <div class="d-flex justify-content-between">
              <div @click="$store.dispatch('nav/hideSidebar', false)">
                <nuxt-link
                  :to="{
                    path: '/products',
                    query: { product_type: 'Sneakers' },
                  }"
                  >Sneakers
                </nuxt-link>
              </div>
              <button
                @click="toggles.sneakers = !toggles.sneakers"
                style="border: none; background: none"
              >
                <b-caret :rotate="toggles.sneakers ? '90' : '0'" />
              </button>
            </div>
            <b-collapse v-model="toggles.sneakers" class="p-2">
              <b-nav-item>
                <div class="d-flex justify-content-between">
                  <div>All Brands</div>
                  <button
                    @click="toggles.sneakersBrands = !toggles.sneakersBrands"
                    style="border: none; background: none"
                  >
                    <b-caret :rotate="toggles.sneakersBrands ? '90' : '0'" />
                  </button></div
              ></b-nav-item>
              <b-collapse v-model="toggles.sneakersBrands" class="p-2">
                <b-nav-item
                  :key="i"
                  v-for="(brand, i) in sneakerBrands"
                  @click="$store.dispatch('nav/hideSidebar', false)"
                >
                  <nuxt-link
                    :to="{
                      path: '/products',
                      query: { product_type: 'Sneakers', brands: brand },
                    }"
                    >{{ brand }}
                  </nuxt-link></b-nav-item
                >
              </b-collapse>
            </b-collapse></b-nav-item
          >
          <b-nav-item>
            <div class="d-flex justify-content-between">
              <div @click="$store.dispatch('nav/hideSidebar', false)">
                <nuxt-link
                  :to="{
                    path: '/products',
                    query: { product_type: 'Streetwear' },
                  }"
                  >Streetwear
                </nuxt-link>
              </div>
              <button
                @click="toggles.streetwear = !toggles.streetwear"
                style="border: none; background: none"
              >
                <b-caret :rotate="toggles.streetwear ? '90' : '0'" />
              </button>
            </div>
            <b-collapse v-model="toggles.streetwear" class="p-2">
              <b-nav-item
                to="/products?product_type=Homegrown"
                @click="$store.dispatch('nav/hideSidebar', false)"
                >Homegrown</b-nav-item
              >
              <b-nav-item>
                <div class="d-flex justify-content-between">
                  <div>All Brands</div>
                  <button
                    @click="
                      toggles.streetwearBrands = !toggles.streetwearBrands
                    "
                    style="border: none; background: none"
                  >
                    <b-caret :rotate="toggles.streetwearBrands ? '90' : '0'" />
                  </button></div
              ></b-nav-item>
              <b-collapse v-model="toggles.streetwearBrands" class="p-2">
                <b-nav-item
                  :key="i"
                  v-for="(brand, i) in streetwearBrands"
                  @click="$store.dispatch('nav/hideSidebar', false)"
                >
                  <nuxt-link
                    :to="{
                      path: '/products',
                      query: { product_type: 'Streetwear', brands: brand },
                    }"
                    >{{ brand }}
                  </nuxt-link></b-nav-item
                >
              </b-collapse>
            </b-collapse></b-nav-item
          >
          <b-nav-item>
            <div class="d-flex justify-content-between">
              <div @click="$store.dispatch('nav/hideSidebar', false)">
                <nuxt-link
                  :to="{
                    path: '/products',
                    query: { product_type: 'Accessories' },
                  }"
                  >Accessories
                </nuxt-link>
              </div>
              <button
                @click="toggles.accessories = !toggles.accessories"
                style="border: none; background: none"
              >
                <b-caret :rotate="toggles.accessories ? '90' : '0'" />
              </button>
            </div>
            <b-collapse v-model="toggles.accessories" class="p-2">
              <b-nav-item
                to="/products?product_type=Homegrown Accessories"
                @click="$store.dispatch('nav/hideSidebar', false)"
                >Homegrown Accessories</b-nav-item
              >
              <b-nav-item>
                <div class="d-flex justify-content-between">
                  <div>All Brands</div>
                  <button
                    @click="
                      toggles.accessoriesBrands = !toggles.accessoriesBrands
                    "
                    style="border: none; background: none"
                  >
                    <b-caret :rotate="toggles.accessoriesBrands ? '90' : '0'" />
                  </button></div
              ></b-nav-item>
              <b-collapse v-model="toggles.accessoriesBrands" class="p-2">
                <b-nav-item
                  :key="i"
                  v-for="(brand, i) in accessoriesBrands"
                  @click="$store.dispatch('nav/hideSidebar', false)"
                >
                  <nuxt-link
                    :to="{
                      path: '/products',
                      query: { product_type: 'Streetwear', brands: brand },
                    }"
                    >{{ brand }}
                  </nuxt-link></b-nav-item
                >
              </b-collapse>
            </b-collapse></b-nav-item
          >
          <b-nav-item
            to="/comingsoon/watches"
            @click="$store.dispatch('nav/hideSidebar', false)"
            >Watches</b-nav-item
          >
          <b-nav-item
            to="/comingsoon/handbags"
            @click="$store.dispatch('nav/hideSidebar', false)"
            >Handbags</b-nav-item
          >
          <!-- <b-nav-item
            to="/comingsoon/nft"
            @click="$store.dispatch('nav/hideSidebar', false)"
            >NFT</b-nav-item
          > -->
          <hr />
          <b-nav-item
            to="/how"
            @click="$store.dispatch('nav/hideSidebar', false)"
            >How it works</b-nav-item
          >
          <b-nav-item
            to="/wishlist"
            @click="$store.dispatch('nav/hideSidebar', false)"
            >Wishlist</b-nav-item
          >
          <b-nav-item
            to="/signup"
            @click="$store.dispatch('nav/hideSidebar', false)"
            v-if="!isAuthenticated"
            >Sign Up</b-nav-item
          >
          <b-nav-item
            to="/login"
            @click="$store.dispatch('nav/hideSidebar', false)"
            v-if="!isAuthenticated"
            >Log In</b-nav-item
          >
          <b-nav-item
            @click="
              $store.dispatch('nav/hideSidebar', false);
              logout();
            "
            v-if="isAuthenticated"
            >Log Out</b-nav-item
          >
          <hr />
          <b-nav-item
            to="/seller"
            @click="$store.dispatch('nav/hideSidebar', false)"
            >Become a Seller</b-nav-item
          >
          <hr />
          <b-nav-item
            to="seller/support"
            @click="$store.dispatch('nav/hideSidebar', false)"
            >Customer Support</b-nav-item
          >
          <b-nav-item
            to="/faq"
            @click="$store.dispatch('nav/hideSidebar', false)"
            >FAQ’s</b-nav-item
          >
          <b-nav-item
            to="/privacy"
            @click="$store.dispatch('nav/hideSidebar', false)"
            >Privacy</b-nav-item
          >
          <b-nav-item
            to="/terms"
            @click="$store.dispatch('nav/hideSidebar', false)"
            >Terms</b-nav-item
          >
        </b-navbar-nav>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  BNavbar,
  BNavbarNav,
  BNavItem,
  BNavbarToggle,
  BIconChevronRight,
  BIconX,
} from "bootstrap-vue";
export default {
  name: "TheSidenav",
  components: {
    "b-navbar": BNavbar,
    "b-navbar-nav": BNavbarNav,
    "b-nav-item": BNavItem,
    "b-navbar-toggle": BNavbarToggle,
    "b-caret": BIconChevronRight,
    "b-x": BIconX,
  },
  data() {
    return {
      query: "",
      sneakerBrands: [],
      streetwearBrands: [],
      accessoriesBrands: [],
      toggles: {
        sneakers: false,
        sneakerBrands: false,
        streetwearBrands: false,
        streetwear: false,
        accessories: false,
        accessoriesBrands: false,
      },
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    //change to promise then later
    const { data } = await this.$getBrands("Sneakers");
    this.sneakerBrands = data.aggregations.brands.buckets.map(
      (brand) => brand.key
    );
    const { data: street } = await this.$getBrands("Streetwear");
    this.streetwearBrands = street.aggregations.brands.buckets.map(
      (brand) => brand.key
    );
    const { data: accessories } = await this.$getBrands("Accessories");
    this.accessoriesBrands = accessories.aggregations.brands.buckets.map(
      (brand) => brand.key
    );
  },
  computed: {
    toggleSidebar() {
      return this.$store.getters["nav/toggleSidebar"];
    },
    isAuthenticated() {
      return this.$store.getters["authentication/isAuthenticated"];
    },
  },
  methods: {
    onClose() {
      this.toggles = {
        sneakers: false,
        sneakerBrands: false,
        streetwearBrands: false,
        streetwear: false,
      };
      this.$store.dispatch("nav/hideSidebar", false);
    },
    logout() {
      this.$store.dispatch("authentication/updateLogout").then(() => {
        if (this.$route.name != "products-id") this.$router.replace("/");
        else {
          this.$emit("beOnSearchID", true);
        }
      });
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
};
</script>

<style scoped lang="scss">
.logo-svg-container {
  width: 50px;
  height: 50px;
  position: relative;
}

.sidenav-container {
  height: 100%;
  width: 100%;
  z-index: 100;
}

.sidenav-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}

.sidenav {
  height: 100%;
  width: 100%;
  background-color: white;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 0rem 2rem;
  overflow-y: auto;
  @media screen and (min-width: 450px) {
    width: 40%;
  }
  .aftertoggle {
    a {
      // border: 1px solid red;
      font-size: 12rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        // height: 2.5rem;
        width: 1.5rem;
        border: none;
        outline: none;
        padding: 0rem;
        background-color: transparent;
        // border: 1px solid red;
        img {
          // border: 1px solid green;
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  li {
    padding: 0.2rem 0rem;
    a {
      font-size: 1.5rem;
      color: #0f0f0f;
    }
  }
}

.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(-100%);
}
</style>
