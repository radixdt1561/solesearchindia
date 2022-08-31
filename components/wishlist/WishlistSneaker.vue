<template>
  <div class="sneakers grid">
    <div
      class="sneaker"
      v-for="(sneaker, index) in sneakersData"
      :class="{ 'sold-out': sneaker._source.sold }"
      :key="index"
      :to="{
        name: 'products-id',
        params: { id: sneaker._source.slug }
      }"
    >
      <div class="sneaker__img">
        <img
          :src="
            `${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${sneaker._source.slug}/${sneaker._source.main_picture_url}`
          "
          :alt="sneaker._source.name"
        />
      </div>
      <div
        class="sneaker__name d-flex flex-column justify-content-between text-center w-75"
      >
        <h6>{{ sneaker["_source"].name }}</h6>
        <h6 class="price">
          &#x20b9;
          {{
            sneaker["_source"].price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
        </h6>
      </div>

      <nuxt-link
        style="width:100%"
        :to="{
          name: 'products-id',
          params: { id: sneaker._source.slug }
        }"
      >
        <button class="black-button">
          {{ btnMsg }}
        </button>
      </nuxt-link>

      <button class="sneaker-del-button" @click="removeFromWishlist(index)">
        <img
          src="~/assets/images/delete-icon/delete-icon@2x.png"
          alt="edit-image"
        />
      </button>
      <div class="sold-out__icon">
        <img src="../../assets/images/sold/sold@2x.png" alt="sold-out" />
        <span>Sold Out</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "wishlistSneakers",
  data() {
    return {
      btnMsg: "Buy Now"
    };
  },
  props: {
    sneakersData: {
      type: Array,
      required: true
    },
    page: {
      type: Number,
      required: false
    },
    numberOfPages: {
      type: Number,
      required: false
    }
  },
  computed: {
    token() {
      return this.$store.getters["authentication/idToken"];
    }
  },
  methods: {
    removeFromWishlist(index) {
      // console.log("remove", this.sneakersData[index]._source.name);
      let payload = {};
      payload.name = this.sneakersData[index]._source.name;
      payload["wishlist-action"] = false;
      // console.log(payload);
      axios
        .patch("/wish-list", payload, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(res => {
          let successMessage =
            res.data && res.data.message
              ? { message: "Removed from wishlist.", error: false }
              : { message: "Removed from wishlist.", error: false };
          this.$store.dispatch(
            "notification_alert/updateNotification",
            successMessage
          );
          axios
            .get("/wish-list", {
              headers: {
                Authorization: "Bearer " + this.token
              }
            })
            .then(res => {
              this.$store.commit(
                "sneakersData/getWishlistedSneakers",
                res.data.wish_list
              );
            });
        })
        .catch(err => {
          let errorMessage;
          if (
            err.response.data &&
            err.response.data.message &&
            err.response.data.error
          ) {
            errorMessage = {
              message: "Something went wrong.",
              error: true
            };
          }
          this.$store.dispatch(
            "notification_alert/updateNotification",
            errorMessage
          );
        });
    }
  },
  mounted() {
    this.sneakersData.forEach(el => {
      if (el["_source"].sold == true) {
        this.btnMsg = "Explore Similar";
      }
    });
  }
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: white;
}
.sneakers {
  padding-top: 5%;
}
.sneaker,
.sold-out {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  max-width: 33.7rem;
  margin-bottom: 5rem;
  background-color: #fff;
  position: relative;
  cursor: default;
  &__img {
    height: fit-content;
    img {
      height: 25rem;
      @media screen and (max-width: 1150px) {
        height: 18rem;
      }
      @media screen and (max-width: 320px) {
        height: 15rem;
      }
    }
  }
  &__name {
    margin-bottom: 2.4rem;
    height: 7.8rem;
    @media screen and (max-width: 640px) and (min-width: 600px) {
      height: 9rem;
    }
    h6,
    a {
      text-decoration: none;
      font-weight: bold;
      color: black;
      font-size: 1.6rem;
      margin: 0;
    }
    .price {
      color: black;
      margin-top: 2rem;
    }
  }
  .sold-out__icon {
    display: none;
  }
  @media screen and (max-width: 375px) {
    h6,
    a {
      font-size: 1.3rem;
    }
  }
  &-del-button {
    height: 4rem;
    width: 4rem;
    background-color: $base-grey;
    border: solid 1px rgba($primary, 0.28);
    outline: none;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    & img {
      width: 2rem;
      height: auto;
    }
  }
}

.sold-out {
  .sneaker__name {
    h6 {
      color: black;
    }
  }
  .sneaker__img {
    filter: grayscale(100%);
    opacity: 0.5;
  }

  .sold-out__icon {
    position: absolute;
    left: 1rem;
    top: 1rem;
    display: flex;
    align-items: center;
    img {
      width: 2.5rem;
      margin-right: 0.9rem;
    }
    span {
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      color: #323232;
    }
  }
}
</style>
