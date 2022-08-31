<template>
  <div>
    <div class="swiper" v-swiper="swiperOptions" :loadtheme="false">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="i" v-for="(image, i) in imageList">
          <div
            class="d-flex align-items-center justify-content-center"
            style="height:100%"
            @click="
              visible = true;
              selectedImage = i;
            "
          >
            <b-img-lazy
              style="width:100%;height:100%;max-height:500px;max-width:500px;padding:16px;object-fit:contain;cursor:zoom-in"
              :src="
                `${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${slug}/${image}`
              "
              :alt="image"
            />
          </div>
        </div>
      </div>
      <div
        class="swiper-pagination swiper-pagination-bullets"
        id="product-images-pagination"
      ></div>
      <button
        class="swiper-button-prev"
        id="product-images-prev"
        slot="button-prev"
      />
      <button
        class="swiper-button-next"
        id="product-images-next"
        slot="button-next"
      />
    </div>
    <div class="modal-container" v-if="visible">
      <div class="d-flex justify-content-between modal-container ">
        <div
          class="d-flex justify-content-center align-items-center"
          style="flex:1;min-height:450px;"
        >
          <img
            style="width:100%;height:100%;max-height:500px;max-width:500px;object-fit:contain"
            :src="
              `${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${slug}/${imageList[selectedImage]}`
            "
            :alt="selectedImage"
          />
        </div>
        <button
          @click="visible = !visible"
          style="border:none;background:none;position:absolute;right:32px;top:32px"
        >
          <b-x class="cursor" style="transform:scale(4)" />
        </button>
        <div class="image-container">
          <img
            class="cursor"
            :class="{
              active: selectedImage === i,
              inactive: selectedImage !== i
            }"
            :key="i"
            @click="selectedImage = i"
            v-for="(image, i) in imageList"
            style="width:75px;height:75px"
            :src="
              `${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${slug}/${image}`
            "
            :alt="image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconX } from "bootstrap-vue";
export default {
  components: {
    "b-x": BIconX
  },
  props: {
    imageList: {
      type: Array,
      default: []
    },
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedImage: 0,
      visible: false,
      swiperOptions: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        pagination: {
          el: "#product-images-pagination",
          clickable: true
        },
        navigation: {
          nextEl: "#product-images-next",
          prevEl: "#product-images-prev"
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.swiper {
  height: 500px;
  width: 100%;
  @media screen and (max-width: 550px) {
    height: 300px;
  }
}

button {
  background: none;
  border: none;
}

.modal-container {
  flex-direction: column;
  @media screen and (min-width: 993px) {
    flex-direction: row;
  }
}

.image-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  padding-top: 16px;
  padding-bottom: 32px;
  width: 100%;
  border-top: 1px solid lightgrey;
  @media screen and (min-width: 993px) {
    flex-direction: column;
    padding-top: 0;
    padding-bottom: 0;
    width: 14rem;
    height: 100vh;
    border-left: 1px solid lightgrey;
    align-items: center;
  }
}

.active {
  opacity: 1;
}
.inactive {
  opacity: 0.5;
}
</style>
