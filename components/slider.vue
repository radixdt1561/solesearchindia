<template>
  <section class="carousel">
    <b-carousel
      id="carousel-fade"
      style="box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px"
      fade
      indicators
    >
      <a src="https://bit.ly/3aL0g47">
        <b-carousel-slide>
          <template v-slot:img class="image-wrapper">
            <picture
              @click="
                redirectToInsider(
                  'https://insider.in/go/royal-enfield-presents-sneakinout-2.0-by-steppinoutxsolesearch'
                )
              "
            >
              <!-- <source
                media="(max-width: 900px)"
                srcset="
                  https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655800333/banners/mobile9_eqx74g
                "
              /> -->
              <img
                src="https://res.cloudinary.com/dx8gt3nnu/image/upload/v1657718828/banners/event-pc_ncyryl.jpg"
                alt=""
              />
            </picture>
          </template>
        </b-carousel-slide>
      </a>
      <!-- <nuxt-link
        :to="{
          path: `/products/air-jordan-1-retro-high-og-'bleached-coral'-555088108`,
        }"
      >
        <b-carousel-slide>
          <template v-slot:img class="image-wrapper">
            <picture>
              <source
                media="(max-width: 900px)"
                srcset="
                  https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655800333/banners/mobile0_yndtzs
                "
              />
              <img
                src="https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655790097/banners/0_g3ejgx"
                alt=""
              />
            </picture>
          </template>
        </b-carousel-slide>
      </nuxt-link>
      <nuxt-link
        :to="{
          path: `/products/wmns-air-jordan-1-zoom-comfort-'bulls'-ct0979610`,
        }"
      >
        <b-carousel-slide>
          <template v-slot:img class="image-wrapper">
            <picture>
              <source
                media="(max-width: 900px)"
                srcset="
                  https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655800332/banners/mobile7_ghbhpo
                "
              />
              <img
                src="https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655791981/banners/7_wdpkpt"
                alt=""
              />
            </picture>
          </template>
        </b-carousel-slide>
      </nuxt-link>
      <nuxt-link
        :to="{
          path: `/products/air-jordan-1-retro-high-og-'dark-marina-blue'-555088404`,
        }"
      >
        <b-carousel-slide>
          <template v-slot:img class="image-wrapper">
            <picture>
              <source
                media="(max-width: 900px)"
                srcset="
                  https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655800333/banners/mobile8_tdmabi
                "
              />
              <img
                src="https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655791981/banners/8_axufph"
                alt=""
              />
            </picture>
          </template>
        </b-carousel-slide>
      </nuxt-link>
      <nuxt-link
        :to="{
          path: `/products/air-jordan-1-retro-high-'85-'college-navy'-bq4422400`,
        }"
      >
        <b-carousel-slide>
          <template v-slot:img class="image-wrapper">
            <picture>
              <source
                media="(max-width: 900px)"
                srcset="
                  https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655800332/banners/mobile1_w11hil
                "
              />
              <img
                src="https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655791981/banners/1_zw8z6i"
                alt=""
              />
            </picture>
          </template>
        </b-carousel-slide>
      </nuxt-link> -->
      <nuxt-link
        :to="{
          path: `/products/air-jordan-4-retro-'red-thunder'-ct8527016`,
        }"
      >
        <b-carousel-slide>
          <template v-slot:img class="image-wrapper">
            <picture>
              <source
                media="(max-width: 900px)"
                srcset="
                  https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655800332/banners/mobile6_ek2wpy
                "
              />
              <img
                src="https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655791981/banners/6_zaa20r"
                alt=""
              />
            </picture>
          </template>
        </b-carousel-slide>
      </nuxt-link>
      <!-- <nuxt-link
        :to="{
          path: `/products/acid-labs-'jet-black-flat-reflective-laces'-`,
        }"
      >
        <b-carousel-slide>
          <template v-slot:img class="image-wrapper">
            <picture>
              <source
                media="(max-width: 900px)"
                srcset="
                  https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655800332/banners/mobile4_jw0t1i
                "
              />
              <img
                src="https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655791981/banners/4_bnopsx"
                alt=""
              />
            </picture>
          </template>
        </b-carousel-slide>
      </nuxt-link> -->

      <!-- <nuxt-link
        :to="{
          path: `/products/hophead-'not-your-basic-t-shirt'-`,
        }"
      >
        <b-carousel-slide>
          <template v-slot:img class="image-wrapper">
            <picture>
              <source
                media="(max-width: 900px)"
                srcset="../assets/images/homepage/mobile5.png"
              />
              <img src="../assets/images/homepage/5.png" alt="" />
            </picture>
          </template>
        </b-carousel-slide>
      </nuxt-link> -->

      <!-- <nuxt-link
        :to="{
          path: `/products/air-jordan-1-retro-high-og-patent-'bred'-555088063`,
        }"
      >
        <b-carousel-slide>
          <template v-slot:img class="image-wrapper">
            <picture>
              <source
                media="(max-width: 900px)"
                srcset="
                  https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655800332/banners/mobile2_ib49ta
                "
              />
              <img
                src="https://res.cloudinary.com/dx8gt3nnu/image/upload/v1655791981/banners/2_s7w342"
                alt=""
              />
            </picture>
          </template>
        </b-carousel-slide>
      </nuxt-link> -->
    </b-carousel>
  </section>
</template>
<script>
import { BCarousel, BCarouselSlide } from "bootstrap-vue";
export default {
  components: {
    "b-carousel": BCarousel,
    "b-carousel-slide": BCarouselSlide,
  },
  methods: {
    redirectToInsider(src) {
      window.open(src, "_blank");
    },
  },
};
</script>

<style lang="scss">
.carousel {
  margin: 0rem auto;
  .carousel-item {
    z-index: 2;
    // max-height: 46rem;
    img {
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    position: relative;
  }
  &-indicators {
    li {
      outline: none;
    }
  }
  @media screen and (max-width: 1366px) {
    max-width: 100vw;
  }
}
</style>
