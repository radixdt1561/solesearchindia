<template>
  <div v-if="productDetails" class="specifications">
    <p class="header">SPECIFICATIONS</p>
    <div class="container">
      <div>
        <div class="title">Authentic</div>
        <div class="value">100% CERTIFIED</div>
      </div>
      <div>
        <div class="title">condition</div>
        <div class="value">brand new</div>
      </div>
      <div>
        <div class="title">sku</div>
        <div class="value">{{ productDetails.sku }}</div>
      </div>
      <div>
        <div class="title">product type</div>
        <div class="value">{{ productDetails.product_type }}</div>
      </div>
      <div>
        <div class="title">release year</div>
        <div class="value">{{ productDetails.release_year }}</div>
      </div>
      <div>
        <div class="title">color</div>
        <div class="value">{{ productDetails.color }}</div>
      </div>
      <div>
        <div class="title">silhouette</div>
        <div class="value">{{ productDetails.silhouette }}</div>
      </div>
      <div>
        <div class="title">nickname</div>
        <div class="value">{{ productDetails.nickname }}</div>
      </div>
      <div>
        <div class="title">brand</div>
        <div class="value">{{ productDetails.brand_name }}</div>
      </div>
      <div>
        <div class="title">details</div>
        <div class="value">{{ productDetails.details }}</div>
      </div>
      <div class="description">
        <div class="title">Description</div>
        <div class="value" style="text-transform:none">
          {{ he.decode(productDetails.story_html) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import he from "he";
export default {
  props: {
    productDetails: {
      type: Object
    }
  },
  data() {
    return {
      he
    };
  }
};
</script>
<style lang="scss" scoped>
.specifications {
  text-transform: uppercase;
  font-weight: 600;
  padding: 16px 0 16px 0;
}

.description {
  grid-column: span 2;
  @media screen and (max-width: 500px) {
    grid-column: span 1;
  }
}

.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 992px;
  gap: 16px;
  margin-top: 16px;
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.header {
  font-size: 18px;
  color: rgb(28, 28, 32) !important;
  letter-spacing: 0.04em;
  margin-left: 15px;
  @media screen and (max-width: 600px) {
    font-size: 14px;
    text-align: center;
  }
}

.title {
  color: rgb(143, 143, 150);
  letter-spacing: 0.01em;
  font-size: 12px;
}

.value {
  color: rgb(104, 104, 110);
  letter-spacing: 0.01em;
  font-size: 16px;
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
}
</style>
