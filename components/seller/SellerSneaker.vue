<template>
  <div class="sneakers grid newGridWidth">
    <div
      class="sneaker"
      v-for="(sneaker, index) in sneakersData"
      :key="index"
      @click="selectSneaker(sneaker.slug)"
    >
      <div class="sneaker__img">
        <img
          :src="
            `${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${sneaker.slug}/${sneaker.main_picture_url}`
          "
          :alt="sneaker.name"
        />
      </div>
      <div
        class="sneaker__name d-flex flex-column justify-content-between text-center w-75"
      >
        <h6 class="name">{{ sneaker.name }}</h6>
      </div>
      <button class="black-button ">Select</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "sneakers",
  data() {
    return {
      selectedShoe: ""
    };
  },
  props: {
    showTag: {
      type: Boolean,
      required: false
    },
    tagline: {
      type: String
      // required: true,
    },
    sneakersData: {
      type: Array,
      required: true
    },
    page: {
      type: Number,
      required: false
    },
    numberOfPages: {
      type: Number,
      required: false
    }
  },
  methods: {
    selectSneaker(value) {
      // console.log(value)
      this.selectedShoe = value;
      // console.log(this.selectedShoe);
      this.$emit("selectedShoe", value);
    }
  },
  filters: {
    priceFormat(value) {
      value = value.toString();
      var lastThree = value.substring(value.length - 3);
      var otherNumbers = value.substring(0, value.length - 3);
      if (otherNumbers != "") lastThree = "," + lastThree;
      var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return res;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.sneaker {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  max-width: 37.7rem;
  background-color: $base-white;
  cursor: pointer;
  &__img {
    height: fit-content;
    img {
      height: 25rem;
      @media screen and (max-width: 1015px) {
        height: 18rem;
      }
      @media screen and (max-width: 320px) {
        height: 15rem;
      }
    }
  }
  &__name {
    min-height: 5rem;

    h6,
    a {
      text-decoration: none;
      color: $primary;
      font-size: 1.6rem;
      margin: 0;
    }
    .price {
      color: $button-dark;
      margin-top: 2rem;
    }
  }
  @media screen and (max-width: 375px) {
    h6,
    a {
      font-size: 1.4rem;
    }
  }
  .select--button {
    width: 100%;
    font-size: 1.85rem;
    padding: 1rem 0 1rem 0;
    text-align: center;
  }
}
.newGridWidth {
  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr) !important;
    width: 75%;
    row-gap: 4rem;
  }
}
.sneaker:hover,
.sneaker:active {
  background-color: $base-white;
  text-decoration: none;
  .select--button {
    border: 1px solid #323232 !important;
    background-color: white !important;
    color: #323232 !important;
  }
}
</style>
