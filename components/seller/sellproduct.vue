<template>
  <div>
    <div v-if="!verified" class="verification">
      <p>You need to verify yourself in order to list/sell with us.</p>
      <button class="black-button">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfZ_w5idnb36cxj4aQxU8watMw78OzLkz_W-Vt-ADajlaL9Zw/viewform"
        >
          Verify me</a
        >
      </button>
    </div>
    <div v-else class="product-status">
      <div
        v-if="!finishedstep3 && (finishedstep1 || finishedstep2)"
        style="margin-left:32px;font-size:16px;font-weight:600"
      >
        <button class="black-button " style="width:100px" @click="handleBack">
          BACK
        </button>
      </div>
      <div class="steps">
        <div class="steps-1-wrapper">
          <div
            class="steps-1"
            :class="{ onstep: onstep1, finishedstep: finishedstep1 }"
          >
            <span v-if="!finishedstep1">1</span>
            <img
              style="width: 3rem"
              src="~/assets/images/check/check@2x.png"
              alt="check-img"
              v-if="finishedstep1"
            />
          </div>
          <p :class="{ onsteptext: onstep1 }">SEARCH PRODUCT</p>
        </div>
        <div class="steps-progress-line-wrapper line-1">
          <div
            class="steps-progress-line left-1"
            :class="{ onstep: onstep1, finishedstep: finishedstep1 }"
          ></div>
          <div
            class="steps-progress-line right-1"
            :class="{ onstep: onstep2, finishedstep: finishedstep2 }"
          ></div>
        </div>
        <div class="steps-1-wrapper">
          <div
            class="steps-1"
            :class="{ onstep: onstep2, finishedstep: finishedstep2 }"
          >
            <span v-if="!finishedstep2">2</span>
            <img
              style="width: 3rem"
              src="~/assets/images/check/check@2x.png"
              alt="check-img"
              v-if="finishedstep2"
            />
          </div>
          <p :class="{ onsteptext: onstep2 }">PRODUCT INFO</p>
        </div>
        <div class="steps-progress-line-wrapper line-2">
          <div
            class="steps-progress-line left-2"
            :class="{ onstep: onstep2, finishedstep: finishedstep2 }"
          ></div>
          <div
            class="steps-progress-line right-2"
            :class="{ onstep: onstep3, finishedstep: finishedstep3 }"
          ></div>
        </div>

        <div class="steps-1-wrapper">
          <div
            class="steps-1"
            :class="{ onstep: onstep3, finishedstep: finishedstep3 }"
          >
            <span v-if="!finishedstep3">3</span>
            <img
              style="width: 3rem"
              src="~/assets/images/check/check@2x.png"
              alt="check-img"
              v-if="finishedstep3"
            />
          </div>
          <p :class="{ onsteptext: onstep3 }">CONFIRM SALE</p>
        </div>
      </div>
      <b-overlay :show="loading">
        <div class="search-wrapper" v-if="searchWrapper">
          <p>Please list only New and Unused products.</p>
          <p>Choose a product</p>
          <div class="input-wrapper">
            <input
              type="text"
              placeholder="Search product by name, brand, color, sku, etc."
              v-model="queryString"
            />
            <img
              src="~/assets/images/seller/search-icon@2x.png"
              alt="search-icon"
            />
          </div>
          <sneaker :sneakersData="sneakersData" @selectedShoe="selectedShoe" />
          <errorPage style="margin-top:32px" v-if="queryString.length >= 3" />
          <div class="upload-csv" v-if="sneakersData.length <= 0">
            <p>Upload your Csv file here</p>
            <div class="d-flex">
              <input
                type="file"
                ref="file"
                accept=".csv"
                @change="selectFile"
              />
              <button class="black-button small ml-3" @click="upload">
                Upload
              </button>
            </div>
          </div>
        </div>
        <div
          class="product-info"
          v-else-if="productInfo && singleSneakersData"
        >
          <h2>Choose a Size</h2>
          <h3>Review the product details below</h3>
          <div class="product-info__sizeGuide">
            <button
              v-b-toggle.size-guide-sidebar
              style="border:none;background:none;text-decoration:underline"
              v-if="
                singleSneakersData['product_type'].toLowerCase() ===
                  'sneakers'
              "
            >
              Size Guide
            </button>
          </div>
          <div class="sizes">
            <table>
              <tbody
                v-if="
                  singleSneakersData[
                    'product_type'
                  ].toLowerCase() === 'sneakers'
                "
              >
                <tr>
                  <td
                    @click="add(2)"
                    :class="{ isSelected: selectedSize === 2 }"
                  >
                    2 UK
                  </td>
                  <td
                    @click="add(2.5)"
                    :class="{ isSelected: selectedSize === 2.5 }"
                  >
                    2.5 UK
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add(3)"
                    :class="{ isSelected: selectedSize === 3 }"
                  >
                    3 UK
                  </td>
                  <td
                    @click="add(3.5)"
                    :class="{ isSelected: selectedSize === 3.5 }"
                  >
                    3.5 UK
                  </td>
                  <td
                    @click="add(4)"
                    :class="{ isSelected: selectedSize === 4 }"
                  >
                    4 UK
                  </td>
                  <td
                    @click="add(4.5)"
                    :class="{ isSelected: selectedSize === 4.5 }"
                  >
                    4.5 UK
                  </td>
                  <td
                    @click="add(5)"
                    :class="{ isSelected: selectedSize === 5 }"
                  >
                    5 UK
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add(5.5)"
                    :class="{ isSelected: selectedSize === 5.5 }"
                  >
                    5.5 UK
                  </td>
                  <td
                    @click="add(6)"
                    :class="{ isSelected: selectedSize === 6 }"
                  >
                    6 UK
                  </td>
                  <td
                    @click="add(6.5)"
                    :class="{ isSelected: selectedSize === 6.5 }"
                  >
                    6.5 UK
                  </td>
                  <td
                    @click="add(7)"
                    :class="{ isSelected: selectedSize === 7 }"
                  >
                    7 UK
                  </td>
                  <td
                    @click="add(7.5)"
                    :class="{ isSelected: selectedSize === 7.5 }"
                  >
                    7.5 UK
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add(8)"
                    :class="{ isSelected: selectedSize === 8 }"
                  >
                    8 UK
                  </td>
                  <td
                    @click="add(8.5)"
                    :class="{ isSelected: selectedSize === 8.5 }"
                  >
                    8.5 UK
                  </td>
                  <td
                    @click="add(9)"
                    :class="{ isSelected: selectedSize === 9 }"
                  >
                    9 UK
                  </td>
                  <td
                    @click="add(9.5)"
                    :class="{ isSelected: selectedSize === 9.5 }"
                  >
                    9.5 UK
                  </td>
                  <td
                    @click="add(10)"
                    :class="{ isSelected: selectedSize === 10 }"
                  >
                    10 UK
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add(10.5)"
                    :class="{ isSelected: selectedSize === 10.5 }"
                  >
                    10.5 UK
                  </td>
                  <td
                    @click="add(11)"
                    :class="{ isSelected: selectedSize === 11 }"
                  >
                    11 UK
                  </td>
                  <td
                    @click="add(11.5)"
                    :class="{ isSelected: selectedSize === 11.5 }"
                  >
                    11.5 UK
                  </td>
                  <td
                    @click="add(12)"
                    :class="{ isSelected: selectedSize === 12 }"
                  >
                    12 UK
                  </td>
                  <td
                    @click="add(12.5)"
                    :class="{ isSelected: selectedSize === 12.5 }"
                  >
                    12.5 UK
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add(13)"
                    :class="{ isSelected: selectedSize === 13 }"
                  >
                    13 UK
                  </td>
                  <td
                    @click="add(13.5)"
                    :class="{ isSelected: selectedSize === 13.5 }"
                  >
                    13.5 UK
                  </td>

                  <td
                    @click="add(14)"
                    :class="{ isSelected: selectedSize === 14 }"
                  >
                    14 UK
                  </td>
                  <td
                    @click="add(14.5)"
                    :class="{ isSelected: selectedSize === 14.5 }"
                  >
                    14.5 UK
                  </td>
                  <td
                    @click="add(15)"
                    :class="{ isSelected: selectedSize === 15 }"
                  >
                    15 UK
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add(16)"
                    :class="{ isSelected: selectedSize === 16 }"
                  >
                    16 UK
                  </td>
                  <td
                    @click="add(17)"
                    :class="{ isSelected: selectedSize === 17 }"
                  >
                    17 UK
                  </td>
                  <td
                    @click="add(18)"
                    :class="{ isSelected: selectedSize === 18 }"
                  >
                    18 UK
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td
                    @click="add('XXS')"
                    :class="{ isSelected: selectedSize === 'XXS' }"
                  >
                    XXS
                  </td>
                  <td
                    @click="add('XS')"
                    :class="{ isSelected: selectedSize === 'XS' }"
                  >
                    XS
                  </td>
                  <td
                    @click="add('S')"
                    :class="{ isSelected: selectedSize === 'S' }"
                  >
                    S
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('M')"
                    :class="{ isSelected: selectedSize === 'M' }"
                  >
                    M
                  </td>
                  <td
                    @click="add('Oversized Fit 1')"
                    :class="{ isSelected: selectedSize === 'Oversized Fit 1' }"
                  >
                    Oversized Fit 1
                  </td>
                  <td
                    @click="add('Oversized Fit 2')"
                    :class="{ isSelected: selectedSize === 'Oversized Fit 2' }"
                  >
                    Oversized Fit 2
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('Fit 1')"
                    :class="{ isSelected: selectedSize === 'Fit 1' }"
                  >
                    Fit 1
                  </td>
                  <td
                    @click="add('Fit 2')"
                    :class="{ isSelected: selectedSize === 'Fit 2' }"
                  >
                    Fit 2
                  </td>
                  <td
                    @click="add('Fit 3')"
                    :class="{ isSelected: selectedSize === 'Fit 3' }"
                  >
                    Fit 3
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('XS-S')"
                    :class="{ isSelected: selectedSize === 'XS-S' }"
                  >
                    XS-S
                  </td>
                  <td
                    @click="add('M-L')"
                    :class="{ isSelected: selectedSize === 'M-L' }"
                  >
                    M-L
                  </td>
                  <td
                    @click="add('X-XXL')"
                    :class="{ isSelected: selectedSize === 'X-XXL' }"
                  >
                    X-XXL
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('L')"
                    :class="{ isSelected: selectedSize === 'L' }"
                  >
                    L
                  </td>
                  <td
                    @click="add('XL')"
                    :class="{ isSelected: selectedSize === 'XL' }"
                  >
                    XL
                  </td>
                  <td
                    @click="add('XXL')"
                    :class="{ isSelected: selectedSize === 'XXL' }"
                  >
                    XXL
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('OS')"
                    :class="{ isSelected: selectedSize === 'OS' }"
                  >
                    OS
                  </td>
                  <td
                    @click="add('26')"
                    :class="{ isSelected: selectedSize === '26' }"
                  >
                    26
                  </td>
                  <td
                    @click="add('28')"
                    :class="{ isSelected: selectedSize === '28' }"
                  >
                    28
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('30')"
                    :class="{ isSelected: selectedSize === '30' }"
                  >
                    30
                  </td>
                  <td
                    @click="add('32')"
                    :class="{ isSelected: selectedSize === '32' }"
                  >
                    32
                  </td>
                  <td
                    @click="add('34')"
                    :class="{ isSelected: selectedSize === '34' }"
                  >
                    34
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('36')"
                    :class="{ isSelected: selectedSize === '36' }"
                  >
                    36
                  </td>
                  <td
                    @click="add('38')"
                    :class="{ isSelected: selectedSize === '38' }"
                  >
                    38
                  </td>
                  <td
                    @click="add('40')"
                    :class="{ isSelected: selectedSize === '40' }"
                  >
                    40
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('42')"
                    :class="{ isSelected: selectedSize === '42' }"
                  >
                    42
                  </td>
                  <td
                    @click="add('44')"
                    :class="{ isSelected: selectedSize === '44' }"
                  >
                    44
                  </td>
                  <td
                    @click="add('48')"
                    :class="{ isSelected: selectedSize === '48' }"
                  >
                    48
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('52')"
                    :class="{ isSelected: selectedSize === '52' }"
                  >
                    52
                  </td>
                  <td
                    @click="add('56')"
                    :class="{ isSelected: selectedSize === '56' }"
                  >
                    56
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('18 inch')"
                    :class="{ isSelected: selectedSize === '18 inch' }"
                  >
                    18 inch
                  </td>
                  <td
                    @click="add('20 inch')"
                    :class="{ isSelected: selectedSize === '20 inch' }"
                  >
                    20 inch
                  </td>
                  <td
                    @click="add('22 inch')"
                    :class="{ isSelected: selectedSize === '22 inch' }"
                  >
                    22 inch
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('6')"
                    :class="{ isSelected: selectedSize === '6' }"
                  >
                    6
                  </td>
                  <td
                    @click="add('7')"
                    :class="{ isSelected: selectedSize === '7' }"
                  >
                    7
                  </td>
                  <td
                    @click="add('8')"
                    :class="{ isSelected: selectedSize === '8' }"
                  >
                    8
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('9')"
                    :class="{ isSelected: selectedSize === '9' }"
                  >
                    9
                  </td>
                  <td
                    @click="add('10')"
                    :class="{ isSelected: selectedSize === '10' }"
                  >
                    10
                  </td>
                  <td
                    @click="add('11')"
                    :class="{ isSelected: selectedSize === '11' }"
                  >
                    11
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('12')"
                    :class="{ isSelected: selectedSize === '12' }"
                  >
                    12
                  </td>
                  <td
                    @click="add('13')"
                    :class="{ isSelected: selectedSize === '13' }"
                  >
                    13
                  </td>
                  <td
                    @click="add('24')"
                    :class="{ isSelected: selectedSize === '24' }"
                  >
                    24
                  </td>
                </tr>
                <tr>
                  <td
                    @click="add('S-M')"
                    :class="{ isSelected: selectedSize === 'S-M' }"
                  >
                    S-M
                  </td>
                  <td
                    @click="add('L-XL')"
                    :class="{ isSelected: selectedSize === 'L-XL' }"
                  >
                    L-XL
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <form class="product-info-form">
            <label for="brand"> BRAND </label>
            <input
              type="text"
              :value="singleSneakersData.brand_name"
              readonly
            />
            <label for="name"> NAME </label>
            <input
              type="text"
              :value="singleSneakersData.name"
              readonly
            />
            <div
              v-if="
                singleSneakersData['product_type'].toLowerCase() ===
                  'sneakers'
              "
            >
              <label for="colorway"> COLORWAY </label>
              <input
                type="text"
                :value="singleSneakersData.details"
                readonly
              />
            </div>
            <button
              style="max-width:100%"
              class="black-button "
              @click.prevent="done()"
            >
              Done
            </button>
          </form>
        </div>
        <div class="confirm-sale" v-if="confirmSale">
          <div class="image-wrapper">
            <div class="image">
              <picture>
                <source
                  style="max-width:500px;max-height:500px;width:100%;height:100%"
                  media="(max-width: 992px)"
                  :srcset="
                    `${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${singleSneakersData.slug}/${singleSneakersData.main_picture_url}`
                  "
                />
                <img
                  style="max-width:350px;max-height:350px;width:100%;height:100%"
                  :src="
                    `${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${singleSneakersData.slug}/${singleSneakersData.main_picture_url}`
                  "
                  alt="Picture of Product"
                />
              </picture>
            </div>
          </div>
          <div class="sneaker-detail">
            <p class="name">{{ singleSneakersData.name }}</p>
            <form class="product-range">
              <label for="product-range">PRODUCT PRICE</label>
              <input
                type="number"
                id="product-range"
                min="300"
                v-model="price"
              />
            </form>
            <table class="table">
              <tbody v-if="!isHomegrown">
                <!-- <tr>
                  <td>Selling Fee (8%)</td>
                  <td>&#8377;&nbsp;{{ Math.ceil(0.08 * price) }}</td>
                </tr> -->
                <!-- <tr>
                  <td>
                    Processing Fee (2%)
                    <span
                      title="Includes verification service, packaging, and handling."
                      class="processing__fee"
                      ><b-question />
                    </span>
                  </td>
                  <td>&#8377;&nbsp;{{ Math.ceil(0.02 * price) }}</td>
                </tr> -->
                <!-- <tr>
                  <td>Estimated Shipping</td>
                  <td>&#8377;&nbsp;300</td>
                </tr> -->
                <tr class="total-payout">
                  <td>Total Payout</td>
                  <td>&#8377;&nbsp;{{ totalPayout }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr class="total-payout">
                  <td>Total Payout</td>
                  <td>&#8377;&nbsp;{{ price }}</td>
                </tr>
              </tbody>
            </table>
            <button
              style="max-width:100%"
              class="black-button"
              @click="submitShoe"
            >
              Confirm
            </button>
          </div>
        </div>
        <signupack
          :heading="heading"
          :description="description"
          :msg="msg"
          :href="href"
          v-if="signupack"
        />
      </b-overlay>
      <SizeGuide id="size-guide-sidebar" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sneaker from "~/components/seller/SellerSneaker.vue";
