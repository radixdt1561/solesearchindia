<template>
  <div class="product-info">
    <!-- <div class="product-info__sizeGuide">
      <p @click="showSizeGuide = true" class="product-info__sizeGuide--button">
        Size Guide
      </p>
    </div> -->
    <!-- <div class="product-info__sizeGuide--modal-overlay" v-if="showSizeGuide">
      <div class="product-info__sizeGuide--modal-item">
        <SizeGuide showasmodal @closeSizeGuide="showSizeGuide = $event" />
      </div>
    </div> -->
    <!-- <div class="sizes">
      <div class="available-sizes"></div>
      <table>
        <tbody>
          <tr>
            <td @click="add()" :class="{ isSelected: selectedSize['3'] }">3</td>
            <td @click="add()" :class="{ isSelected: selectedSize['3.5'] }">
              3.5
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['4'] }">4</td>
            <td @click="add()" :class="{ isSelected: selectedSize['4.5'] }">
              4.5
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['5'] }">5</td>
            <td @click="add()" :class="{ isSelected: selectedSize['5.5'] }">
              5.5
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['6'] }">6</td>
          </tr>
          <tr>
            <td @click="add()" :class="{ isSelected: selectedSize['6.5'] }">
              6.5
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['7'] }">7</td>
            <td @click="add()" :class="{ isSelected: selectedSize['7.5'] }">
              7.5
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['8'] }">8</td>
            <td @click="add()" :class="{ isSelected: selectedSize['8.5'] }">
              8.5
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['9'] }">9</td>
            <td @click="add()" :class="{ isSelected: selectedSize['9.5'] }">
              9.5
            </td>
          </tr>
          <tr>
            <td @click="add()" :class="{ isSelected: selectedSize['10'] }">
              10
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['10.5'] }">
              10.5
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['11'] }">
              11
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['11.5'] }">
              11.5
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['12'] }">
              12
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['12.5'] }">
              12.5
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['13'] }">
              13
            </td>
          </tr>
          <tr>
            <td @click="add()" :class="{ isSelected: selectedSize['13.5'] }">
              13.5
            </td>

            <td @click="add()" :class="{ isSelected: selectedSize['14'] }">
              14
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['14.5'] }">
              14.5
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['15'] }">
              15
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['16'] }">
              16
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['17'] }">
              17
            </td>
            <td @click="add()" :class="{ isSelected: selectedSize['18'] }">
              18
            </td>
          </tr>
        </tbody>
      </table>
      <div class="size"></div>
    </div> -->
    <form class="product-info-form">
      <label for="brand"> BRAND </label>
      <input
        type="text"
        placeholder="Brand of the product"
        v-model="formData.brand_name"
      />
      <label for="name"> NAME </label>
      <input
        type="text"
        placeholder="Name of the product"
        v-model="formData.name"
      />
      <label for="colorway"> COLORWAY </label>
      <input
        type="text"
        placeholder="Color of the product"
        v-model="formData.colourway"
      />
      <button
        style="max-width:100%"
        class="black-button"
        @click.prevent="sendNotification"
      >
        Notify me!
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import SizeGuide from "@/components/UI/SizeGuide.vue";
export default {
  data() {
    return {
      sizeArray: [
        3,
        3.5,
        4,
        4.5,
        5,
        5.5,
        6,
        6.5,
        7,
        7.5,
        8,
        8.5,
        9,
        9.5,
        10,
        10.5,
        11,
        11.5,
        12,
        12.5,
        13,
        13.5,
        14,
        14.5,
        15,
        16,
        17,
        18
      ],
      selectedSize: {},
      sizeSelected: [],
      formData: {
        brand_name: "",
        name: "",
        colourway: "",
        size: ""
      },
      showSizeGuide: false
    };
  },
  components: { SizeGuide },
  middleware: ["check-auth", "auth"],
  computed: {
    token() {
      return this.$store.getters["authentication/idToken"];
    }
  },
  methods: {
    add() {
      this.formData.size = event.target.innerText;
      const index = this.sizeSelected.indexOf(event.target.innerText);
      if (index == -1) {
        this.sizeSelected.push(event.target.innerText);
      } else {
        this.sizeSelected.splice(index, 1);
      }
      this.selectedSize = Object.fromEntries(
        this.sizeArray.map(key => [key, false])
      );
      for (let i = 0; i < this.sizeSelected.length; i++) {
        // this.selectedSize[this.sizeSelected[i]] = true;
        this.selectedSize[this.formData.size] = true;
      }
      // console.log(this.sizeSelected, this.selectedSize);
    },
    sendNotification() {
      // this.productInfo = !this.productInfo;
      // this.confirmSale = !this.confirmSale;
      // this.finishedstep2 = true;
      // this.onstep3 = true;
      if (
        this.formData.brand_name &&
        this.formData.name &&
        this.formData.colourway
      ) {
        const product = { ...this.formData };
        axios
          .post("not-found-form", product, {
            headers: { Authorization: "Bearer " + this.token }
          })
          .then(res => {
            console.log(res);
            this.formData = {};
            this.sizeSelected = [];
            if (res.status == 200) {
              let successMessage =
                res.data && res.data.message
                  ? { message: "We will notify you.", error: false }
                  : { message: "We will notify you.", error: false };
              this.$store.dispatch(
                "notification_alert/updateNotification",
                successMessage
              );
            }
          })
          .catch(err => {
            console.log(err);
            let errorMessage =
              err.response.data &&
              err.response.data.message &&
              err.response.data.error
                ? { message: "Message not sent", error: true }
                : " ";
            this.$store.dispatch(
              "notification_alert/updateNotification",
              errorMessage
            );
          });
        this.formData = {};
        this.sizeSelected = [];
        this.selectedSize = {};
      } else {
        // if (!this.formData.size) {
        //   let errorMessage = { message: "Please select the size", error: true };
        //   this.$store.dispatch(
        //     "notification_alert/updateNotification",
        //     errorMessage
        //   );
        //   return;
        // }
        if (!this.formData.brand_name) {
          let errorMessage = {
            message: "Please fill the brand_name",
            error: true
          };
          this.$store.dispatch(
            "notification_alert/updateNotification",
            errorMessage
          );
          return;
        }
        if (!this.formData.name) {
          let errorMessage = { message: "Please fill the name", error: true };
          this.$store.dispatch(
            "notification_alert/updateNotification",
            errorMessage
          );
          return;
        }
        if (!this.formData.colourway) {
          let errorMessage = {
            message: "Please fill the colourway",
            error: true
          };
          this.$store.dispatch(
            "notification_alert/updateNotification",
            errorMessage
          );
          return;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.product-info {
  margin: 0 auto;
  @media screen and (max-width: 992px) {
    // width: 60%;
  }
  @media screen and (max-width: 595px) {
    width: 100%;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 1.8rem;
    font-weight: bold;
    text-align: center;
    color: $primary;
  }
  h3 {
    font-size: 1.6rem;
    text-align: center;
    color: $primary;
    margin-bottom: 2.4rem;
  }
  &__sizeGuide {
    display: flex;
    font-size: 1.6rem;
    justify-content: space-between;
    color: $primary;
    &--button {
      text-decoration: underline;
      cursor: pointer;
    }
    &--text {
      background-color: $base-white;
      border-radius: 25px;
      padding: 0 1.5rem;
      & img {
        height: 1rem;
        margin-top: -0.5rem;
      }
    }

    &--modal {
      &-overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
      }
      &-item {
        width: 50%;
        height: 50%;
        position: fixed;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        overflow-y: auto;
        @media screen and (max-width: 992px) {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .sizes {
    margin-bottom: 2.7rem;
    table {
      width: 100%;
      td {
        border: solid 1px $grey-medium;
        background-color: $base-white;
        font-weight: bold;
        text-align: center;
        padding: 1.5rem 2rem;
        font-size: 1.6rem;
        //   text-align: left;
      }
      td:active,
      td:hover {
        background-color: $light-green;
        color: $base-white;
      }
      .isSelected {
        background-color: $primary;
        color: #ffffff;
        &:hover {
          background-color: $primary;
        }
      }
    }
    @media screen and (max-width: 769px) {
      width: 100%;
      table {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .sizes {
      table {
        td {
          padding: 1.5rem;
        }
      }
    }
    padding: 3rem 4.5rem;
  }
  @media screen and (max-width: 1000px) {
    // padding: 3rem 2rem;
    h3 {
      padding: 0;
    }
    .option-buttons {
      .button {
        &-white {
          padding: 1.7rem 3.4rem;
        }
        &-black {
          padding: 1.7rem 1.8rem;
        }
      }
    }
    .sizes {
      table {
        td {
          padding: 1.3rem;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    // padding: 3rem 1rem;
    .sizes {
      table {
        td {
          padding: 1rem;
        }
      }
    }
  }
  @media screen and (max-width: 400px) {
    padding: 3rem 1rem;
    .option-buttons {
      .button {
        &-white {
          padding: 1.7rem 2rem;
        }
        &-black {
          padding: 1.7rem 1.5rem;
        }
      }
    }
    .sizes {
      table {
        td {
          //   padding: 0.5rem;
        }
      }
    }
  }
  &-form {
    display: flex;
    flex-direction: column;
    label {
      font-size: 1.5rem;
      text-align: left;
      color: #646464;
    }
    input {
      padding: 1rem;
      opacity: 0.6;
      border: solid 1px $grey-dark;
      background-color: $base-white;
      width: 100%;
      min-width: 256px;
      outline: none;
      font-size: 1.6rem;
      font-weight: normal;
      text-align: left;
      color: $primary;
      margin-bottom: 2.7rem;
      text-transform: capitalize;
    }
    .button--done {
      font-size: 2rem;
      padding-top: 1.2rem;
      padding-bottom: 1.4rem;
      font-weight: bold;
      //   margin-top: 5rem;
      //   max-height: 5rem;
    }
  }
}
</style>
