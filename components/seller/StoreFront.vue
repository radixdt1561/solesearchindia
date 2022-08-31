<template>
  <div class="store-front">
    <div class="store-front__nav">
      <button
        class="store-front__nav--button"
        :class="[isPendingActive ? 'active' : '']"
        @click="
          isPendingActive = true;
          isSoldProductsActive = false;
          isAcceptedBidsActive = false;
          isPendingBidsActive = false;
        "
      >
        Pending products
      </button>
      <button
        class="store-front__nav--button"
        :class="[isSoldProductsActive ? 'active' : '']"
        @click="
          isPendingActive = false;
          isSoldProductsActive = true;
          isAcceptedBidsActive = false;
          isPendingBidsActive = false;
        "
      >
        Sold products
      </button>

      <button
        class="store-front__nav--button"
        :class="[isPendingBidsActive ? 'active' : '']"
        @click="
          isPendingActive = false;
          isSoldProductsActive = false;
          isAcceptedBidsActive = false;
          isPendingBidsActive = true;
        "
      >
        Pending Bids
      </button>
      <button
        class="store-front__nav--button"
        :class="[isAcceptedBidsActive ? 'active' : '']"
        @click="
          isPendingActive = false;
          isSoldProductsActive = false;
          isPendingBidsActive = false;
          isAcceptedBidsActive = true;
        "
      >
        Accepted Bids
      </button>
    </div>
    <div v-if="isPendingActive || isSoldProductsActive">
      <StoreFrontProductsTable
        :isPendingActive="isPendingActive"
        :isSoldProductsActive="isSoldProductsActive"
      />
    </div>
    <Bids
      :isPendingBidsActive="isPendingBidsActive"
      v-if="isPendingBidsActive || isAcceptedBidsActive"
    />
  </div>
</template>

<script>
import Bids from "@/components/seller/Bids";
import StoreFrontProductsTable from "@/components/seller/StoreFrontProductsTable";

export default {
  components: {
    Bids,
    StoreFrontProductsTable
  },
  data() {
    return {
      isPendingActive: true,
      isSoldProductsActive: false,
      isPendingBidsActive: false,
      isAcceptedBidsActive: false
    };
  }
};
</script>

<style lang="scss" scoped>
.store-front {
  padding: 0 5rem;
  @media screen and (max-width: 1024px) {
    padding: 0 3rem;
  }
  @media screen and (max-width: 640px) {
    padding: 0;
  }
  &__nav {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    gap: 8px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 3rem;

    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 400px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 16px;
    }

    &--button {
      font-size: 2rem;
      font-weight: bold;
      text-align: left;
      background: none;
      color: #0f0f0f;
      border: none;
      outline: none;
      border-bottom: 4.3px solid #c8c8c8;
      text-transform: uppercase;
      margin-bottom: 6rem;

      @media screen and (max-width: 1024px) {
        font-size: 20px;
        white-space: nowrap;
        padding: 0;
      }
      @media screen and (max-width: 575px) {
        margin-bottom: 0;
        font-size: 16px;
      }
      @media screen and (max-width: 420px) {
        font-size: 12px;
      }

      &.active {
        color: $primary;
        border-bottom: 4.3px solid $primary;
      }
    }
  }
}
</style>
