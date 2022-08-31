<template>
  <div class="error">
    <p class="error__sorry--text">
      Sorry we if couldn’t find the product you were looking for
    </p>
    <img
      class="error__sorry--img"
      src="../../assets/images/seller/sad-face2x.png"
      alt="sad face"
    />
    <p class="error__sorry--heading">Fill the product details below</p>
    <p class="error__sorry--desc">
      And we will notify you as soon as we add it to our range.
    </p>
    <productInfo />
  </div>
</template>

<script>
import productInfo from "@/components/seller/productInfo.vue";
export default {
  components: {
    productInfo
  }
};
</script>

<style lang="scss">
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__sorry {
    &--text {
      font-size: 2rem;
      text-align: center;
      color: #646464;
      padding: 0 0.8rem;
      @media screen and (max-width: 550px) {
        padding: 0 2rem;
      }
    }
    &--img {
      width: 10.2rem;
      margin: 3.2rem 0;
    }
    &--heading {
      font-weight: bold;
      text-align: center;
      color: #646464;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    &--desc {
      font-size: 1.6rem;
      text-align: center;
      color: #646464;
      margin-bottom: 2rem;
      @media screen and (max-width: 510px) {
        padding: 0 4.5rem;
      }
      @media screen and (max-width: 400px) {
        padding: 0 1rem;
      }
    }
  }
}
</style>