import errorPage from "@/components/seller/errorPage";
import SizeGuide from "@/components/UI/SizeGuide.vue";
import { BOverlay, BIconQuestionCircleFill } from "bootstrap-vue";

export default {
  data() {
    return {
      selectedFiles: undefined,
      selectedSize: null,
      sizeSelected: [],
      verified: true,
      showSizeGuide: false,
      queryString: "",
      searchWrapper: true,
      productInfo: false,
      confirmSale: false,
      price: 0,
      description:
        "You can find updates regarding your product listing under ‘Store Front’.",
      msg: "Go to Store Front",
      href: "/seller/storefront",
      heading: "Your product is now live!",
      signupack: false,
      onstep1: true,
      onstep2: false,
      onstep3: false,
      finishedstep1: false,
      finishedstep2: false,
      finishedstep3: false,
      loading: false
    };
  },
  props: {
    selectedMenu: {
      type: String
    }
  },
  components: {
    sneaker,
    errorPage,
    SizeGuide,
    "b-overlay": BOverlay,
    "b-question": BIconQuestionCircleFill
  },

  computed: {
    totalPayout() {
      return this.$formatPrice(this.price - this.$sellingFee * this.price);
    },
    isHomegrown() {
      return ["Sneakers", "Streetwear"].includes(
        this.singleSneakersData.product_type
      )
        ? false
        : true;
    },
    sneakersData() {
      return this.$store.getters["sellerSneakers/getSneakersData"];
    },
    singleSneakersData() {
      return this.$store.getters["sellerSneakers/getSingleSneakersData"];
    },
    token() {
      return this.$store.getters["authentication/idToken"];
    }
  },
  methods: {
    handleBack() {
      if (this.finishedstep2) {
        this.finishedstep2 = false;
        this.confirmSale = false;
        this.productInfo = true;
      } else if (this.finishedstep1) {
        this.productInfo = false;
        this.finishedstep1 = false;
        this.searchWrapper = true;
      }
    },
    getQueryProducts() {
      this.loading = true;
      axios({
        url: `${this.$config.drypApiURL}/search/seller/${this.queryString}/40`,
        method: "get"
      })
        .then(res => {
          this.loading = false;
          this.searchedHits = res.data.products.hits.hits;
          this.showSearchedHits = true;
          this.$store.commit(
            "sellerSneakers/getSneakers",
            res.data.products.hits.hits
          );
        })
        .catch(() => (this.loading = false));
    },
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },
    upload() {
      if (this.selectedFiles) {
        const file = this.selectedFiles.item(0);
        const formData = new FormData();
        formData.append("file", file);
        this.loading = true;
        axios
          .post("/bulk/sell-product", formData, {
            headers: { Authorization: "Bearer " + this.token }
          })
          .then(() =>
            this.$store.dispatch("notification_alert/updateNotification", {
              message: "Products added successfully.",
              error: false
            })
          )
          .catch(() =>
            this.$store.dispatch("notification_alert/updateNotification", {
              message: "Csv file is formatted incorrectly.",
              error: true
            })
          );
        this.loading = false;
      } else {
        this.$store.dispatch("notification_alert/updateNotification", {
          message: "Please choose a file to upload.",
          error: true
        });
      }
    },
    selectedShoe(value) {
      if (value) {
        this.productInfo = true;
        this.searchWrapper = false;
        this.finishedstep1 = true;
        this.onstep2 = true;
      }
      this.loading = true;
      axios({
        url: `${this.$config.drypApiURL}/selected-product/${value}`,
        method: "get"
      })
        .then(res => {
          this.$store.commit(
            "sellerSneakers/getSingleSneakers",
            res.data.product
          );
        })
        .catch(err => console.log(err));
      this.loading = false;
    },
    add(size) {
      this.selectedSize = size;
    },
    done() {
      if (this.selectedSize) {
        this.productInfo = !this.productInfo;
        this.confirmSale = !this.confirmSale;
        this.finishedstep2 = true;
        this.onstep3 = true;
      } else {
        let errorMessage = { message: "Please select the size.", error: true };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
      }
    },
    submitShoe() {
      const payload = {};
      payload.size = this.selectedSize;
      payload["_id"] = this.singleSneakersData["_id"];
      payload.price = parseInt(this.price); //for sending price to backend without comma
      if (this.totalPayout && this.price) {
        this.loading = true;
        axios
          .post("/sell-product", payload, {
            headers: { Authorization: "Bearer " + this.token }
          })
          .then(res => {
            if (res.status == 201) {
              // console.log(res);
              this.finishedstep3 = true;
              this.signupack = true;
              this.confirmSale = false;
              let successMessage =
                res.data && res.data.message
                  ? res.data
                  : { message: "Product added for review.", error: false };
              this.$store.dispatch(
                "notification_alert/updateNotification",
                successMessage
              );
            }
          })
          .catch(() => {
            this.$store.dispatch("notification_alert/updateNotification", {
              message: "Failed to add product.",
              error: true
            });
          });
        this.loading = false;
      } else {
        let errorMessage = { message: "Please fill the amount.", error: true };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
      }
    }
  },
  watch: {
    queryString(newValue) {
      if (newValue.length > 3) {
        this.$debounce(this.getQueryProducts(), 3000);
      } else {
        this.searchedHits = null;
        this.showSearchedHits = false;
      }
    }
  },
  async mounted() {
    // const { data } = await this.$checkSellerVerified(this.token);
    // if (data?.data?.checkSellerVerified) {
    //   this.verified = true;
    // }
    if (this.$route.query?.slug) {
      this.selectedShoe(this.$route.query.slug);
    }
  },
  destroyed() {
    this.$store.commit("sellerSneakers/getSneakers", []);
  }
};
</script>

