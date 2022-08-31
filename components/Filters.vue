<template>
  <div class="filter-container">
    <div>
      <div class="header" @click="toggles.categories = !toggles.categories">
        <div>PRODUCT CATEGORY</div>
        <button>
          <b-caret :rotate="toggles.categories ? '90' : '0'" />
        </button>
      </div>
      <b-collapse v-model="toggles.categories">
        <div class="d-flex flex-column" style="gap:16px">
          <button
            v-for="productType in productFilters.product_type"
            :key="productType.value"
            class="blue-button"
            :class="
              selectedProductType === productType.value ? 'active' : 'inactive'
            "
            @click="selectProductType(productType.value)"
          >
            {{ productType.value }}
          </button>
        </div>
      </b-collapse>
    </div>
    <div>
      <div class="header" @click="toggles.brands = !toggles.brands">
        <div>BRANDS</div>
        <button>
          <b-caret :rotate="toggles.brands ? '90' : '0'" />
        </button>
      </div>
      <b-collapse v-model="toggles.brands">
        <ul>
          <li v-for="brand in productFilters.brands" :key="brand.value">
            <div class="d-flex align-items-center" style="gap:4px">
              <input
                :id="brand.value"
                type="checkbox"
                :value="brand.value"
                :checked="
                  brand.selected ||
                    (brand.value &&
                      $route.query &&
                      $route.query.brands &&
                      $route.query.brands.includes(brand.value))
                "
                @click="setFilters(brand, 'brands')"
              />
              <label :for="brand.value">&nbsp;{{ brand.value }}</label>
            </div>
          </li>
        </ul>
      </b-collapse>
    </div>
    <div>
      <div class="header" @click="toggles.genders = !toggles.genders">
        <div>GENDER</div>
        <button>
          <b-caret :rotate="toggles.genders ? '90' : '0'" />
        </button>
      </div>
      <b-collapse v-model="toggles.genders">
        <div class="gender-grid">
          <button
            class="gender-button"
            :class="
              gender.value &&
                  $route.query &&
                  $route.query.genders &&
                  $route.query.genders.includes(gender.value)
                ? 'active'
                : 'inactive'
            "
            v-for="gender in productFilters.genders"
            :key="gender.value"
            @click="setFilters(gender, 'genders')"
          >
            {{ gender.value }}
          </button>
        </div>
      </b-collapse>
    </div>
    <div>
      <div class="header" @click="toggles.sizes = !toggles.sizes">
        <div>SIZES</div>
        <button>
          <b-caret :rotate="toggles.sizes ? '90' : '0'" />
        </button>
      </div>
      <b-collapse v-model="toggles.sizes">
        <div class="size-grid">
          <button
            class="size-button"
            :class="size.value &&
                      $route.query &&
                      $route.query.sizes &&
                      $route.query.sizes.includes(size.value) ? 'active' : 'inactive'"
            v-for="size in productFilters.sizes"
            :key="size.value"
            @click="setFilters(size, 'sizes')"
          >
            {{ size.value }}
          </button>
        </div>
      </b-collapse>
    </div>
    <div>
      <div class="header" @click="toggles.prices = !toggles.prices">
        <div>PRICES</div>
        <button>
          <b-caret :rotate="toggles.prices ? '90' : '0'" />
        </button>
      </div>
      <b-collapse v-model="toggles.prices">
        <ul>
          <li v-for="price in prices" :key="price.value">
            <div class="d-flex align-items-center" style="gap:4px">
              <input
                type="radio"
                :id="price.value"
                :value="price.value"
                @change="selectPrice"
                v-model="selectedPrice"
              />
              <label :for="price.value">&nbsp;{{ price.name }}</label>
            </div>
          </li>
        </ul>
      </b-collapse>
    </div>
    <div>
      <div class="header" @click="toggles.colors = !toggles.colors">
        <div>COLORS</div>
        <button>
          <b-caret :rotate="toggles.colors ? '90' : '0'" />
        </button>
      </div>
      <b-collapse v-model="toggles.colors">
        <div class="color-container">
          <div v-for="color in colors" :key="color.value">
            <button
              :class="color.value &&
                      $route.query &&
                      $route.query.colors &&
                      $route.query.colors.includes(color.value) ? 'active' : 'inactive'"
              class="d-flex align-items-center color-box"
              @click="setFilters(color, 'colors')"
            >
              <span
                :style="
                  color.value !== 'Multi'
                    ? `background-color:${color.backgroundColor}`
                    : `background-image: ${color.backgroundImage}`
                "
              ></span>
              {{ color.value }}
            </button>
          </div>
        </div>
      </b-collapse>
    </div>
    <div>
      <div
        class="header"
        @click="toggles.release_years = !toggles.release_years"
      >
        <div>RELEASE YEAR</div>
        <button>
          <b-caret :rotate="toggles.release_years ? '90' : '0'" />
        </button>
      </div>
      <b-collapse v-model="toggles.release_years">
        <select class="select-year" v-model="selectedYear">
          <option value="" disabled selected hidden>Select Year</option>
          <option
            :key="i"
            v-for="(release_year, i) in productFilters.release_years"
            :value="release_year.value"
            >{{ release_year.value }}</option
          >
        </select>
      </b-collapse>
    </div>
  </div>
