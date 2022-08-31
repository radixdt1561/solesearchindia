<template>
  <div class="menu">
    <b-navbar type="dark" class="navbar-mobile">
      <b-nav-item @click="$store.dispatch('nav/showSidebar', true)">
        <b-list style="transform: scale(1.5)" />
      </b-nav-item>
      <nuxt-link to="/" style="text-decoration: none" class="center">
        <img
          width="34px"
          height="34px"
          src="~/assets/images/dryp_logo_img/logo2.png"
          alt="logo"
        />
      </nuxt-link>
      <div class="d-flex">
        <b-nav-item to="/seller" class="icons" v-if="user !== null">
          <button class="user-icon-mobile" v-html="userProfileSvg" />
        </b-nav-item>
        <b-nav-item class="icons" v-b-toggle.search-sidebar>
          <b-search />
        </b-nav-item>
      </div>
    </b-navbar>
    <client-only>
      <b-navbar type="dark" class="navbar">
        <div class="header-logo">
          <nuxt-link to="/" style="text-decoration: none">
            <div>
              <img
                width="200px"
                height="60px"
                src="~/assets/images/header/header-logo.png"
                alt="logo"
              />
            </div>
          </nuxt-link>
        </div>

        <b-navbar-nav>
          <b-nav-item to="/products"> All </b-nav-item>
          <b-dropdown-hover title="Sneakers">
            <b-dropdown-item>
              <li
                id="sub-dropdown-streetwear-brands"
                class="sub-dropdown"
                @mouseenter="() => (hoverSneakerBrands = true)"
              >
                <div>Brands</div>
                <b-arrow-right style="width: 12px; height: 12px" />
              </li>

              <ul
                class="sub-dropdown-content"
                role="menu"
                @mouseleave="() => (hoverSneakerBrands = false)"
                v-if="sneakerBrands.length !== 0 && hoverSneakerBrands"
              >
                <li :key="i" v-for="(brand, i) in sneakerBrands">
                  <nuxt-link
                    :to="{
                      path: '/products',
                      query: {
                        product_type: 'Sneakers',
                        brands: brand,
                        sort: sortValue,
                      },
                    }"
                    >{{ brand }}
                  </nuxt-link>
                </li>
              </ul>
            </b-dropdown-item>
          </b-dropdown-hover>
          <b-dropdown-hover title="Streetwear">
            <b-dropdown-item>
              <li
                id="sub-dropdown-streetwear-brands"
                class="sub-dropdown"
                @mouseenter="
                  () => {
                    hoverStreetwearBrands = true;
                    hoverHomegrownBrands = false;
                  }
                "
              >
                <div>Hype</div>
                <b-arrow-right style="width: 12px; height: 12px" />
              </li>

              <ul
                class="sub-dropdown-content"
                @mouseleave="() => (hoverStreetwearBrands = false)"
                v-if="streetwearBrands.length !== 0 && hoverStreetwearBrands"
              >
                <li :key="i" v-for="(brand, i) in streetwearBrands">
                  <nuxt-link
                    :to="{
                      path: '/products',
                      query: {
                        product_type: 'Streetwear',
                        brands: brand,
                        sort: sortValue,
                      },
                    }"
                    >{{ brand }}
                  </nuxt-link>
                </li>
              </ul>
            </b-dropdown-item>
            <b-dropdown-item>
              <nuxt-link
                :to="{
                  path: '/products',
                  query: { product_type: 'Homegrown', sort: sortValue },
                }"
              >
                <li
                  id="sub-dropdown-streetwear-brands"
                  class="sub-dropdown"
                  @mouseenter="
                    () => {
                      hoverHomegrownBrands = true;
                      hoverStreetwearBrands = false;
                    }
                  "
                >
                  <div>Homegrown</div>
                  <b-arrow-right style="width: 12px; height: 12px" />
                </li>
                <ul
                  class="sub-dropdown-content"
                  @mouseleave="() => (hoverHomegrownBrands = false)"
                  v-if="streetwearBrands.length !== 0 && hoverHomegrownBrands"
                >
                  <li :key="i" v-for="(brand, i) in homegrownBrands">
                    <nuxt-link
                      :to="{
                        path: '/products',
                        query: {
                          product_type: 'Homegrown',
                          brands: brand,
                          sort: sortValue,
                        },
                      }"
                      >{{ brand }}
                    </nuxt-link>
                  </li>
                </ul>
              </nuxt-link>
            </b-dropdown-item>
          </b-dropdown-hover>
          <b-dropdown-hover title="Accessories">
            <b-dropdown-item>
              <li
                id="sub-dropdown-streetwear-brands"
                class="sub-dropdown"
                @mouseenter="() => (hoverAccessoriesBrands = true)"
              >
                <div>Brands</div>
                <b-arrow-right style="width: 12px; height: 12px" />
              </li>

              <ul
                class="sub-dropdown-content"
                @mouseleave="() => (hoverAccessoriesBrands = false)"
                v-if="accessoriesBrands.length !== 0 && hoverAccessoriesBrands"
              >
                <li :key="i" v-for="(brand, i) in accessoriesBrands">
                  <nuxt-link
                    :to="{
                      path: '/products',
                      query: {
                        product_type: 'Accessories',
                        brands: brand,
                        sort: sortValue,
                      },
                    }"
                    >{{ brand }}
                  </nuxt-link>
                </li>
              </ul>
            </b-dropdown-item>
            <b-dropdown-item>
              <nuxt-link
                :to="{
                  path: '/products',
                  query: {
                    product_type: 'Homegrown Accessories',
                    sort: sortValue,
                  },
                }"
                >Homegrown</nuxt-link
              >
            </b-dropdown-item>
            <b-dropdown-item to="/comingsoon/watches">
              <nuxt-link
                :to="{
                  path: '/products',
                  query: { product_type: 'Sneaker Care', sort: sortValue },
                }"
                >Sneaker Care</nuxt-link
              ></b-dropdown-item
            >
          </b-dropdown-hover>
          <b-dropdown-hover title="More">
            <b-dropdown-item to="/comingsoon/watches">Watches </b-dropdown-item>
            <b-dropdown-item to="/comingsoon/handbags">
              Handbags
            </b-dropdown-item>
            <!-- <b-dropdown-item to="/comingsoon/nft">
              NFT
            </b-dropdown-item> -->
          </b-dropdown-hover>
          <b-nav-item to="/how"> How it works </b-nav-item>
          <b-nav-item to="/login" v-if="user == null">
            <a> Log In </a>
          </b-nav-item>
          <b-nav-item @click="logout" v-else>
            <a> Logout</a>
          </b-nav-item>
          <b-nav-item to="/seller" v-if="user !== null">
            <button
              style="background: none; border: none; color: white"
              v-html="userProfileSvg"
            />
          </b-nav-item>
          <b-nav-item @click="getWishlist">
            <b-heart style="height: 28px; width: 24px" />
          </b-nav-item>
          <b-nav-item v-b-toggle.search-sidebar>
            <b-search style="height: 26px; width: 24px" />
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </client-only>
    <b-sidebar
      id="search-sidebar"
      sidebar-class="sidebar-width"
      backdrop-variant="dark"
      bg-variant="white"
      right
      shadow
      lazy
      backdrop
    >
      <b-overlay :show="loading">
        <div style="padding: 16px">
          <div class="input-container d-flex">
            <div style="padding-right: 4px">
              <b-search />
            </div>
            <input
              ref="searchInput"
              type="text"
              style="width: 100%; border: none; outline: none"
              placeholder="Search..."
              @keyup.enter="fetchSearchedQuery"
              v-model="queryString"
            />
            <div style="padding-left: 4px">
              <button
                style="border: none; background: none"
                @click="queryString = ''"
              >
                <b-x />
              </button>
            </div>
          </div>
        </div>
        <div v-if="queryString.length >= 3 && queryResults">
          <div :key="i" v-for="(value, i) of Object.keys(queryResults)">
            <Divider />
            <div class="query-container">
              <div class="d-flex flex-column">
                <div>
                  <span class="query">{{ queryString }}</span
                  ><span class="query-product-type">&nbsp; in {{ value }}</span>
                </div>
                <div class="results">{{ queryResults[value] }} results</div>
              </div>
              <div>
                <button
                  style="border: none; background: none"
                  @click="fetchProductType(value)"
                >
                  <b-arrow-right style="width: 20px; height: 20px" />
                </button>
              </div>
            </div>
          </div>
          <Divider />
        </div>
        <div v-if="queryString.length >= 3 && searchedHits">
          <p class="top-results">TOP RESULTS</p>
          <div>
            <div
              v-for="item in searchedHits"
              :key="item['_id']"
              @mousedown="$router.push(`/products/${item}`)"
            >
              <div
                class="d-flex flex-row align-items-center"
                style="padding: 16px; cursor: pointer"
              >
                <b-img-lazy
                  width="100px"
                  height="100px"
                  :src="`${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${item}/${item.main_picture_url}`"
                  alt="product"
                />
                <div class="product-name">
                  {{ item.name }}
                </div>
              </div>
              <Divider />
            </div>
          </div>
        </div>
      </b-overlay>
    </b-sidebar>
  </div>
