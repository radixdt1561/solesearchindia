<template>
  <div class="thumbsup">
    <img :src="require(`../assets/images/ack/${src}`)" alt="" />
    <div class="text">
      <p class="thank-you">{{ heading }}</p>
      <p class="notify">
        {{ description }}
      </p>
      <nuxt-link :to="href">
        <button class="black-button" @click="buyerSignedUp">{{ msg }}</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String
    },
    description: {
      type: String
    },
    msg: {
      type: String
    },
    href: {
      type: String
    },
    src: {
      type: String,
      default: "icon@2x.png"
    }
  },
  methods: {
    buyerSignedUp() {
      this.$emit("buyerSignedUp", true);
    }
  },
  mounted() {
    this.$emit("hideNav", true);
  }
};
</script>

<style lang="scss" scoped>
.thumbsup {
  min-height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  // padding: 5rem;
  @media screen and (max-width: 550px) {
    padding: 5rem 0;
  }
  img {
    margin: 0 auto;
    margin-top: 20rem;
    width: 16rem;
    // @media screen and (max-width: 768px) {
    margin-top: 7rem;
    width: 10.2rem;
    align-self: flex-end;
    // }
  }
  .text {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    // @media screen and (max-width: 768px) {
    margin: 0 auto;
    margin-top: 2.9rem;
    margin-bottom: 8rem;
    // }
    .thank-you {
      font-weight: bold;
      text-align: center;
      color: black;
      // @media screen and (max-width: 768px) {
      font-size: 2rem;
      // }
    }
    .notify {
      font-size: 3.2rem;
      text-align: center;
      color: black;
      font-weight: 500;
      margin: 0 auto;
      margin-top: 7.9rem;
      margin-bottom: 8.7rem;

      margin-top: 2.7rem;
      margin-bottom: 2.9rem;
      font-size: 1.6rem;

      @media screen and (max-width: 450px) {
        width: 100%;
      }
    }
    .sell {
      cursor: pointer;
      width: 40rem;
      margin: 0 auto;
      @media screen and (max-width: 550px) {
        width: 90%;
      }
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
