<template class="productdetail">
  <div class="productdetail" v-if="singleSneakerData.product_attributes">
    <div class="productdetail__main">
      <b-overlay :show="loading">
        <div class="productinfo" v-if="singleSneakerData.product_attributes">
          <div class="img-container">
            <div class="product-breadcrumb">
              <nav class="d-flex" style="gap: 4px">
                <nuxt-link
                  :to="{
                    path: '/',
                  }"
                >
                  home
                </nuxt-link>
                /
                <nuxt-link
                  :to="{
                    path: '/products',
                    query: {
                      product_type:
                        singleSneakerData.product_attributes.product_type,
                    },
                  }"
                >
                  {{ singleSneakerData.product_attributes.product_type }}
                </nuxt-link>
                /
                <nuxt-link
                  :to="{
                    path: '/products',
                    query: {
                      brands: singleSneakerData.product_attributes.brand_name,
                    },
                  }"
                >
                  {{ singleSneakerData.product_attributes.brand_name }}
                </nuxt-link>
                /
                <nuxt-link
                  :to="{
                    path: '/products',
                    query: {
                      silhouette:
                        singleSneakerData.product_attributes.silhouette,
                    },
                  }"
                >
                  {{ singleSneakerData.product_attributes.silhouette }}
                </nuxt-link>
                /
                {{ singleSneakerData.product_attributes.nickname }}
              </nav>
            </div>
            <div
              class="wishlist"
              @click="makeWishlist"
              v-if="!(review_order || shippingInfo)"
            >
              <b-heart-fill v-if="wishlisted" style="color: #ee2257" />
              <b-heart v-else />
            </div>
            <div>
              <ProductImagesCarousel
                :slug="singleSneakerData.product_attributes.slug"
                :imageList="imageChunk"
              />
            </div>
            <div
              class="img-info__text"
              :class="{ center_text: review_order || shippingInfo }"
            >
              <Specifications
                :productDetails="singleSneakerData.product_attributes"
              />
              <div>
                <div class="d-flex justify-content-center">
                  <img
                    style="width: 242px; height: 100px"
                    src="~/assets/svg/service/guarantee.png"
                    alt="guarantee"
                  />
                </div>

                <div
                  class="secure-icons"
                  :class="{ dark_grey: widthSecureIcon }"
                >
                  <div class="secure-icons__1">
                    <img src="~/assets/svg/service/one.png" alt="Authentic" />
                    <p>
                      Certified & <br />
                      Authentic
                    </p>
                  </div>
                  <div class="secure-icons__2">
                    <img
                      src="~/assets/svg/service/two.png"
                      alt="Customer Care"
                    />
                    <p>
                      Customer <br />
                      Care
                    </p>
                  </div>
                  <div class="secure-icons__2">
                    <img
                      src="~/assets/svg/service/three.png"
                      alt="Secure Transaction"
                    />
                    <p>
                      Secure <br />
                      Transactions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            ref="main-info"
            class="size-info"
            :class="{ 'product-actions': !shippingInfo }"
            v-if="singleSneakerData.product_size_price.length !== 0"
          >
            <div class="size-info__different-sizes" v-if="showSizeInfo">
              <div
                class="d-flex flex-column"
                style="gap: 16px"
                v-if="!shippingInfo"
              >
                <h3>
                  {{ singleSneakerData.product_attributes.name }}
                </h3>
                <SizeSelector
                  style="margin-top: 16px"
                  v-model="ordered_shoe.size"
                  @priceChange="ordered_shoe.price = $event"
                  @productIdChange="handleProductIdChange"
                  :products="singleSneakerData.product_size_price"
                  :productType="
                    singleSneakerData.product_attributes.product_type
                  "
                />
                <div
                  class="size-guide"
                  v-if="
                    singleSneakerData.product_attributes.product_type ===
                      'Sneakers' && !review_order
                  "
                >
                  <button
                    v-b-toggle.size-guide-sidebar
                    class="product-info__sizeGuide--button"
                  >
                    Size Guide
                  </button>
                </div>
              </div>
              <div
                class="price"
                v-if="
                  showBiddingSystem && !this.review_order && !this.shippingInfo
                "
              >
                <div
                  class="d-flex flex-row p-2 justify-content-center"
                  style="gap: 16px"
                >
                  <div>
                    <p class="price-header">Lowest Ask</p>
                    <p class="price-value">
                      &#x20b9;{{ formatPrice(ordered_shoe.price) }}
                    </p>
                  </div>
                  <div
                    style="height: 75px; width: 2px; background: lightgrey"
                  />
                  <div>
                    <p class="price-header">Highest Bid</p>
                    <p class="price-value">
                      &#x20b9;{{
                        highestBidPrice === 0
                          ? "--"
                          : formatPrice(highestBidPrice)
                      }}
                    </p>
                  </div>
                  <div
                    style="height: 75px; width: 2px; background: lightgrey"
                  />
                  <div>
                    <p class="price-header">Last Sold</p>
                    <p class="price-value">
                      &#x20b9;{{ formatPrice(lastLowestSoldPrice) }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="review__order" v-if="review_order">
                <div
                  style="display: flex; justify-content: center; padding: 16px"
                  v-if="this.review_order && showBiddingSystem"
                >
                  <button
                    :class="{
                      'action-buttons-focus': activeTab === 'buy',
                      'action-buttons': activeTab !== 'buy',
                    }"
                    ref="buyNow"
                    type="button"
                    @click="() => (activeTab = 'buy')"
                  >
                    Buy Now
                  </button>
                  <button
                    :class="{
                      'action-buttons-focus': activeTab === 'bid',
                      'action-buttons': activeTab !== 'bid',
                    }"
                    type="button"
                    @click="() => (activeTab = 'bid')"
                  >
                    Place Bid
                  </button>
                </div>
                <div class="review__order--discount" v-if="activeTab === 'buy'">
                  <input
                    type="text"
                    placeholder="Enter Discount Code"
                    v-model="ordered_shoe.discount"
                  />
                  <button class="apply">Apply</button>
                </div>
                <div v-else>
                  <div class="review__order--discount">
                    <input
                      type="number"
                      placeholder="Enter Bid Amount"
                      v-model="bidPrice"
                    />
                  </div>
                </div>
                <table class="table">
                  <tbody v-if="activeTab === 'buy'">
                    <tr class="total-payout">
                      <td>
                        Total
                        <p>(all inclusive*)</p>
                      </td>
                      <td>&#8377;&nbsp;{{ formatPrice(finalOrderPrice) }}</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr class="total-payout">
                      <td>
                        Total
                        <p>(all inclusive*)</p>
                      </td>
                      <td>&#8377;&nbsp;{{ formatPrice(finalBidPrice) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="shipping__info" v-if="shippingInfo">
                <shippingInfo
                  ref="shippingInfo"
                  @noShippingInfo="noShippingInfo"
                  @payBtn="payBtn"
                  @showAddressForm="showAddressForm = $event"
                />
              </div>

              <div
                v-if="windowWidth >= 992 || !this.showBottomButtons"
                class="option-buttons"
                :class="{ 'justify-content-center': !showBiddingSystem }"
              >
                <button
                  class="buy-button green-button"
                  v-if="!review_order && !shippingInfo && showBiddingSystem"
                >
                  <nuxt-link
                    :to="{
                      path: '/seller',
                      query: {
                        slug: singleSneakerData.product_attributes.slug,
                      },
                    }"
                  >
                    Sell Now
                  </nuxt-link>
                </button>
                <button
                  class="black-button"
                  :class="{
                    'buy-button': review_order | !showAddressForm,
                    'shipping-back-button': showAddressForm,
                  }"
                  v-if="review_order || shippingInfo"
                  @click="back"
                >
                  Back
                </button>
                <button
                  v-if="!user"
                  class="buy-button black-button"
                  @click="loginToBuy"
                >
                  Login to Buy/Bid
                </button>
                <button
                  v-if="user && !showAddressForm"
                  class="buy-button black-button"
                  :disabled="
                    !ordered_shoe.size ||
                    (activeTab === 'bid' && review_order && !bidPrice)
                  "
                  @click="next"
                >
                  {{ nextBtn }}
                </button>
              </div>
              <div
                class="view-buttons"
                v-if="
                  showBiddingSystem && !this.review_order && !this.shippingInfo
                "
              >
                <button
                  v-b-toggle.sidebar
                  class="black-button small"
                  @click="getBidsByProduct"
                >
                  View Bids
                </button>
                <button
                  class="black-button small"
                  v-b-toggle.sidebar
                  @click="getProductsBySlug"
                >
                  View Asks
                </button>
              </div>
            </div>
            <loginSignup
              @buyerSignedUp="buyerSignedUp"
              :href="href"
              :msg="msg"
              v-if="showSignIn && !buyerSigned"
              @loggedIn="loggedIn"
              class="loginsignup"
            />
          </div>
          <div v-else></div>
          <div
            class="img-info__text img-info__text-small--screen"
            :class="{ center_text: review_order || shippingInfo }"
          >
            <Specifications
              :productDetails="singleSneakerData.product_attributes"
            />
            <div>
              <div class="d-flex justify-content-center">
                <img
                  style="width: 242px; height: 100px"
                  src="~/assets/svg/service/guarantee.png"
                  alt="guarantee"
                />
              </div>

              <div class="secure-icons" :class="{ dark_grey: widthSecureIcon }">
                <div class="secure-icons__1">
                  <img src="~/assets/svg/service/one.png" alt="Authentic" />
                  <p>
                    Certified & <br />
                    Authentic
                  </p>
                </div>
                <div class="secure-icons__2">
                  <img src="~/assets/svg/service/two.png" alt="Customer Care" />
                  <p>
                    Customer <br />
                    Care
                  </p>
                </div>
                <div class="secure-icons__2">
                  <img
                    src="~/assets/svg/service/three.png"
                    alt="Secure Transaction"
                  />
                  <p>
                    Secure <br />
                    Transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-overlay>
      <div
        ref="moreSneakers"
        class="also_dig"
        v-if="showSizeInfo && !review_order && !shippingInfo"
      >
        <h5>You may also like these</h5>
        <sneaker :sneakersData="sneakersData" />
      </div>
    </div>
    <b-sidebar
      id="sidebar"
      sidebar-class="sidebar-width"
      :title="tableTitle"
      backdrop-variant="dark"
      bg-variant="white"
      right
      shadow
      lazy
      backdrop
    >
      <b-overlay :show="loading">
        <div class="px-3 py-2">
          <b-table
            class="text-center"
            :fields="fields"
            :items="tableItems"
            outlined
            borderless
            striped
          >
            <template #cell(price)="data"> &#8377;{{ data.value }} </template>
          </b-table>
        </div>
      </b-overlay>
    </b-sidebar>
    <SizeGuide id="size-guide-sidebar" />
    <div v-if="showBottomButtons" class="bottom-buttons">
      <nuxt-link
        v-if="showBiddingSystem"
        :to="{
          path: '/seller',
          query: { slug: singleSneakerData.product_attributes.slug },
        }"
      >
        <button class="bot-buttons sell">
          <div>SELL / LIST</div>
          <div class="price">&#8377;&nbsp;{{ highestBidPrice }}</div>
          <div>Highest Bid</div>
        </button>
      </nuxt-link>
      <button
        class="bot-buttons buy"
        @click="handleMobileBuy"
        v-if="singleSneakerData.product_size_price.length !== 0"
      >
        <div>BUY / BID</div>
        <div class="price">&#8377;&nbsp;{{ ordered_shoe.price }}</div>
        <div>{{ showBiddingSystem ? "Lowest Ask" : "Price" }}</div>
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import loginSignup from "@/components/loginSignup.vue";
import Signup from "@/components/signup.vue";
import login from "@/components/login.vue";
import sneaker from "@/components/sneaker.vue";
import he from "he";
import shippingInfo from "@/components/buyer/shippingInfo.vue";
import SizeGuide from "@/components/UI/SizeGuide.vue";
import Specifications from "@/components/Specifications.vue";
import {
  BSidebar,
  VBToggle,
  BTable,
  BOverlay,
  BCard,
  BIconArrowBarRight,
  BIconHeartFill,
  BIconHeart,
  BIconCheckCircle,
  BIconQuestionCircleFill,
} from "bootstrap-vue";
import SizeSelector from "@/components/UI/SizeSelector.vue";
import ProductImagesCarousel from "@/components/ProductImagesCarousel.vue";

