<template>
  <div class="main-wrapper">
    <Header :sortValue="sortFilterValue" />
    <TheSidenav />
    <div
      v-if="selectedProductType"
      style="box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px"
    >
      <img
        width="100%"
        v-if="selectedProductType.toLowerCase() === 'sneakers'"
        class="sneaker-nation"
        src="~/assets/images/banners/2.png"
      />
      <img
        width="100%"
        v-else-if="selectedProductType.toLowerCase() === 'homegrown'"
        class="sneaker-nation"
        src="~/assets/images/banners/4.png"
      />
      <img
        width="100%"
        v-else-if="selectedProductType.toLowerCase() === 'streetwear'"
        class="sneaker-nation"
        src="~/assets/images/banners/3.png"
      />
      <img
        width="100%"
        v-else-if="selectedProductType.toLowerCase() === 'accessories'"
        class="sneaker-nation"
        src="~/assets/images/banners/5.png"
      />
      <img
        width="100%"
        v-else-if="selectedProductType.toLowerCase() === 'sneaker care'"
        class="sneaker-nation"
        src="~/assets/images/banners/6.png"
      />
      <img
        width="100%"
        v-else-if="
          selectedProductType.toLowerCase() === 'homegrown accessories'
        "
        class="sneaker-nation"
        src="~/assets/images/banners/7.png"
      />
    </div>
    <img
      width="100%"
      v-else
      class="sneaker-nation"
      src="~/assets/images/banners/1.png"
    />
    <div v-show="!isSearchFiltersActive" class="wrapper d-lg-flex">
      <div class="display-filter">
        <Filters
          :productFilters="onMount"
          :setFilters="setPriceAndGenderFilter"
          :getFilters="getFilters"
        />
      </div>
      <section class="p-0" style="flex: 1" v-if="sneakersData.hits">
        <div class="sneakers__wrapper">
          <button class="display-filters-mobile" v-b-toggle.filters-sidebar>
            <b-filter />
          </button>
          <div class="path-sortby">
            <p>
              Browse <span>{{ sneakersData.total.value }}</span> results
            </p>
            <div class="sortby">
              <label for="sort-selector">SORT </label>
              <select
                name="sort-selector"
                id="sort-selector"
                v-model="sortFilterValue"
              >
                <option value="latest" selected>Latest Release</option>
                <option value="popular">Most Popular</option>
                <option value="asc">Price (Low to High)</option>
                <option value="desc">Price (High to Low)</option>
              </select>
            </div>
          </div>
          <b-overlay>
            <div class="product-grid-container">
              <sneaker :sneakersData="sneakersData.hits" />
            </div>
          </b-overlay>
          <div class="no-more">
            <p
              v-if="
                sneakersData.hits.length === 0 || page === numberOfPages - 1
              "
            >
              No more products in this category
            </p>
            <div
              v-if="
                sneakersData.hits.length === 0 || page === numberOfPages - 1
              "
            >
              <nuxt-link
                to="/products?product_type=Streetwear"
                v-if="selectedProductType !== 'Streetwear'"
              >
                <button class="black-button">EXPLORE STREETWEAR</button>
              </nuxt-link>
              <nuxt-link to="/products?product_type=Sneakers" v-else>
                <button class="black-button">EXPLORE SNEAKERS</button>
              </nuxt-link>
            </div>
            <button class="black-button" @click="fetchMore" v-else>
              LOAD MORE
            </button>
          </div>
        </div>
      </section>
    </div>
    <b-sidebar
      id="filters-sidebar"
      sidebar-class="sidebar-width"
      backdrop-variant="dark"
      bg-variant="white"
      right
      shadow
      lazy
      backdrop
      no-close-on-route-change
    >
      <Filters
        :productFilters="onMount"
        :setFilters="setPriceAndGenderFilter"
        :getFilters="getFilters"
      />
    </b-sidebar>
    <Footer />
  </div>
</template>
<script>
import axios from "axios";
import { filterOptionsMixin } from "@/mixins/filterOptionsMixin";
import Footer from "@/components/Footer";
import { BIconFilterSquareFill, BSidebar } from "bootstrap-vue";
import Filters from "@/components/Filters.vue";

