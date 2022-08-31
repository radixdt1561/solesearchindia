<template>
  <div class="payment">
    Your shipping and payment address must match to ensure a safe transaction
    for yourself and the seller.
  </div>
</template>

<script>
export default {
  mounted() {
    this.$emit("payBtn"); //to show pay button instead of next
  }
};
</script>

<style lang="scss">
.payment {
  font-size: 16px;
  text-align: center;
}
</style>
