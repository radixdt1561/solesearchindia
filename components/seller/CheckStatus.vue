<template>
  <div v-if="shoeStatus" class="check_status">
    <div class="text-center check_status--svg-wrapper">
      <h5 class="check_status--step check_status--step-1 d-none d-lg-block">
        Product listed
      </h5>
      <h5 class="check_status--step check_status--step-1 d-sm-block d-lg-none ">
        Listed
      </h5>
      <h5 class="check_status--step check_status--step-2 d-none d-lg-block">
        Customer ordered
      </h5>
      <h5 class="check_status--step check_status--step-2 d-sm-block d-lg-none">
        Ordered
      </h5>
      <h5 class="check_status--step check_status--step-3 d-none d-lg-block">
        Product received
      </h5>
      <h5 class="check_status--step check_status--step-3 d-sm-block d-lg-none">
        Received
      </h5>
      <h5 class="check_status--step check_status--step-4">
        Authenticity check
      </h5>
      <h5 class="check_status--step check_status--step-5 d-none d-lg-block">
        Product shipped to customer
      </h5>
      <h5 class="check_status--step check_status--step-5 d-sm-block d-lg-none">
        Shipped
      </h5>
      <h5 class="check_status--step check_status--step-6 d-none d-lg-block">
        Product delivered
      </h5>
      <h5 class="check_status--step check_status--step-6 d-sm-block d-lg-none">
        Delivered
      </h5>
      <div class="check_status--shoe_image">
        <b-img-lazy
          rounded="circle"
          :src="
            `${$config.cloudinaryBaseURL}/w_350,h_350,c_scale,q_auto,f_auto/dryp-shoe-pictures/${shoeStatus.slug}/${shoeStatus.main_picture_url}`
          "
          alt="image"
        >
        </b-img-lazy>
      </div>
      <div
        v-html="step00"
        class="check_status--svg"
        v-if="
          !shoeStatus.product_listed_on_dryp &&
            !shoeStatus.customer_ordered &&
            !shoeStatus.product_received_on_dryp &&
            !shoeStatus.authenticity_check &&
            !shoeStatus.product_shipped_to_customer &&
            !shoeStatus.product_delivered
        "
      />
      <div
        v-html="step01"
        class="check_status--svg"
        :style="shoeStatus.product_listed_on_dryp ? 'color=#646464' : ''"
        v-if="
          shoeStatus.product_listed_on_dryp &&
            !shoeStatus.customer_ordered &&
            !shoeStatus.product_received_on_dryp &&
            !shoeStatus.authenticity_check &&
            !shoeStatus.product_shipped_to_customer &&
            !shoeStatus.product_delivered
        "
      />
      <div
        v-html="step02"
        class="check_status--svg"
        :style="shoeStatus.customer_ordered ? 'color=#646464' : ''"
        v-if="
          shoeStatus.product_listed_on_dryp &&
            shoeStatus.customer_ordered &&
            !shoeStatus.product_received_on_dryp &&
            !shoeStatus.authenticity_check &&
            !shoeStatus.product_shipped_to_customer &&
            !shoeStatus.product_delivered
        "
      />
      <div
        v-html="step03"
        class="check_status--svg"
        :style="shoeStatus.product_received_on_dryp ? 'color=#646464' : ''"
        v-if="
          shoeStatus.product_listed_on_dryp &&
            shoeStatus.customer_ordered &&
            shoeStatus.product_received_on_dryp &&
            !shoeStatus.authenticity_check &&
            !shoeStatus.product_shipped_to_customer &&
            !shoeStatus.product_delivered
        "
      />
      <div
        v-html="step04"
        class="check_status--svg"
        :style="shoeStatus.authenticity_check ? 'color=#646464' : ''"
        v-if="
          shoeStatus.product_listed_on_dryp &&
            shoeStatus.customer_ordered &&
            shoeStatus.product_received_on_dryp &&
            shoeStatus.authenticity_check &&
            !shoeStatus.product_shipped_to_customer &&
            !shoeStatus.product_delivered
        "
      />
      <div
        v-html="step05"
        class="check_status--svg"
        :style="shoeStatus.product_shipped_to_customer ? 'color=#646464' : ''"
        v-if="
          shoeStatus.product_listed_on_dryp &&
            shoeStatus.product_listed_on_dryp &&
            shoeStatus.customer_ordered &&
            shoeStatus.product_received_on_dryp &&
            shoeStatus.authenticity_check &&
            shoeStatus.product_shipped_to_customer &&
            !shoeStatus.product_delivered
        "
      />
      <div
        v-html="step06"
        class="check_status--svg"
        :style="shoeStatus.product_delivered ? 'color=#646464' : ''"
        v-if="
          shoeStatus.product_listed_on_dryp &&
            shoeStatus.product_listed_on_dryp &&
            shoeStatus.customer_ordered &&
            shoeStatus.product_received_on_dryp &&
            shoeStatus.authenticity_check &&
            shoeStatus.product_shipped_to_customer &&
            shoeStatus.product_delivered
        "
      />
    </div>
    <button
      @click="$emit('closeCheckStatus')"
      class="black-button small check_status--button"
    >
      Back
    </button>
  </div>