export default {
  head() {
    return {
      title: "SoleSearch: Buy, Sell & Bid on Authentic Sneakers & Streetwear",
      meta: [
        {
          hid: "product-page-description",
          name: "description",
          content:
            "Shop the latest sneakers & streetwear from Nike, Adidas, Reebok, Yeezy, Air Jordans, Supreme & more at the best price. Authenticated & delivered to your door."
        }
      ],
      script: [
        {
          type: "text/javascript",
          defer: true,
          async: true,
          id: "hs-script-loader",
          src: "//js-na1.hs-scripts.com/21973152.js"
        }
      ]
    };
  },
  components: {
    Footer,
    Filters,
    "b-filter": BIconFilterSquareFill,
    "b-sidebar": BSidebar
  },
  data() {
    return {
      selectedProductType: "",
      loading: false,
      selectedPrice: "",
      isSearchFiltersActive: false,
      isSortFilterActive: false,
      windowWidth: "",
      showOptions: {
        brands: true,
        gender: true,
        sizes: true,
        prices: true,
        color: true,
        example: true
      },
      availableFilterBrands: [
        "Nike",
        "Adidas",
        "Puma",
        "Reebok",
        "Air Jordan",
        "Yeezy"
      ],
      path: "ALL",
      rangeValue: "",
      values: "",
      sliderPriceValue: 0,
      backgroundSize: "0% 100%",
      queryValueLength: "",
      page: 0,
      numberOfPages: 1,
      sortFilterValue: "latest"
    };
  },
  mixins: [filterOptionsMixin],
  async asyncData(context) {
    let newQuery = context.query;
    let availableFilters = {
      sizes: "size",
      genders: "gender",
      colors: "color",
      brands: "brand_name"
    };
    let filters = [];
    let sortFilter = [];

    for (let query in newQuery) {
      if (
        query !== "prices" &&
        query in availableFilters &&
        Array.isArray(newQuery[query])
      ) {
        filters.push({
          terms: {
            [availableFilters[query]]: newQuery[query].map(val =>
              val.toLowerCase()
            )
          }
        });
      } else if (query === "prices") {
        let value = newQuery[query].split("-");
        let lowerValue = value[0];
        let higherValue = value[1];
        filters.push({
          range: {
            price: { gte: parseInt(lowerValue), lte: parseInt(higherValue) }
          }
        });
      } else if (query === "sort") {
        switch (newQuery[query]) {
          case "latest":
            sortFilter.push({ "release_year.keyword": "desc" });
            break;
          case "popular":
            sortFilter.push({ _score: "desc" });
            break;
          case "asc":
            sortFilter.push({ price: "asc" });
            break;
          case "desc":
            sortFilter.push({ price: "desc" });
            break;
          default:
            break;
        }
      } else if ((query === "query") | (query === "brands")) {
        filters.push({
          term: {
            brand_name: newQuery[query].toLowerCase()
          }
        });
      } else if (query === "product_type") {
        filters.push({
          term: {
            product_type: newQuery[query].toLowerCase()
          }
        });
      } else if (query === "silhouette") {
        filters.push({
          term: {
            "silhouette.keyword": newQuery[query]
          }
        });
      } else if (query === "release_year") {
        filters.push({
          term: {
            "release_year.keyword": newQuery[query]
          }
        });
      }
    }

    let query = Object.keys(newQuery).length
      ? {
          bool: {
            filter: filters
          }
        }
      : { match_all: {} };

    try {
      const result = await axios({
        url: `${context.$config.drypApiURL}/products/filters/new`,
        data: {
          // size: 12,
          from: 0,
          // query: query,
          match: filters
          // sort: sortFilter
        },
        method: "post"
      });
      console.log("*******", query);
      console.log("_________", sortFilter);
      console.log("asdaddas", result.data.products.hits);
      context.store.commit(
        "sneakersData/getSneakers",
        result.data.products.hits
      );

      return {
        page: 1,
        numberOfPages: Math.ceil(result.data.data.total / 12)
      };
    } catch (err) {
      console.log(err);
    }
  },

  middleware: ["check-auth"],
  methods: {
    setSortFilterValue(value) {
      this.sortFilterValue = value;
      this.setPriceAndGenderFilter(
        { name: value, selected: true, value: value },
        "sort"
      );
    },
    stateMaintainSelectedFilters() {
      let key;
      for (key in this.$route.query) {
        if (
          (key !== "query" && key === "brands") ||
          key === "genders" ||
          key === "sizes" ||
          key === "colors"
        ) {
          this[key].forEach(el => {
            if (Array.isArray(this.$route.query[key])) {
              this.$route.query[key].forEach(item => {
                let element = key === "sizes" ? +item : item;
                if (element === el.value) {
                  // this.$set(el, "selected", !el.selected);
                  if ("selected" in el) {
                    // if (el["selected"] == false)
                    this.$set(el, "selected", true);
                    // else this.$set(el, "selected", false);
                  } else this.$set(el, "selected", true);
                }
              });
            }
            //for header filters of brands i.e nike and adidas
            else {
              let item = this.$route.query[key];
              let element = key === "sizes" ? +item : item;
              if (el.value === element) {
                // this.$set(el, "selected", !el.selected);
                if ("selected" in el) {
                  this.$set(el, "selected", true);
                } else this.$set(el, "selected", true);
              } else {
                if ("selected" in el) {
                  delete el["selected"];
                }
              }
            }
          });
        }
        if (key === "prices") {
          this.selectedPrice = this.$route.query[key];
        }
      }
      //to unset all 'selected' key for any filters if pressed on "All" filter
      if (
        Object.keys(this.$route.query).length === 0 &&
        this.$route.query.constructor === Object
      ) {
        this.brands.forEach(el => {
          if ("selected" in el) delete el["selected"];
        });
        this.genders.forEach(el => {
          if ("selected" in el) delete el["selected"];
        });
        /* this.sizes.forEach(el => {
          if ("selected" in el) delete el["selected"];
        }); */
        this.selected = {};
      }
      //for Nike and Adidas filter in header
      if (
        Object.keys(this.$route.query)[0] == "brands" &&
        Object.keys(this.$route.query).length === 1
      ) {
        this.genders.forEach(el => {
          if ("selected" in el) delete el["selected"];
        });
        this.selected = {};
      }
    },
    setRouteQuery(obj, key) {
      if (key === "sort") {
        this.$router.push({
          name: "products",
          query: {
            ...this.$route.query,
            sort: obj.value
          }
        });
        return;
      }

      if (key === "product_type") {
        this.$router.push({
          name: "products",
          query: {
            ...this.$route.query,
            product_type: obj.value
          }
        });
        return;
      }

      let queryValue;
      if (!(key in this.$route.query)) {
        queryValue = [obj.value];
      }
      // if key is present but value of that key is not
      else if (this.$route.query[key].indexOf(obj.value) === -1) {
        if (Array.isArray(this.$route.query[key])) {
          queryValue = [...this.$route.query[key], obj.value];
        } else {
          queryValue = [this.$route.query[key], obj.value];
        }
      }
      // if value with that key is already present then remove that value when filter clicked again
      else {
        let indx = this.$route.query[key].indexOf(obj.value);
        if (!Array.isArray(this.$route.query[key])) {
          this.$route.query[key] = [this.$route.query[key]];
        }
        queryValue = [
          ...this.$route.query[key].slice(0, indx),
          ...this.$route.query[key].slice(indx + 1)
        ];
      }
      this.$router.push({
        name: "products",
        query: {
          ...this.$route.query,
          [key]: [...queryValue]
        }
      });
    },
    setPriceAndGenderFilter(obj, key) {
      if ("selected" in obj) {
        if (obj["selected"] == false) {
          this.$set(obj, "selected", true);
        } else {
          this.$set(obj, "selected", false);
        }
      } else {
        this.$set(obj, "selected", true);
      }
      this.setRouteQuery(obj, key);
    },
    showLists(value) {
      if (value == "brands") {
        this.showOptions.brands = !this.showOptions.brands;
      }
      if (value == "gender") {
        this.showOptions.gender = !this.showOptions.gender;
      }
      if (value == "sizes") {
        this.showOptions.sizes = !this.showOptions.sizes;
      }
      if (value == "prices") {
        this.showOptions.prices = !this.showOptions.prices;
      }
      if (value == "color") {
        this.showOptions.color = !this.showOptions.color;
      }
    },
    updateSlider(e) {
      let clickedElement = e.target,
        min = clickedElement.min,
        max = clickedElement.max,
        val = clickedElement.value;
      this.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
    },
    hideSearchFilter(value) {
      this.isSearchFiltersActive = value;
    },
    selectSizeValue(event) {
      const key = "sizes";
      let sizeIndex = this.sizes.findIndex(
        el => el.value === event.target.innerHTML.trim()
      );

      //for dynamic size filter  (to show which size is selected)
      this.$set(this.selected, sizeIndex, !this.selected[sizeIndex]);
      this.setRouteQuery(this.sizes[sizeIndex], key);
    },
    fetchMore() {
      if (this.page + 1 < this.numberOfPages) {
        this.page = this.page + 1;
        this.fetchSneakers(this.$route.query, this.page);
      }
    },
    fetchSneakers(newQuery, page = 0) {
      // let availableFilters = {
      //   sizes: "size",
      //   genders: "gender",
      //   colors: "color",
      //   brands: "brand_name",
      //   productType: "product_type",
      //   price: "price",
      //   releaseYear: "release_year"
      // };
      console.log("newQuery::>>>", newQuery);
      let filters = {};
      let sortFilter = [];
      // let aggFilter = [];

      // if (typeof newQuery["sizes"] == "string") {
      //   newQuery["sizes"] = [newQuery["sizes"]];
      // }
      // if (typeof newQuery["colors"] == "string") {
      //   newQuery["colors"] = [newQuery["colors"]];
      // }
      // if (typeof newQuery["genders"] == "string") {
      //   newQuery["genders"] = [newQuery["genders"]];
      // }
      // for (let query in newQuery) {
      //   if (query == "query") {
      //     filters.push({
      //       term: {
      //         name: newQuery[query].toLowerCase()
      //       }
      //     });
      //   } else if (
      //     query !== "prices" &&
      //     query in availableFilters &&
      //     Array.isArray(newQuery[query])
      //   ) {
      //     let queryFilter = newQuery[query].map(val => val.toLowerCase());

      //     if (queryFilter.length !== 0) {
      //       if (query === "brands") {
      //         filters.push({
      //           terms: {
      //             "brand_name.keyword": newQuery[query]
      //           }
      //         });
      //       } else {
      //         filters.push({
      //           terms: {
      //             [availableFilters[query]]: queryFilter
      //           }
      //         });
      //       }
      //     }
      //   } else if (query === "prices") {
      //     let value = newQuery[query].split("-");
      //     let lowerValue = value[0];
      //     let higherValue = value[1];
      //     filters.push({
      //       range: {
      //         price: { gte: parseInt(lowerValue), lte: parseInt(higherValue) }
      //       }
      //     });
      //   } else if (query === "sort") {
      //     let tempQuery;
      //     if (Array.isArray(newQuery[query])) {
      //       tempQuery = newQuery[query][0];
      //     } else {
      //       tempQuery = newQuery[query];
      //     }
      //     switch (tempQuery) {
      //       case "latest":
      //         sortFilter.push({ "release_year.keyword": "desc" });
      //         break;
      //       case "popular":
      //         sortFilter.push({ _score: "desc" });
      //         break;
      //       case "asc":
      //         sortFilter.push({ price: "asc" });
      //         break;
      //       case "desc":
      //         sortFilter.push({ price: "desc" });
      //         break;
      //       default:
      //         break;
      //     }
      //   } else if (query === "query" || query === "brands") {
      //     filters.push({
      //       term: {
      //         "brand_name.keyword": newQuery[query]
      //       }
      //     });
      //   } else if (query === "product_type") {
      //     if (Array.isArray(newQuery[query])) {
      //       filters.push({
      //         terms: {
      //           "product_type.keyword": newQuery[query]
      //         }
      //       });
      //     } else {
      //       filters.push({
      //         term: {
      //           "product_type.keyword": newQuery[query]
      //         }
      //       });
      //     }
      //   } else if (query === "silhouette") {
      //     filters.push({
      //       term: {
      //         "silhouette.keyword": newQuery[query]
      //       }
      //     });
      //   } else if (query === "release_year") {
      //     filters.push({
      //       term: {
      //         "release_year.keyword": newQuery[query]
      //       }
      //     });
      //   }
      //   if (query === "colors") {
      //     aggFilter.push({
      //       distinct_colors: {
      //         terms: {
      //           field: "sku"
      //         }
      //       }
      //     });
      //   }
      // }

      filters = Object.entries(newQuery || {}).reduce((acc, [key, value]) => {
        if (key === "sort") {
          return { ...acc };
        }
        console.log(key, value);
        if (key === "prices") {
          let value1 = value.split("-");
          let lowerValue = value1[0];
          let higherValue = value1[1];
          return {
            ...acc,
            [key]: { min: parseInt(lowerValue), max: parseInt(higherValue) }
          };
        } else {
          return {
            ...acc,
            [key === "genders" ? "gender" : key]: [
              "sizes",
              "colors",
              "genders",'brands'
            ].includes(key)
              ? Array.isArray(value) && value.length > 0
                ? [...value]
                : [value]
              : value
          };
        }
      }, {});
      // console.log({ filters1 });
      // Object.keys(filters1).forEach(abc => {
      //   console.log({ abc });
      //   if (abc !== "sort") {
      //     filters[abc] = filters1[abc];
      //   }
      // });
      console.log({ filters });

      let query = Object.keys(newQuery).length ? filters : { match_all: {} };

      this.loading = true;
      axios({
        url: `${this.$config.drypApiURL}/products/filters/new`,
        data: {
          size: 12,
          from: page ? 11 * page + 1 : 0,
          match: filters
          // sort: sortFilter
        },
        method: "post"
      })
        .then(res => {
          this.loading = false;
          if (!page) {
            this.$store.commit("sneakersData/getSneakers", res.data.data);
            this.stateMaintainSelectedFilters();
            this.page = 0;
            this.numberOfPages = Math.ceil(res.data.data.total / 12);
            return;
          }
          this.$store.commit("sneakersData/seeMore", res.data.data.products);
        })
        .catch(() => (this.loading = false));
    },
    getTitleCase(str) {
      return str
        .toLowerCase()
        .trim()
        .split(" ")
        .map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    getFilters() {
      const query =
        "product_type" in this.$route.query
          ? { match: { product_type: this.$route.query.product_type } }
          : { match_all: {} };
      this.$getProductTypes().then(({ data }) => {
        let product_type = {};
        data.aggregations.productTypes.buckets.forEach(productType => {
          product_type[productType.key] = productType.key;
        });
        this.onMountdynamicFilterOptions(product_type, "product_type");
      });

      axios({
        url: `${this.$config.drypApiURL}/filters`,
        data: {
          query: query,
          aggs: {
            brands: {
              terms: {
                field: "brand_name.keyword"
              }
            },
            genders: {
              terms: {
                field: "gender.keyword"
              }
            },
            release_year: {
              terms: {
                field: "release_year.keyword"
              }
            },
            sizes: {
              terms: {
                field: "size.keyword"
              }
            }
          }
        },
        method: "post"
      })
        .then(res => {
          let result = res.data.aggregations;
          let brands = {};
          let genders = {};
          let sizes = {};
          let release_years = {};

          result.brands.buckets.forEach(brand => {
            brands[brand.key] = brand.key;
          });

          result.genders.buckets.forEach(gender => {
            genders[gender.key] = gender.key;
          });

          result.sizes.buckets.forEach(size => {
            sizes[size.key] = size.key;
          });

          result.release_year.buckets.forEach(year => {
            release_years[year.key] = year.key;
          });

          this.onMountdynamicFilterOptions(brands, "brands");
          this.onMountdynamicFilterOptions(genders, "genders");
          this.onMountdynamicFilterOptions(sizes, "sizes");
          this.onMountdynamicFilterOptions(release_years, "release_years");
        })
        .catch(err => console.log(err));

      this.stateMaintainSelectedFilters();
    }
  },
  computed: {
    sneakersData() {
      return this.$store.getters["sneakersData/getSneakersData"];
    }
  },
  watch: {
    "$route.query": {
      handler: function(newVal) {
        this.$data.colors = this.$options.data()["colors"];
        this.$data.prices = this.$options.data()["prices"];
        this.$data.selectedPrice = this.$options.data()["selectedPrice"];
        if (newVal && newVal.query) {
          let capitalizedQuery = newVal.query.replace(/\b\w/g, l =>
            l.toUpperCase()
          );
          if (this.availableFilterBrands.includes(capitalizedQuery)) {
            this.$router.push({
              name: "products",
              query: {
                brands: [capitalizedQuery]
              }
            });
          }
          this.path = "PRODUCTS";
        }
        if (newVal && newVal.brands) {
          this.path = !Array.isArray(newVal.brands)
            ? newVal.brands
            : newVal.brands.length === 1
            ? newVal.brands[0]
            : "ALL";
        }
        if (Object.keys(this.$route.query).length == 0) {
          this.path = "ALL";
        }
        this.stateMaintainSelectedFilters();
        this.fetchSneakers(newVal);
      },
      deep: true,
      immediate: true
    },
    "$route.query.product_type": {
      handler: function(value) {
        this.selectedProductType = value;
        this.getFilters();
      }
    },
    sortFilterValue: {
      handler: function(value) {
        this.setPriceAndGenderFilter(
          { name: value, selected: true, value: value },
          "sort"
        );
      }
    }
  },
  created() {
    if (typeof this.$route.query.sizes == "string") {
      let sizeIndex = this.sizes.findIndex(
        el => el.value === this.$route.query.sizes
      );
      this.$set(this.selected, sizeIndex, !this.selected[sizeIndex]);
    } else {
      let sizeIndex = [];
      for (let el in this.$route.query.sizes) {
        sizeIndex.push(
          this.sizes.findIndex(ele => ele.value === this.$route.query.sizes[el])
        );
      }
      sizeIndex.forEach(el => {
        this.$set(this.selected, el, !this.selected[el]);
      });
    }
  },
  mounted() {
    this.sortFilterValue = this.$route.query?.sort || "latest";
    this.selectedProductType = this.$route.query?.product_type || "";
    this.getFilters();
  }
};
</script>

<style lang="scss" scoped src="@/assets/scss/rangeSlider.scss"></style>
<style lang="scss" scoped>
.main-wrapper {
  .sneaker-nation {
    margin: 0 auto;
    @media screen and (max-width: 1366px) {
      background-size: 100% 100%;
    }
    @media screen and (max-width: 992px) {
      display: none;
    }
  }

  .product-grid-container {
    padding-left: 16px;
    @media screen and (max-width: 992px) {
      padding-left: 0px;
    }
  }

  select#sort-selector {
    min-width: 100px;
    outline: none;
    height: 42px;
    max-width: 170px;
    border: 1px solid rgb(229, 229, 233);
    @media screen and (max-width: 530px) {
      width: 120px;
    }
  }

  .display-filters-mobile {
    display: none;
    background: none;
    border: none;
    margin-right: 16px;
    margin-left: auto;
    font-size: 30px;
    @media screen and (max-width: 992px) {
      display: block;
    }
  }

  .display-filter {
    display: none;
    margin-top: 16px;
    margin-bottom: 16px;
    width: 256px;
    max-width: 25%;
    height: 100%;
    @media screen and (min-width: 992px) {
      display: block;
    }
  }

  background-color: white;
}
.wrapper {
  margin: 0 auto;
  max-width: 136.6rem;
  position: relative;
  min-height: 100vh;
  @media screen and (max-width: 1400px) and (min-width: 993px) {
    padding: 0 5%;
  }
  .filters {
    width: 24%;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: left;
    color: #646464;
    margin-right: 0.6rem;
    @media screen and (max-width: 1367px) {
      min-width: 25%;
    }
    @media screen and (max-width: 767px) {
      min-width: 20%;
    }
    .title {
      padding-top: 4rem;
      padding-bottom: 3.4rem;
    }
    ul {
      .list-title {
        background-color: rgba($base-white, 0.25);
        padding-right: 2rem;
        padding-bottom: 1.5rem;
        padding-left: 2rem;
        padding-top: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px $grey-light;
        p {
          cursor: pointer;
          width: 100%;
          margin: 0;
        }
        img {
          height: 1rem;
          transform: rotate(180deg);
          cursor: pointer;
        }
      }
      .rotateUp {
        img {
          transform: rotate(0deg);
        }
      }
      div {
        li {
          background-color: transparent;
          padding: 0;
          margin-bottom: 2rem;

          border: none;
          width: 100%;
          label {
            cursor: pointer;
          }
          input[type="checkbox"] {
            margin-right: 0.8rem;
            width: 1.6rem;
            height: 1.6rem;
            cursor: pointer;
          }
        }
      }
    }
    .brands,
    .gender,
    .sizes,
    .prices,
    .color {
      &-item-wrapper {
        padding: 1.5rem;
        margin-bottom: 5px;
        label {
          display: flex;
          align-items: center;
        }
      }
    }
    .sizes {
      &-item-wrapper {
        padding-bottom: 2.6rem;
        @media screen and (max-width: 1367px) {
        }
        table {
          border-collapse: separate;
          border-spacing: 0.5rem;
          display: flex;
          tbody {
            margin: 0 auto;
            width: 100%;
            display: inline-table;
          }
          tr {
            td {
              text-align: center;
              border: solid 1px #b4b4b4;
              padding: 1.6rem 1rem;
              cursor: pointer;
              &:hover {
                background-color: $grey-light;
              }
              @media screen and (max-width: 1367px) {
                padding: 1rem;
              }
              @media screen and (max-width: 1140px) {
                padding: 0.5rem;
              }
              @media screen and (max-width: 935px) {
                padding: 0.1rem;
              }
            }
            .selected,
            .selected:hover {
              border: solid 1px $grey-medium;
              background-color: $primary;
              color: #fff;
            }
            .notSize {
              display: none;
            }
          }
        }
      }
    }
    .prices {
      .range {
        .text {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          p {
            padding: 0;
          }
        }
        input {
          width: 100%;
          cursor: pointer;
        }
      }
    }
  }
  .sneakers__wrapper {
    margin-bottom: 10rem;
    // min-height: 100vh;
    .path-sortby {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      padding: 16px;
      font-weight: bold;
      color: rgb(28, 28, 32);

      @media screen and (min-width: 700px) {
        font-size: 14px;
      }

      @media screen and (max-width: 992px) {
        padding: 0px 16px 16px 16px;
      }

      .sortby {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      p {
        color: rgb(104, 104, 110);
        font-weight: 400;
        span {
          color: rgb(19, 19, 21);
          font-weight: bold;
        }
      }
      .path {
        text-transform: uppercase;
      }
      // @media screen and (min-width: 992px) {
      //   padding: 4rem 0rem 3.4rem;
      // }
    }

    .sneakers {
      margin: 0;
      width: 100%;
      @media screen and (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media screen and (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .no-more {
      margin-top: 6.4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        font-size: 2rem;
        text-align: center;
        color: rgb(19, 19, 21);
        width: fit-content;
      }
      button {
        font-size: 1.6rem;
        padding: 1.2rem 3.5rem;
      }
    }
  }
}

.list-group {
  background-color: $base-grey;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.35);
  border-radius: 0;
  margin-bottom: 1rem;
}

.color-item-wrapper {
  background-color: $base-grey;
}

.color-item-container {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.wrapper .filters ul div li input[type="radio"] {
  margin-right: 0.8rem;
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
}

.form-group {
  display: block;
  margin-bottom: 15px;
}

.form-group input {
  padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;
}

.form-group label {
  position: relative;
  cursor: pointer;

  &::selection {
    color: none;
    background: none;
  }
}

.form-group label:before {
  content: "";
  -webkit-appearance: none;
  background-color: $base-white;
  border: solid 1px $grey-dark;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  display: inline-block;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 8px;
  height: 1.7rem;
  width: 1.6rem;
  margin-top: -3px;
}

.form-group input:checked + label:after {
  content: "";
  display: block;
  position: absolute;
  top: 4px;
  left: 5px;
  width: 6px;
  height: 11px;
  border: solid $base-white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.form-group input:checked + label:before {
  background-color: $primary;
}
</style>