export default {
  components: {
    sneaker,
    Signup,
    login,
    loginSignup,
    shippingInfo,
    SizeGuide,
    Specifications,
    "b-sidebar": BSidebar,
    "b-table": BTable,
    "b-overlay": BOverlay,
    "b-card": BCard,
    "b-heart": BIconHeart,
    "b-heart-fill": BIconHeartFill,
    "arrow-bar-right": BIconArrowBarRight,
    "b-check": BIconCheckCircle,
    "b-question": BIconQuestionCircleFill,
    SizeSelector,
    ProductImagesCarousel,
  },
  directives: {
    "b-toggle": VBToggle,
  },
  data() {
    return {
      showBottomButtons: true,
      showAddressForm: false,
      loading: false,
      fields: [
        {
          key: "size",
          sortable: true,
        },
        {
          key: "price",
          sortable: true,
          label: "Price",
        },
      ],
      path: "",
      ordered_shoe: {
        product_id: undefined,
        slug: "",
        size: "",
        price: 0,
        discount: "",
        product_type: "",
        name: "",
      },
      activeTab: "buy",
      bidPrice: 0,
      finalBidPrice: 0,
      showSizeInfo: true,
      showSignIn: false,
      story_html: "",
      showSizeGuide: false,
      msg: "Continue Shopping",
      href: `${this.$route.fullPath}`,
      review_order: false,
      windowWidth: "",
      price: "",
      sizefromdb: [],
      buyerSigned: false,
      shippingInfo: false,
      wishlisted: false,
      nextBtn: "Buy/Bid",
      showMore: true,
      order_id: undefined,
      tableItems: [],
      productBids: [],
      tableTitle: "All Bids",
      imagePage: 0,
      selectedImage: "display_picture.png",
    };
  },
  props: {
    sneakersData: {
      type: Array | undefined,
      required: true,
      default: function () {
        return [];
      },
    },
    singleSneakerData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    lastLowestSoldPrice() {
      return (
        this.singleSneakerData.lowest_sold_price[this.ordered_shoe.size] || 0
      );
    },
    finalOrderPrice() {
      return this.gstValue + this.ordered_shoe?.price;
    },
    commissionFee() {
      return this.activeTab === "buy"
        ? Math.ceil(0.1 * this.ordered_shoe?.price)
        : Math.ceil(0.1 * this.bidPrice);
    },
    gstValue() {
      return Math.ceil(0.18 * this.commissionFee);
    },
    showBiddingSystem() {
      return ["Sneakers", "Streetwear"].includes(
        this.singleSneakerData.product_attributes.product_type
      );
    },
    imageChunk() {
      let imageList = [
        this.singleSneakerData.product_attributes.main_picture_url,
      ];
      const images = this.singleSneakerData.product_attributes.image_list;
      if (images) {
        imageList.push(...images);
      }
      return imageList;
    },
    highestBidPrice() {
      let price = 0;
      if (this.productBids) {
        for (let i = 0; i < this.productBids.length; i++) {
          if (this.productBids[i].size === this.ordered_shoe.size) {
            price =
              this.productBids[i].price > price
                ? this.productBids[i].price
                : price;
          }
        }
      }
      return price;
    },
    defaultAddress() {
      if (this.$refs.shippingInfo) {
        return this.$refs.shippingInfo.addresses.filter(
          (address) => address.default_address
        )[0];
      }
    },
    user() {
      return this.$store.getters["authentication/getUser"];
    },
    widthSecureIcon() {
      if (this.windowWidth <= 425) return true;
      return false;
    },
    addresses() {
      return this.$store.getters["address/getAllAddress"];
    },
    token() {
      return this.$store.getters["authentication/idToken"];
    },
    wishlist() {
      return this.$store.getters["sneakersData/getWishlistedSneakers"];
    },
  },
  watch: {
    bidPrice: function (newPrice) {
      this.finalBidPrice = Math.ceil(newPrice) + this.gstValue;
      if (Math.ceil(newPrice) >= this.ordered_shoe?.price) {
        this.activeTab = "buy";
      }
    },
  },
  methods: {
    handleProductIdChange(productId) {
      this.ordered_shoe.product_id = productId;
    },
    formatPrice(price) {
      return this.$formatPrice(price);
    },
    showSuccessModal(msg) {
      const h = this.$createElement;
      const messageVNode = h("div", { class: ["foobar"] }, [
        h("p", { class: ["text-center check"] }, [h("b-check")]),
        h("p", { class: ["text-center"] }, [msg]),
      ]);
      this.$bvModal
        .msgBoxOk([messageVNode], {
          title: false,
          size: "sm",
          buttonSize: "lg",
          okVariant: "success",
          footerClass: "p-2 border-top-0",
          bodyClass: "text-center modal-text",
          centered: true,
        })
        .then(() => {
          this.$router.push("/seller/bids");
        });
    },
    handleMobileBuy() {
      this.next();
      this.goto("main-info");
      this.showBottomButtons = false;
    },
    goto(refName) {
      const element = this.$refs[refName];
      const top = element.offsetTop;
      window.scrollTo(0, top);
    },
    async getBidsByProduct() {
      this.loading = true;
      this.tableTitle = "All Bids";
      const { data } = await this.$getBidsByProduct(
        this.singleSneakerData.product_attributes.slug
      );
      if (data?.data?.bidsByProduct) {
        this.tableItems = data.data.bidsByProduct;
        this.productBids = data.data.bidsByProduct;
      }
      this.loading = false;
    },
    async getProductsBySlug() {
      this.tableTitle = "All Asks";
      this.loading = true;
      const { data } = await this.$getProductsBySlug(
        this.singleSneakerData.product_attributes?.slug
      );
      if (data?.data?.productsBySlug) {
        this.tableItems = data.data.productsBySlug;
      }
      this.loading = false;
    },
    async verifySignature(response) {
      try {
        await axios.post(
          "/verify-payment",
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: this.order_id,
            razorpay_signature: response.razorpay_signature,
            // size: this.ordered_shoe.size,
            // slug: this.ordered_shoe.slug,
            // product_type: this.ordered_shoe.product_type
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );
        this.showSuccessModal("Payment Successfull.");
        webengage.track("Buy", {
          product_id: this.ordered_shoe.product_id,
          product_size: this.ordered_shoe.size,
          product_slug: this.ordered_shoe.slug,
          final_order_price: this.finalOrderPrice,
        });
      } catch {
        this.$store.dispatch("notification_alert/updateNotification", {
          message: "Payment Failed.",
          error: true,
        });
      }
    },
    makePayment() {
      this.loading = true;
      axios
        .post(
          "/buy-product",
          {
            ...this.defaultAddress,
            ...this.ordered_shoe,
            price: this.finalOrderPrice,
            gst: this.gstValue,
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          this.order_id = res.data.order_id;
          const options = {
            key: this.$config.razorpayKeyId,
            amount: Math.ceil(this.finalOrderPrice) * 100,
            currency: "INR",
            description: "Payment",
            order_id: res.data.order_id,
            prefill: {
              name:
                this.defaultAddress.first_name.toUpperCase() +
                " " +
                this.defaultAddress.last_name.toUpperCase(),
              email: this.defaultAddress.email,
              contact: this.defaultAddress.phone_number,
            },
            theme: {
              color: "#3399cc",
            },
            handler: (response) => {
              this.verifySignature(response);
            },
          };
          new Razorpay(options).open();
        })
        .catch((err) => {
          if (err.response.data?.blocked) {
            this.$store.dispatch("notification_alert/updateNotification", {
              message: "Try again after 3 minutes.",
              error: true,
            });
          } else {
            this.$store.dispatch("notification_alert/updateNotification", {
              message: "Order could not be generated.",
              error: true,
            });
          }
        })
        .finally(() => (this.loading = false));
    },
    loggedIn(value) {
      this.review_order = value;
      this.showSignIn = false;
      this.showSizeInfo = true;
      this.ordered_shoe = {
        ...this.ordered_shoe,
        slug: this.singleSneakerData.product_attributes.slug,
        product_type: this.singleSneakerData.product_attributes.product_type,
        name: this.singleSneakerData.product_attributes.name,
      };
      this.nextBtn = "Next";

      //for wishlist

      if (this.user != null) {
        axios
          .get("/wish-list", {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then((res) => {
            res.data.wish_list.forEach((el) => {
              if (
                this.singleSneakerData.product_attributes.name ===
                el.name
              ) {
                this.wishlisted = true;
              }
            });
          });
      } else this.wishlisted = false;
    },
    buyerSignedUp(value) {
      this.buyerSigned = value;
      this.showSizeInfo = true;
    },
    loginToBuy() {
      (this.showSizeInfo = false), (this.showSignIn = true);
      this.buyerSigned = false;
    },
    size(value) {
      this.ordered_shoe.size = value;
      if (this.singleSneakerData.product_size_price[this.ordered_shoe.size])
        this.price =
          this.singleSneakerData.product_size_price[this.ordered_shoe.size];
      // localStorage.setItem("price", this.price);
      // this.ordered_shoe.price = localStorage.getItem("price");
    },
    async next() {
      if (!this.review_order && !this.shippingInfo) {
        this.nextBtn = "Next";
        this.ordered_shoe.slug = this.singleSneakerData.product_attributes.slug;
        this.ordered_shoe.product_type =
          this.singleSneakerData.product_attributes.product_type;
        this.ordered_shoe.name = this.singleSneakerData.product_attributes.name;
        if (this.user) this.review_order = true;
        if (this.review_order) {
          if (this.$refs.buyNow) {
            this.$nextTick(() => this.$refs.buyNow.focus());
          }
          let payload;
          payload = { ...this.ordered_shoe };
          payload.price = String(parseInt(this.ordered_shoe.price) + 2000);
          this.shippingInfo = false;
        }
      } else if (!this.shippingInfo) {
        this.review_order = false;
        this.shippingInfo = true;
      } else if (!this.review_order && this.shippingInfo) {
        this.review_order = false;
        this.shippingInfo = true;
        this.$refs.shippingInfo.onSave();
      }

      if (this.nextBtn === "Pay") {
        this.makePayment();
      }

      if (this.nextBtn === "Bid") {
        this.loading = true;
        try {
          const { data } = await this.$createOrder(
            {
              ...this.defaultAddress,
              ...this.ordered_shoe,
              price: this.finalBidPrice,
              isBid: true,
            },
            this.token
          );

          if ("errors" in data) {
            this.$store.dispatch("notification_alert/updateNotification", {
              message: "Bid Failed.",
              error: true,
            });
          } else {
            this.showSuccessModal("Bid Made Succesfully.");
            webengage.track("Bid", {
              product_id: this.ordered_shoe.slug,
              size: this.ordered_shoe.size,
              bid_price: this.finalBidPrice,
            });
          }
        } catch {
          this.$store.dispatch("notification_alert/updateNotification", {
            message: "Bid Failed.",
            error: true,
          });
        } finally {
          this.loading = false;
        }
      }
    },
    back() {
      if (this.review_order) {
        this.showBottomButtons = true;
        this.review_order = false;
        this.nextBtn = "Buy";
      }
      if (this.shippingInfo) {
        this.$refs.shippingInfo.onBack();
        this.showAddressForm = false;
      }
    },
    noShippingInfo(value) {
      if (value) {
        this.review_order = true;
        this.shippingInfo = !this.shippingInfo;
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    makeWishlist() {
      if (this.token) {
        this.wishlisted = !this.wishlisted;
        let payload = {};
        payload.name = this.singleSneakerData.product_attributes.name;
        payload["wishlist-action"] = this.wishlisted;
        axios
          .patch("/wish-list", payload, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then((res) => {
            let successMessage =
              res.data && res.data.message && this.wishlisted
                ? { message: "Added to wishlist.", error: false }
                : { message: "Removed from wishlist.", error: false };
            this.$store.dispatch(
              "notification_alert/updateNotification",
              successMessage
            );
            webengage.track("wishlist_action", {
              wishlist_action: this.wishlisted ? "add" : "remove",
              product_name: this.singleSneakerData.product_attributes.name,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.wishlisted = false;
        this.$store.dispatch("notification_alert/updateNotification", {
          message: "Please login",
          error: true,
        });
      }
    },
    beOnProductDetails() {
      //coming from header => search-id
      (this.review_order = false), (this.shippingInfo = false);
      this.wishlisted = false;
    },
    payBtn(value) {
      //to change the msg on next button
      if (value) {
        this.nextBtn = this.activeTab === "buy" ? "Pay" : "Bid";
      } else {
        this.nextBtn = "Next";
      }
    },
    readMore() {
      this.showMore = !this.showMore;
      if (!this.showMore) {
        this.story_html = this.singleSneakerData.product_attributes.story_html;
        if (this.story_html) {
          this.story_html = he.decode(this.story_html);
        }
      } else this.story_html = this.story_html.substr(0, 300);
    },
  },
  mounted() {
    if (this.singleSneakerData.product_attributes) {
      this.getBidsByProduct();
      if (this.user != null) {
        axios
          .get("/wish-list", {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then((res) => {
            res.data.wish_list.forEach((el) => {
              if (
                this.singleSneakerData.product_attributes.name ===
                el.name
              )
                this.wishlisted = true;
            });
          });
      } else this.wishlisted = false;

      this.path = `${this.singleSneakerData.product_attributes.brand_name} / ${
        this.singleSneakerData.product_attributes.silhouette ||
        this.singleSneakerData.product_attributes.name
      }`;

      this.sizefromdb = Object.keys(this.singleSneakerData.product_size_price);
      this.sizefromdb = this.sizefromdb.sort(function (a, b) {
        return a.price - b.price;
      });

      this.ordered_shoe.size = this.sizefromdb[0];
      this.ordered_shoe.price =
        this.singleSneakerData.product_size_price && this.singleSneakerData?.product_size_price[this.sizefromdb[0]] && this.singleSneakerData?.product_size_price[this.sizefromdb[0]]["price"];
      this.ordered_shoe.product_id =
        this.singleSneakerData?.product_size_price && this.singleSneakerData.product_size_price[this.sizefromdb[0]] && this.singleSneakerData.product_size_price[this.sizefromdb[0]][
          "product_id"
        ];

      // if (!this.ordered_shoe.size) {
      //   if (localStorage.size) {
      //     this.ordered_shoe.size = localStorage.getItem("size");
      //   } else {
      //     localStorage.setItem("size", this.sizefromdb[0]);
      //
      //   }
      // }

      // if (!this.ordered_shoe.price) {
      //   if (localStorage.price) {
      //     this.ordered_shoe.price = localStorage.getItem("price");
      //   } else {
      //     localStorage.setItem(
      //       "price",
      //       this.singleSneakerData.product_size_price[localStorage.size]
      //     );
      //     this.ordered_shoe.price = this.singleSneakerData.product_size_price[
      //       localStorage.size
      //     ];
      //   }
      // }

      this.story_html = this.singleSneakerData.product_attributes.story_html;
      if (this.story_html) {
        this.story_html = he.decode(this.story_html);
        this.story_html = this.story_html.substr(0, 300);
      }

      this.windowWidth = window.innerWidth;
      this.$nextTick(() => {
        window.addEventListener("resize", this.onResize);
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    localStorage.removeItem("size");
    localStorage.removeItem("price");
  },
};
</script>
<style lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.div-header.solesearchindia {
  justify-content: unset !important;
}

.tooltip {
  position: relative;
}
.tooltip:active:after {
  content: attr(title);
  padding: 5px;
  border: 1px solid #ccc;
  top: 5px;
  right: 10%;
  background: #bada55;
}

.view-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  button {
    width: 110px;
    font-size: 12px !important;
  }
  @media only screen and (min-width: 993px) {
    margin-top: 8px;
    justify-content: flex-start;
  }
}
.product-actions {
  @media screen and (min-width: 994px) {
    position: sticky;
    top: 70px;
    height: 670px;
  }
}

.product-breadcrumb {
  display: none;
  margin-top: 8px;
  font-size: 12px;
  text-transform: uppercase;
  a {
    color: rgb(104, 104, 110);
  }
  a:hover {
    color: #ee2257;
  }
  @media only screen and (min-width: 500px) {
    display: block;
  }
}

.modal-text {
  font-size: 20px;
  font-weight: 500;
}
.check {
  svg {
    width: 60px;
    height: 60px;
    color: green;
  }
}

.bottom-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px 0 8px;
  gap: 16px;
  height: 100px;
  border-top: 1px solid lightgrey;
  bottom: 0;
  position: sticky;
  background: white;
  font-size: 12px;
  @media only screen and (min-width: 992px) {
    display: none;
  }
  @media only screen and (max-width: 400px) {
    font-size: 10px;
  }
  .bot-buttons {
    height: 72px;
    width: 120px;
    border-radius: 4px;
    border-style: solid;
    border: 2px solid rgb(19, 19, 21);

    @media only screen and (max-width: 600px) and (min-width: 400px) {
      width: 150px;
    }
    @media only screen and (min-width: 600px) {
      width: 256px;
    }
    .price {
      font-size: 18px;
      font-weight: 600;
      @media only screen and (max-width: 400px) {
        font-size: 16px;
      }
    }
  }
  .sell {
    color: black;
    background: white;
  }
  .buy {
    background: rgb(10, 10, 10);
    color: white;
  }
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

table.text-center * {
  text-align: center;

  th {
    font-size: 12px !important;
  }

  td {
    font-size: 10px !important;
  }

  button {
    font-size: 10px !important;
  }

  @media only screen and (min-width: 499px) {
    th {
      font-size: 18px !important;
    }

    td {
      font-size: 16px !important;
    }

    button {
      font-size: 14px !important;
    }
  }
}

.arrow-button {
  height: 100%;

  button {
    border: none;
    background: transparent;
  }
}

.shipping-back-button {
  max-width: 100% !important;
  margin-top: 8px;
}

.img-container {
  width: 56%;
  padding: 1rem;
  background: white;
  .display-img {
    border: 1px solid lightgrey;
    height: 100px;
    width: 100px;
    cursor: pointer;
    &:focus,
    :active,
    :hover {
      border: 1px solid grey;
    }
  }
  .wishlist {
    display: flex;
    justify-content: flex-end;
    padding: 8px;
    svg {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 992px) {
    width: 100%;
  }
}

.productdetail {
  max-width: 136.6rem;
  margin: 0 auto;
  @media screen and (max-width: 1400px) and (min-width: 993px) {
    padding: 0 5%;
  }
  .price-header {
    color: #5f5f5f;
    font-size: 16px;
  }
  .price-value {
    color: #050505;
    font-size: 28px;
    font-weight: 700;
  }
  button {
    outline: none;
  }

  &__main {
    .pathShower {
      margin: 0rem;
      @media screen and (max-width: 425px) {
        display: none;
      }
      p {
        color: #646464;
        font-size: 1.4rem;
        padding: 2rem 0rem;
        text-transform: uppercase;
        @media screen and (max-width: 992px) {
          padding: 2rem 1rem;
        }
        @media screen and (max-width: 769px) {
          padding: 2rem 2rem;
        }
      }
    }
    .productinfo {
      margin: 0;
      display: flex;
      @media screen and (max-width: 992px) {
        flex-direction: column;
      }
      .img-info {
        padding: 0rem;
        width: 56%;
        margin-right: 0.5rem;
        position: relative;
        @media screen and (max-width: 700px) {
          margin-bottom: 1rem;
        }
        @media screen and (max-width: 425px) {
        }
        &-flex {
          @media screen and (max-width: 425px) {
            display: flex;
            .img-info__img {
              height: 15rem;
            }
          }
          .img-info__img {
            width: 45%;
            @media screen and (max-width: 425px) {
              padding: 0rem;
            }
            @media screen and (min-width: 425px) {
              width: 100%;
            }
            .img-info__productimg {
              display: flex;
              align-items: center;
              @media screen and (max-width: 425px) {
                height: 100%;
              }
            }
          }
          .img-info__text {
            @media screen and (max-width: 425px) {
              width: 60%;
            }
          }
        }
        &__img {
          height: 50rem;
          background-color: $base-white;
          display: flex;
          flex-direction: column;
          overflow-y: scroll;
          @media screen and (max-width: 992px) {
            overflow-x: scroll;
            overflow-y: hidden;
            flex-direction: row;
          }
          &::-webkit-scrollbar {
            width: 0.3rem;
            height: 0.3rem;
            &-thumb {
              background-color: $primary;
            }
          }
          .img-info__productimg {
            min-height: 50rem;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            @media screen and (max-width: 992px) {
              &:first-child {
                padding-left: 25%;
              }
              padding-right: 25%;
              // margin-right: 25%;
            }
            @media screen and (max-width: 570px) {
              height: 35rem;
            }
            img {
              max-height: 50rem;
              width: 90%;
              @media screen and (max-width: 992px) {
                width: 50vw;
              }
            }
          }
          .wishlist {
            position: absolute;
            bottom: 33rem;
            right: 1.9rem;
            @media screen and (max-width: 992px) {
              bottom: 23rem;
            }
            @media screen and (max-width: 885px) {
              bottom: 25.5rem;
            }
            @media screen and (max-width: 700px) {
              bottom: 1.5rem;
            }
            @media screen and (max-width: 425px) {
              bottom: 15.5rem;
            }
            @media screen and (max-width: 386px) {
              bottom: 15.5rem;
            }
            svg {
              width: 2.7rem;
              fill: rgba($color: red, $alpha: 0.6);
              cursor: pointer;
            }
            button {
              padding: 0;
            }
          }
        }
        .center_text {
          div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            @media screen and (min-width: 425px) {
              align-items: center;
            }
            width: 100%;
            h3 {
              font-size: 1.3rem;
              font-weight: bold;
              color: #646464;
            }
            @media screen and (min-width: 425px) {
              h3 {
                font-size: 2rem;
                font-weight: bold;
                text-align: center;
                color: #646464;
                padding-right: 3rem;
                padding-left: 3rem;
                margin-bottom: 1rem;
                margin-top: 2.6rem;
              }
            }
            h6 {
              margin-bottom: 0 !important;
            }
          }
        }
        @media screen and (max-width: 992px) {
          width: 100%;
        }
      }
      .size-info {
        width: 44%;
        @media screen and (max-width: 992px) {
          width: 100%;
        }
        &__different-sizes {
          background-color: white;
          min-height: 50rem;
          padding: 3rem 5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          @media screen and (max-width: 1125px) {
            padding: 3rem 3rem;
          }
          @media screen and (max-width: 992px) {
            padding: 3rem 25%;
          }
          @media screen and (max-width: 700px) {
            padding: 3rem 10%;
          }
          @media screen and (max-width: 425px) {
            padding: 3rem 1rem;
          }
          .size-guide {
            align-self: flex-end;

            button {
              text-decoration: underline;
              font-size: 1.6rem;
              background: transparent;
              border: none;
            }
          }
          h3 {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            // color: #646464;
            color: black;
            padding-right: 3rem;
            padding-left: 3rem;
            width: 80%;
            margin: 0 auto;
            @media screen and (max-width: 425px) {
              padding: 0;
              width: 100%;
            }
          }
          .shoe-size {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            button {
              font-size: 1.6rem;
              color: #646464;
            }
            &__topbuttons {
              margin-bottom: 1.7rem;
              .sizetype {
                font-weight: bold;
                border: none;
              }
              .issizeAvailable {
                background-color: #fff;
                padding: 0.05rem 1rem;
                border: 0.1rem solid #fff;
                border-radius: 2rem;
              }
            }
            .size {
              table {
                td {
                  padding: 1.5rem 1rem;
                  width: 4.4rem;
                  @media screen and (max-width: 425px) {
                    padding: 1rem 0;
                  }
                }
              }
              @media screen and (max-width: 992px) {
                margin-bottom: 0;
              }
            }
            .product-info__sizeGuide {
              &--button {
                border: none;
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
          }

          .price {
            h3 {
              color: #323232;
              margin-bottom: 1rem;
              @media screen and (max-width: 992px) {
                margin-top: 0;
                margin-bottom: 0;
              }
            }
          }
          .review__order {
            .action-buttons {
              width: 180px;
              height: 54px;
              border-radius: 30px;
              border: 1px;
              color: black !important;
              background-color: rgb(239, 239, 239) !important;
              font-size: 18.5px;
              font-weight: 400;
            }
            .action-buttons-focus {
              width: 180px;
              height: 54px;
              border-radius: 30px;
              border: 1px;
              font-size: 18.5px;
              font-weight: 400;
              outline: none;
              text-decoration: none;
              background-color: black !important;
              color: #ffffff !important;
            }
            &--selected-size {
              display: flex;
              justify-content: space-between;
              background-color: #ffffff;
              border: solid 1px #646464;
              font-size: 1.6rem;
              font-weight: bold;
              text-align: left;
              color: #646464;
              padding: 1rem 2rem 1rem 1rem;
              img {
                height: 2.6rem;
              }
            }
            &--discount {
              display: flex;
              align-items: center;
              input {
                width: 100%;
                outline: none;
                font-size: 1.6rem;
                padding: 1rem 2rem 1rem 1rem;
                text-align: left;
                color: $primary;
                border: solid 1px $grey-dark;
                background-color: rgba($base-white, 0.6);
                margin-top: 3rem;
                margin-bottom: 3rem;
                max-height: 5rem;
              }
              span,
              .apply {
                padding: 1rem 2rem 1rem 2.7rem;
                font-size: 1.6rem;
                font-weight: bold;
                text-align: left;
                color: #323232;
                border: solid 1px #8c8c8c;
                border-left: none;
                background-color: rgba(#ffffff, 1);
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
                    cursor: auto;
                  }
                  td:nth-child(2) {
                    text-align: right;
                  }
                  &:nth-child(1) {
                    td {
                      border-top: none;
                      position: relative;
                      .rectangle-arrow {
                        display: none;
                        position: absolute;
                        left: 14.5rem;
                        top: 0%;
                        width: 90%;
                        z-index: 1;
                        background-image: url("~/assets/images/rectangle arrow/rectangle-8@2x.png");
                        background-size: cover;
                        font-size: 1.3rem;
                        color: #fff;
                        padding-left: 1.5rem;
                        padding-top: 0.3rem;
                        margin: 0;
                        @media screen and (min-width: 1366px) {
                          padding-right: 1.5rem;
                        }
                        @media screen and (max-width: 390px) {
                          width: 80%;
                        }
                      }
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
              .processing__fee {
                cursor: pointer;
                &:hover + .rectangle-arrow {
                  display: block;
                  p {
                    margin-left: 0;
                  }
                }
                &:active + .rectangle-arrow {
                  display: block;
                  p {
                    margin-left: 0;
                  }
                }
              }
            }
          }
          .option-buttons {
            display: flex;
            justify-content: space-between;
            @media screen and (max-width: 992px) {
              flex-direction: column;
              gap: 1rem;
            }
            .buy-button {
              width: 49%;
              a {
                color: inherit;
                text-decoration: none;
              }

              @media screen and (max-width: 992px) {
                width: 100%;
                max-width: 100%;
              }

              height: 54px;
              font-size: 1.85rem;
            }
          }
          @media screen and (max-width: 700px) {
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
        }
        .padding-top-bottom__review_order {
          @media screen and (min-width: 993px) {
            height: 64rem;
            padding: 8rem 5rem;
          }
          h3 {
            margin-bottom: 2rem;
          }
        }
        .loginSignup {
          @media screen and (max-width: 992px) {
            min-height: auto !important;
          }
          .signup,
          .reset {
            max-width: none;
            .signupdiv {
              form {
                .view-password {
                  bottom: 47%;
                  @media screen and (max-width: 1140px) and (min-width: 992px) {
                    bottom: 48.5%;
                  }
                  @media screen and (max-width: 445px) {
                    bottom: 49%;
                  }
                  @media screen and (min-width: 1400px) {
                    bottom: 44%;
                  }
                }
              }
            }
            .ack {
              width: 100%;
            }
            .thumbsup {
              padding: 0;
              .text {
                .sell {
                  width: 38rem;
                  @media screen and (max-width: 1366px) {
                    width: 90%;
                  }
                }
              }
            }
          }
        }
      }
    }
    .also_dig {
      margin-top: 5rem;
      margin-bottom: 5rem;
      h5 {
        font-size: 2rem;
        font-weight: bold;
        color: #0f0f0f;
        text-align: center;
        margin-bottom: 2rem;
      }
    }
  }
  .secure-icons {
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 992px) {
      padding: 8px 25%;
    }
    @media screen and (max-width: 700px) {
      padding: 8px 10%;
    }
    @media screen and (max-width: 400px) {
      padding: 8px 1rem;
    }
    div {
      display: flex;
      flex-direction: column;
      width: 8.6rem;
      img {
        width: 6.1rem;
        height: 6.1rem;
        margin: 0 auto;
      }
      p {
        text-align: center;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: bold;
        margin-top: 1rem;
        color: rgb(28, 28, 32);
      }
    }
    @media screen and (max-width: 500px) {
      padding: 8px;
      margin: 0;
      margin-top: 4rem;
    }
    &__3 {
      img {
        width: 4.5rem !important;
      }
    }

    &__img-info {
      margin-top: 0;
      padding: 3rem 20%;
      @media screen and (max-width: 992px) {
        padding: 3rem 25%;
      }
      @media screen and (max-width: 700px) {
        padding: 3rem 10%;
      }
      @media screen and (max-width: 425px) {
        display: none;
      }
    }
  }
  .dark_grey {
    margin-top: 0;
  }
  .img-info__text {
    padding-top: 1.7rem;
    @media screen and (max-width: 992px) {
      display: none;
    }
    .story--html {
      @media screen and (max-width: 425px) {
        display: none;
      }
    }
    &-small--screen {
      display: none;
      @media screen and (max-width: 992px) {
        display: block;
      }
    }
  }
  b {
    cursor: pointer;
  }
}
</style>
