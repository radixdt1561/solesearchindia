<template>
  <div>
    <div class="size-selector" @click="flip = !flip">
      <div>Size:</div>
      <div style="font-weight:bold;">
        {{ selected || "All" }}
        <b-arrow :flip-v="flip" />
      </div>
    </div>
    <div v-if="flip" style="position:relative">
      <div class="size-card">
        <div
          class="sizes"
          :key="index"
          v-for="(size, index) in sizes"
          @click="() => handleClick(size)"
        >
          <p style="font-weight:bold;font-size:16px">
            {{ productType === "Sneakers" ? "UK" : "" }}{{ size }}
          </p>
          <p style="font-size:14px;color:green">
            &#x20b9;{{
              products[size]["price"]
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconArrowDown } from "bootstrap-vue";
export default {
  components: {
    "b-arrow": BIconArrowDown
  },
  model: {
    prop: "selected",
    event: "change"
  },
  props: {
    productType: {
      type: String,
      default: ""
    },
    products: {
      type: Object,
      required: true
    },
    selected: {
      type: String,
      default: "All"
    }
  },
  data() {
    return {
      flip: false
    };
  },
  methods: {
    handleClick(size) {
      this.$emit("change", size);
      this.$emit("priceChange", this.products[size]["price"]);
      this.$emit("productIdChange", this.products[size]["product_id"]);
      this.flip = !this.flip;
    }
  },
  computed: {
    sizes() {
      if (this.productType === "Sneakers") {
        return Object.keys(this.products).sort(
          (a, b) => parseInt(a.price) - parseInt(b.price)
        );
      } else {
        return Object.keys(this.products);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.size-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  height: 40px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  &:hover {
    border: 1px solid black;
  }
}
.size-card {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: 75px;
  gap: 8px;
  background: white;
  overflow-y: scroll;
  height: 300px;
  width: 100%;
  position: absolute;
  z-index: 10;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  @media screen and (min-width: 720px) {
    height: 380px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
}
.sizes {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 75px;
  height: 64px;
  border: 1px solid lightgrey;
  cursor: pointer;
}

.sizes:hover,
.sizes:active {
  background-color: #f9f9f9;
  text-decoration: none;
}
.size-card::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