</template>

<script>
import step00 from "~/assets/svg/Stage-00.svg?raw";
import step01 from "~/assets/svg/Stage-01.svg?raw";
import step02 from "~/assets/svg/Stage-02.svg?raw";
import step03 from "~/assets/svg/Stage-03.svg?raw";
import step04 from "~/assets/svg/Stage-04.svg?raw";
import step05 from "~/assets/svg/Stage-05.svg?raw";
import step06 from "~/assets/svg/Stage-06.svg?raw";
import { BImgLazy } from "bootstrap-vue";
export default {
  components: {
    "b-img-lazy": BImgLazy
  },
  props: {
    shoeStatus: {
      type: Object
    }
  },
  data() {
    return {
      step00,
      step01,
      step02,
      step03,
      step04,
      step05,
      step06
    };
  }
};
</script>

<style lang="scss" scoped>
.check_status {
  @media screen and (max-width: 575px) {
    width: 90%;
    margin: 0 auto;
  }
  &--shoe_image {
    height: 35rem;
    width: 35rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $base-white;
    border-radius: 50%;

    @media screen and (min-width: 575px) and (max-width: 602px) {
      height: 20rem;
      width: 20rem;
    }

    @media screen and (min-width: 602px) and (max-width: 708px) {
      height: 30rem;
      width: 30rem;
    }

    @media screen and (max-width: 575px) {
      height: 15rem;
      width: 15rem;
    }
    @media screen and (max-width: 450px) {
      height: 12rem;
      width: 12rem;
    }

    & img {
      max-width: 35rem;
      height: auto;
      width: 100%;
      transform: translateY(-2rem);

      @media screen and (max-width: 575px) {
        max-width: 13rem;
        transform: translateY(0);
      }
      @media screen and (max-width: 450px) {
        max-width: 10rem;
      }
    }
  }
  &--svg-wrapper {
    width: 60rem;
    height: 60rem;
    margin: 0 auto;
    position: relative;

    @media screen and (max-width: 707px) {
      width: 50rem;
      height: 50rem;
    }
    @media screen and (max-width: 600px) {
      width: 40rem;
      height: 40rem;
    }
    @media screen and (max-width: 575px) {
      width: 90%;
      height: 90%;
    }
    @media screen and (min-width: 1800px) {
      width: 70rem;
      height: 70rem;
    }
  }
  &--svg {
    width: inherit;
    height: inherit;
    display: block;
    margin: 0 auto;
  }
  &--step {
    position: absolute;
    width: fit-content;
    font-size: 1.5rem;
    color: $primary;
    text-transform: uppercase;
    @media screen and (min-width: 1800px) {
      font-size: 1.6rem;
    }
    @media screen and (max-width: 575px) {
      font-size: 1.3rem;
      white-space: pre-wrap;
    }
    @media screen and (max-width: 375px) {
      font-size: 1.1rem;
    }
    &-1 {
      top: -2%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-bottom: 2rem;
      @media screen and (max-width: 575px) {
        left: 47%;
      }
    }
    &-2 {
      top: 35%;
      left: 92%;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 575px) {
        top: 35%;
        left: 82%;
      }
    }
    &-3 {
      top: 76%;
      left: 90%;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 575px) {
        top: 77%;
        left: 80%;
      }
    }
    &-4 {
      top: 102%;
      left: 50%;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 575px) {
        top: 102%;
        left: 47%;
      }
    }
    &-5 {
      top: 76%;
      left: 11%;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 575px) {
        top: 77%;
        left: 13%;
      }
    }
    &-6 {
      top: 35%;
      left: 9%;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 575px) {
        top: 35%;
        left: 12%;
      }
    }
  }
  &--button {
    display: block;
    margin: 0 auto;
    margin-top: 7rem;
  }
}
</style>