<style lang="scss" scoped>
.verification {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 64px;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  @media screen and (max-width: 992px) {
    font-size: 20px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
}

input[type="file"] {
  height: 50px;
  font-size: 14px;
}
input[type="file"]::-webkit-file-upload-button {
  height: 50px;
  cursor: pointer;
}

.upload-csv {
  display: block;
  @media screen and (max-width: 992px) {
    display: none;
  }
}

.product-status {
  height: 100%;
  .steps {
    display: flex;
    justify-content: space-between;
    width: 47%;
    margin: auto;
    margin-bottom: 2.8rem;
    @media screen and (max-width: 1366px) {
      width: 60%;
    }
    @media screen and (max-width: 1150px) {
      width: 71%;
    }
    @media screen and (max-width: 992px) {
      width: 50%;
    }
    @media screen and (max-width: 730px) {
      width: 64%;
    }
    @media screen and (max-width: 600px) {
      width: 70%;
    }
    @media screen and (max-width: 500px) {
      width: 80%;
    }
    @media screen and (max-width: 430px) {
      width: 90%;
    }
    &-1-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @media screen and (max-width: 580px) {
        font-size: 1.5rem;
      }
      p {
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        color: $slider-track;
        // max-width: 16rem;
        white-space: nowrap;
        @media screen and (max-width: 992px) {
          font-size: 1.5rem;
          white-space: pre-wrap;
          text-align: center;
        }
      }
    }
    &-1 {
      background-color: $slider-track;
      border-radius: 50%;
      font-size: 2.25rem;
      font-weight: bold;
      color: $base-white;
      margin-bottom: 1.5rem;
      width: 6rem;
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .onstep {
      background-color: $primary;
    }
    .onsteptext {
      color: $primary;
    }
    .finishedstep {
      background-color: $light-green;
    }
    &-progress-line {
      background-color: $slider-track;
      height: 4.3px;
      width: 4rem;
      @media screen and (max-width: 992px) {
        width: 2rem;
      }
      @media screen and (max-width: 800px) {
        // width: 1.7rem;
      }
    }

    .active-status {
      background-color: $primary;
    }
  }
  .search-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // display: none;
    p {
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      color: $primary;
      margin: 2rem 0;
    }
    .input-wrapper {
      width: 41%;
      margin: 0 auto;
      margin-bottom: 2.9rem;
      position: relative;
      @media screen and (max-width: 992px) {
        width: 50%;
      }
      @media screen and (max-width: 600px) {
        width: 70%;
      }
      input {
        border: 1px solid lightgrey;
        outline: none;
        padding: 1.2rem;
        padding-right: 6rem;
        font-size: 1.6rem;
        text-align: left;
        color: $primary;
        width: 100%;
        @media screen and (max-width: 475px) {
          padding-right: 5rem;
        }
      }
      img {
        width: 2.5rem;
        position: absolute;
        margin: 0 auto;
        top: 1.2rem;
        right: 2.8rem;
        @media screen and (max-width: 580px) {
          right: 1rem;
        }
      }
    }
  }
  .product-info {
    width: 35%;
    margin: 0 auto;
    @media screen and (max-width: 1400px) {
      width: 40%;
    }
    @media screen and (max-width: 1250px) {
      width: 45%;
    }
    @media screen and (max-width: 992px) {
      width: 60%;
    }
    @media screen and (max-width: 830px) {
      width: 75%;
    }
    @media screen and (max-width: 650px) {
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
          padding: 8px;
          font-size: 1.6rem;
        }
        td:active,
        td:hover {
          background-color: $light-green;
          color: $base-white;
        }

        .processing__fee {
          cursor: pointer;
        }
        .isSelected {
          background-color: $primary;
          color: #ffffff;
          &:hover {
            background-color: $primary;
          }
        }
      }
    }
    @media screen and (max-width: 1366px) {
      .sizes {
        table {
          td {
            padding: 1.5rem;
          }
        }
      }
      padding: 3rem 0;
    }
    @media screen and (max-width: 1000px) {
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
    }
    @media screen and (max-width: 992px) {
      padding: 3rem 4.5rem;
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
        padding-bottom: 1.8rem;
        font-weight: bold;
      }
    }
  }
  .confirm-sale {
    width: 75%;
    margin: 0 auto;
    display: flex;
    margin-top: 5rem;
    @media screen and (max-width: 992px) {
      flex-direction: column;
      margin-top: 0;
      width: 90%;
    }
    .image-wrapper {
      min-width: 48%;
      margin-right: 1%;
      background-color: $base-white;
      display: flex;
      .image {
        display: flex;
        margin: 0 auto;
        align-items: center;
      }
    }
    .sneaker-detail {
      display: flex;
      flex-direction: column;
      margin-left: 8%;
      width: 100%;
      @media screen and (max-width: 992px) {
        margin: 0 auto;
        width: 60%;
      }
      @media screen and (max-width: 830px) {
        width: 75%;
      }
      @media screen and (max-width: 650px) {
        width: 100%;
      }
      .name {
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        color: $primary;
        margin-bottom: 4rem;
        @media screen and (max-width: 992px) {
          margin-top: 4rem;
        }
      }
      .product-range {
        font-size: 1.4rem;
        text-align: left;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: left;
        input {
          border: none;
          outline: none;
          font-size: 1.6rem;
          padding: 1.2rem 2rem 1.2rem 2.7rem;
          text-align: left;
          color: black;
          border: solid 1px $grey-dark;
          background-color: $base-white;
          margin-bottom: 4.3rem;
          max-height: 5rem;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          appearance: none;
        }
      }
      .table {
        tbody {
          tr {
            td {
              font-size: 1.6rem;
              color: $primary;
              padding: 1.5rem 0 1.5rem 0;
              border-top: 1px solid $grey-medium;
            }
            td:nth-child(2) {
              text-align: right;
            }
            &:nth-child(1) {
              td {
                border-top: none;
              }
            }
          }
          .total-payout {
            td {
              font-size: 2rem;
              font-weight: bold;
              text-align: left;
              color: $button-dark;
            }
          }
        }
      }
      .confirm--button {
        font-size: 1.8rem;
        padding-top: 1.2rem;
        padding-bottom: 1.8rem;
        font-weight: bold;
        margin-top: 3.5rem;
        max-height: 5rem;
      }
    }
  }
}

.left-1 {
  margin-left: -70%;
  flex: 1;
  @media screen and (max-width: 600px) {
    margin-left: -35%;
  }
  @media screen and (max-width: 375px) {
    margin-left: -8%;
  }
}
.left-2 {
  margin-left: -52%;
  flex: 1;
  @media screen and (max-width: 600px) {
    margin-left: -22%;
  }
  @media screen and (max-width: 375px) {
    margin-left: -15%;
  }
}
.right-1 {
  margin-right: -52%;
  flex: 1;
  @media screen and (max-width: 600px) {
    margin-right: -35%;
  }
  @media screen and (max-width: 375px) {
    margin-right: -22%;
  }
}
.right-2 {
  margin-right: -50%;
  flex: 1;
  @media screen and (max-width: 600px) {
    margin-right: -20%;
  }
  @media screen and (max-width: 375px) {
    margin-right: -13%;
  }
}
.steps-progress-line-wrapper {
  display: flex;
  transform: translateY(2.5rem);
}
@media screen and (max-width: 580px) {
  .line-1 {
    transform: translate(-0.5rem, 2.5rem);
  }
  .line-2 {
    .steps-progress-line {
      width: 2.5rem;
    }
  }
}
</style>
