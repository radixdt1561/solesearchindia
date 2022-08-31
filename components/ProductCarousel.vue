<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <div
        class="
      d-flex align-items-center"
      >
        <div class="product-carousel-title">{{ title }}</div>
        <InfoModal :title="title" :description="description" :id="id" />
      </div>
      <nuxt-link
        class="d-flex align-items-center"
        style="font-size:16px;color:#006340;gap:4px;"
        :to="{
          path: '/products',
          query: {
            product_type: productType
          }
        }"
      >
        <div>See All</div>
        <BIconArrowRight />
      </nuxt-link>
    </div>
    <div style="margin-top:32px">
      <div class="swiper" v-swiper="swiperOptions" :loadtheme="false">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            :key="i"
            v-for="(product, i) in productData"
          >
            <div
              class="container"
              v-if="productType != 'Sneakers' && productType != 'Streetwear'"
            >
              <div class="cursor" @click="onClick(product.slug)">
                <b-img-lazy
                  width="200px"
                  height="200px"
                  :src="
                    `${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${product.slug}/${product.main_picture_url}`
                  "
                  :alt="product.name"
                />
              </div>
              <div class="product-name">{{ product["name"] }}</div>
              <div class="lowest-ask">
                Lowest Ask
              </div>
              <p class="product-price">
                &#x20b9;{{
                  product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </p>
            </div>
            <div class="container" v-else>
              <div class="cursor" @click="onClick(product[0])">
                <b-img-lazy
                  width="200px"
                  height="200px"
                  :src="
                    `${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${product[0]}/display_picture.png`
                  "
                  :alt="product[1]"
                />
              </div>
              <div class="product-name">{{ product[1] }}</div>
              <div class="lowest-ask">
                Lowest Ask
              </div>
              <p class="product-price">
                &#x20b9;{{
                  product[2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </p>
            </div>
          </div>
        </div>
        <div
          :id="'pagination' + id"
          class="swiper-pagination swiper-pagination-bullets toggle"
        ></div>
        <button
          class="swiper-button-prev"
          :id="prev"
          slot="button-prev"
        ></button>
        <button
          class="swiper-button-next"
          :id="next"
          slot="button-next"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
import InfoModal from "@/components/InfoModal.vue";
import { BImgLazy, BIconArrowRight } from "bootstrap-vue";
export default {
  props: {
    productType: {
      type: String,
      default: "Sneakers"
    },
    title: {
      type: String,
      default: "Title"
    },
    id: {
      type: String,
      default: "info"
    },
    description: {
      type: String,
      default: "description"
    },
    productData: {
      type: Array,
      default: []
    }
  },
  components: {
    InfoModal,
    "b-img-lazy": BImgLazy,
    BIconArrowRight
  },
  computed: {
    swiperOptions() {
      return {
        pagination: {
          el: "#pagination" + this.id,
          clickable: true
        },
        navigation: {
          nextEl: "#" + this.next,
          prevEl: "#" + this.prev
        },
        breakpoints: {
          1800: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 0
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 0
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 0
          },
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 0
          },
          300: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            pagination: false
          }
        }
      };
    },
    next() {
      return "next-" + this.id;
    },
    prev() {
      return "prev-" + this.id;
    }
  },
  methods: {
    onClick(slug) {
      this.$router.push({ path: `products/${slug}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-button-next::after,
.swiper-button-prev::after {
  height: 100px;
}

button {
  background: none;
  border: none;
}

.toggle {
  display: none;
  @media screen and (min-width: 640px) {
    display: block;
  }
}

.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 0;
}

.swiper {
  height: 400px;
  width: 100%;
  @media screen and (max-width: 640px) {
    height: 350px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  img {
    text-align: center;
  }
  @media screen and (min-width: 994px) {
    margin-left: 20px;
  }
  @media screen and (max-width: 993px) {
    align-items: center;
    text-align: center;
  }
}

.product-name {
  font-size: 16px;
  height: 60px;
  width: 100%;
  overflow: hidden;
  margin-top: 4px;
  font-weight: 500;
  // @media screen and (min-width: 1024px) {
  //   width: 80%;
  // }

  @media screen and (max-width: 450px) {
    font-size: 12px;
    height: 40px;
  }
}

.lowest-ask {
  margin-top: 4px;
  color: rgb(143, 143, 150);
  font-size: 14px;
  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
}

.product-price {
  font-size: 18px;
  font-weight: 600;
  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
}
</style>