</template>
<script>
import { filterOptionsMixin } from "@/mixins/filterOptionsMixin";
import { BCollapse, BIconChevronRight } from "bootstrap-vue";
export default {
  components: {
    "b-collpase": BCollapse,
    "b-caret": BIconChevronRight
  },
  mixins: [filterOptionsMixin],
  props: {
    productFilters: {
      type: Object
    },
    setFilters: {
      type: Function
    },
    getFilters: {
      type: Function
    }
  },
  data() {
    return {
      selectedProductType: "",
      selectedPrice: "",
      selectedYear: "",
      toggles: {
        categories: false,
        brands: false,
        genders: false,
        prices: false,
        sizes: false,
        colors: false,
        release_years: false
      }
    };
  },
  methods: {
    selectPrice(event) {
      this.selectedPrice = event.target.value;
      this.$router.push({
        name: "products",
        query: {
          ...this.$route.query,
          prices: this.selectedPrice
        }
      });
    },
    selectProductType(value) {
      this.selectedProductType = value;
      this.getFilters();
      this.$router.push({
        name: "products",
        query: {
          product_type: value
        }
      });
    }
  },
  watch: {
    "$route.query.product_type": {
      handler: function(value) {
        this.selectedProductType = value;
      }
    },
    selectedYear: {
      handler: function(value) {
        this.$router.push({
          name: "products",
          query: {
            ...this.$route.query,
            release_year: value
          }
        });
      }
    }
  },
  computed: {
    toggleActive() {
      this.$route.query.colors
        ? (this.toggles.colors = true)
        : (this.toggles.colors = false);
      this.$route.query.prices
        ? (this.toggles.prices = true)
        : (this.toggles.prices = false);
      this.$route.query.sizes
        ? (this.toggles.sizes = true)
        : (this.toggles.sizes = false);
      this.$route.query.genders
        ? (this.toggles.genders = true)
        : (this.toggles.genders = false);
      this.$route.query.brands
        ? (this.toggles.brands = true)
        : (this.toggles.brands = false);
      this.$route.query.release_year
        ? (this.toggles.release_years = true)
        : (this.toggles.release_years = false);
    },
  },
  async mounted() {
    await this.colors.forEach(color => {
      if (
        this.$route.query &&
        this.$route.query.colors &&
        this.$route.query.colors.includes(color.value)
      ) {
        color.selected = true;
      }
    });
    this.productFilters.sizes.forEach(size => {
      if (
        this.$route.query &&
        this.$route.query.sizes &&
        this.$route.query.sizes.includes(size.value)
      ) {
        size.selected = true;
      }
    });
    this.selectedProductType = this.$route.query?.product_type || "";
    this.toggleActive;
    this.selectedPrice = this.$route.query?.prices || "";
    this.selectedYear = this.$route.query?.release_year || "";
  }
};
</script>
<style lang="scss" scoped>
.filter-container {
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(242, 242, 252);

  .select-year {
    height: 50px;
    width: 80%;
    color: rgb(72, 72, 76);
    border: 1px solid rgb(229, 229, 233);
    font-size: 14px;
    outline: none;
  }

  .active {
    background: black;
    color: white;
    border: 1px solid black;
  }

  .inactive {
    color: rgb(19, 19, 21);
    border: 1px solid rgb(19, 19, 21);
    background: white;
  }

  .size-button {
    min-height: 36px;
    border-radius: 5px;
    font-weight: 500;
    font-size: 14px;
  }

  .gender-button {
    @extend .size-button;
    width: 80px;
  }

  .size-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
    @media screen and (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }
    gap: 4px;
  }

  .gender-grid {
    @extend .size-grid;
    grid-template-columns: repeat(auto-fit, 80px);
    gap: 8px;
  }

  span {
    height: 16px;
    width: 16px;
    display: inline-block;
    border-radius: 50%;
    border: 1px solid lightgray;
  }

  .color-box {
    gap: 8px;
    width: 100%;
    padding: 8px 0 8px;
    border: 0.5px solid rgb(19, 19, 21);
    border-radius: 5px;
    font-weight: 500;
    justify-content: center;
    font-size: 10px;
    text-transform: uppercase;
  }

  .color-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    color: rgb(72, 72, 76);
  }

  .header {
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    padding: 16px 0 16px;
    letter-spacing: 0.2px;
    display: flex;
    justify-content: space-between;
    color: #ee2257;
    button {
      background: none;
      border: none;
      svg {
        color: #ee2257;
      }
    }
    button:active {
      background: none;
      border: none;
    }
  }

  .blue-button {
    height: 42px;
    border-radius: 5px;
    font-size: 12px;
    letter-spacing: 1.44px;
    padding: 0 14px 0 14px;
    font-weight: 600;
    max-width: 130px;
    text-transform: uppercase;
  }

  button:active {
    background: black;
    color: white;
    border: 1px solid black;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    border: 2px solid rgb(72, 72, 76);
    border-radius: 4px;
    cursor: pointer;
  }

  input[type="radio"] {
    width: 18px;
    height: 18px;
    border: 2px solid rgb(72, 72, 76);
    border-radius: 4px;
    cursor: pointer;
  }

  ul {
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li + li {
      margin-top: 8px;
    }
  }
}
</style>
