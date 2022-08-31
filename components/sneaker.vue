<template>
  <div class="grid">
    <nuxt-link
      class="sneaker"
      v-for="(sneaker, index) in sneakersData"
      :key="index"
      :to="{
        name: 'products-id',
        params: { id: sneaker.slug },
      }"
      custom
      v-slot="{ navigate }"
    >
      <div @click="navigate">
        <div class="sneaker__img mt-4">
          <b-img-lazy
            :src="`${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${sneaker.slug}/${sneaker.main_picture_url}`"
            :alt="sneaker.name"
          />
        </div>
        <div class="w-75">
          <div class="product-name">
            <a :href="`/products/${sneaker.slug}`">{{
              sneaker.name
            }}</a>
          </div>
          <div class="lowest-ask">
            {{
              ["Sneakers", "Streetwear"].includes(
                sneaker.product_type
              )
                ? "Lowest Ask"
                : "Price"
            }}
          </div>
          <div class="product-price">
            &#x20b9;{{
              sneaker.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import { BImgLazy } from "bootstrap-vue";
export default {
  name: "sneakers",
  components: {
    "b-img-lazy": BImgLazy,
  },
  data() {
    return {};
  },
  props: {
    showTag: {
      type: Boolean,
      required: false,
    },
    tagline: {
      type: String,
    },
    sneakersData: {
      type: Array | undefined,
      required: true,
      default: function () {
        return [];
      },
    },
    page: {
      type: Number,
      required: false,
    },
    numberOfPages: {
      type: Number,
      required: false,
    },
  },
  filters: {
    priceFormat(value) {
      value = value.toString();
      var lastThree = value.substring(value.length - 3);
      var otherNumbers = value.substring(0, value.length - 3);
      if (otherNumbers != "") lastThree = "," + lastThree;
      var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return res;
    },
  },
};
</script>
<style lang="scss" scoped>
.grid {
  gap: 0;
}

.product-name {
  font-size: 16px;
  margin-top: 4px;
  font-weight: 400;
  letter-spacing: 0.2px;
  overflow: hidden;
  // max-height: 50px;
  height: 70px;
  // width: 90%;
  @media screen and (max-width: 700px) {
    font-size: 12px;
    height: 40px;
  }
}

.product-name a {
  color: #000;
  text-decoration: none;
}

.lowest-ask {
  margin-top: 12px;
  color: rgb(143, 143, 150);
  font-size: 14px;
  @media screen and (max-width: 700px) {
    font-size: 12px;
  }
}

.product-price {
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 8px;
  @media screen and (max-width: 700px) {
    font-size: 14px;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
}
.sneaker {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  max-width: 40rem;
  max-height: 33.8rem;
  background-color: $base-white;
  border: 0.5px solid #ededed;
  @media screen and (max-width: 400px) {
    border-right: 0;
    text-align: center;
  }
  cursor: pointer;
  &__img {
    height: fit-content;
    img {
      height: 18rem;
      @media screen and (max-width: 1150px) {
        height: 18rem;
      }
      @media screen and (max-width: 320px) {
        height: 15rem;
      }
    }
  }
  @media screen and (max-width: 375px) {
    h6,
    a {
      font-size: 1.3rem;
    }
  }
}
</style>