</template>
<script>
import axios from "axios";
import {
  BNavbar,
  BNavbarNav,
  BNavbarToggle,
  BCollapse,
  BNavItem,
  BIconSearch,
  BIconX,
  VBToggle,
  BListGroup,
  BListGroupItem,
  BImgLazy,
  BIconHeartFill,
  BIconChevronRight,
  BIconList,
} from "bootstrap-vue";
import Divider from "@/components/Divider";
import userProfileSvg from "~/assets/svg/user-profile.svg?raw";
import HoverDropdown from "@/components/HoverDropdown";
export default {
  components: {
    "b-navbar": BNavbar,
    "b-navbar-nav": BNavbarNav,
    "b-navbar-toggle": BNavbarToggle,
    "b-collapse": BCollapse,
    "b-nav-item": BNavItem,
    "b-search": BIconSearch,
    "b-arrow-right": BIconChevronRight,
    "b-x": BIconX,
    "b-list-group": BListGroup,
    "b-list-group-item": BListGroupItem,
    "b-img-lazy": BImgLazy,
    "b-heart": BIconHeartFill,
    Divider,
    "b-dropdown-hover": HoverDropdown,
    "b-list": BIconList,
  },
  directives: {
    "b-toggle": VBToggle,
  },
  props: {
    sortValue: {
      type: String,
      default: "latest",
    },
  },
  data() {
    return {
      loading: false,
      userProfileSvg,
      hoverHomegrownBrands: false,
      hoverStreetwearBrands: false,
      hoverSneakerBrands: false,
      hoverAccessoriesBrands: false,
      sneakerBrands: [],
      streetwearBrands: [],
      accessoriesBrands: [],
      homegrownBrands: [],
      queryString: "",
      queryResults: {},
      searchedHits: [],
      showSearchedHits: false,
      path: "",
      highlight: {
        all: false,
        nike: false,
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters["authentication/getUser"];
    },
    token() {
      return this.$store.getters["authentication/idToken"];
    },
  },
  methods: {
    fetchProductType(value) {
      this.$router.push({
        name: "products",
        query: { product_type: value },
      });
      this.showSearchedHits = false;
    },
    fetchSearchedQuery(event) {
      this.$router.push({
        name: "products",
        query: { query: event.target.value },
      });
      this.showSearchedHits = false;
    },
    fetchSelectedQuery(value) {
      this.$router.push({
        name: "products",
        query: { brands: value },
      });
    },
    sell() {
      if (!this.user) {
        this.path = "/login";
      } else {
        this.path = "/seller";
      }
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
    getWishlist() {
      if (this.token) this.$router.replace(`/wishlist/user-wishlist`);
      else this.$router.replace("/wishlist");
    },
  },
  watch: {
    async queryString(newValue) {
      if (newValue.length >= 3) {
        this.loading = true;
        const { data } = await this.$getQueryResults(newValue);
        this.queryResults = data?.results;
        axios({
          url: `${this.$config.drypApiURL}/search/buyer/${this.queryString}/30`,
          method: "get",
        })
          .then((res) => {
            const result = res.data.products.hits.hits;
            const names = result.map((sneaker) => sneaker.name);

            this.searchedHits = result.filter(
              (val, index) => !names.includes(val.name, index + 1)
            );

            this.showSearchedHits = true;
          })
          .catch((err) => console.log(err))
          .finally(() => (this.loading = false));
      } else {
        this.searchedHits = null;
        this.showSearchedHits = false;
      }
    },
  },
  mounted() {
    if (!this.user) {
      this.path = "/login";
    } else {
      this.path = "/seller";
    }

    this.$getBrands("Sneakers").then(
      (res) => (
        (this.sneakerBrands = res.data.aggregations.brands.buckets.map(
          (brand) => brand.key
        )),
        this.sneakerBrands.sort()
      )
    );
    this.$getBrands("Streetwear").then(
      (res) => (
        (this.streetwearBrands = res.data.aggregations.brands.buckets.map(
          (brand) => brand.key
        )),
        this.streetwearBrands.sort()
      )
    );
    this.$getBrands("Accessories").then(
      (res) => (
        (this.accessoriesBrands = res.data.aggregations.brands.buckets.map(
          (brand) => brand.key
        )),
        this.accessoriesBrands.sort()
      )
    );
    this.$getBrands("Homegrown").then(
      (res) => (
        (this.homegrownBrands = res.data.aggregations.brands.buckets.map(
          (brand) => brand.key
        )),
        this.homegrownBrands.sort()
      )
    );
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
<style lang="scss" scoped>
.user-icon-mobile {
  background: none;
  border: none;
  color: white;
}

.center {
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

a:hover,
button:hover {
  color: #ee2257 !important;
}

.no-mobile {
  @media screen and (max-width: 992px) {
    display: none !important;
  }
}

.search-button {
  background: none;
  border: none;
  outline: none;
  margin-top: 8px;
  @media screen and (max-width: 992px) {
    margin-top: 0px;
    padding-right: 32px;
  }
}
.sub-dropdown {
  display: flex;
  color: #0f0f0f;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 16px;
}

.sub-dropdown:hover {
  color: #ee2257;
}

.sub-dropdown-content {
  position: absolute;
  left: 100%;
  top: 0;
  color: #0f0f0f;
  background-color: white;
  border: 1px solid lightgrey;
  min-width: 200px;
  z-index: 11;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding: 0px 16px 4px 16px;
  align-items: flex-start !important;
  font-size: 16px;
  li {
    padding: 8px;
    a {
      color: #0f0f0f;
    }
  }
}

.input-container {
  border-radius: 5px;
  border: 1px solid rgb(229, 229, 233);
  width: 100%;
  padding: 8px;
}

.query-container {
  height: 60px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .query {
    color: rgb(28, 28, 32);
    font-size: 14px;
    font-weight: bold;
  }

  .query-product-type {
    color: rgb(143, 143, 150);
    font-size: 14px;
    font-weight: bold;
  }

  .results {
    color: rgb(143, 143, 150);
    font-size: 12px;
    font-weight: normal;
  }
}

.top-results {
  margin-top: 16px;
  padding-left: 16px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(28, 28, 32);
}

.product-name {
  margin-left: 16px;
  font-size: 14px;
  font-weight: bold;
  color: rgb(28, 28, 32);
}

a {
  text-decoration: none;
}
a:hover {
  color: #ee2257;
}

.menu {
  padding: 0 4px 0 4px;
  background-color: #0f0f0f;
  position: sticky;
  top: 0;
  z-index: 20;
  font-size: 16px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

  @media screen and (min-width: 993px) {
    padding: 0 4% 0 4%;
  }

  li {
    list-style-type: none;
  }

  .navbar {
    display: none;
    justify-content: space-between;
    @media screen and (min-width: 993px) {
      display: flex;
    }
  }

  .navbar-nav {
    padding-top: 8px;
  }

  .navbar-mobile {
    position: relative;
    display: flex;
    justify-content: space-between;
    @media screen and (min-width: 993px) {
      display: none;
    }
  }

  .icons {
    .nav-link {
      padding-left: 8px;
      padding-right: 8px;
    }
  }
}
</style>
