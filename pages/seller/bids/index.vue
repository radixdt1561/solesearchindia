<template>
  <div>
    <div class="store-front">
      <div class="store-front__nav">
        <button
          class="store-front__nav--button"
          :class="[isActive ? 'active' : '']"
          @click="
            isActive = true;
            isExpired = false;
            isAccepted = false;
          "
        >
          Active Bids
        </button>
        <button
          class="store-front__nav--button"
          :class="[isAccepted ? 'active' : '']"
          @click="
            isActive = false;
            isExpired = false;
            isAccepted = true;
          "
        >
          Accepted Bids
        </button>
        <button
          class="store-front__nav--button"
          :class="[isExpired ? 'active' : '']"
          @click="
            isActive = false;
            isExpired = true;
            isAccepted = false;
          "
        >
          Expired Bids
        </button>
      </div>
      <b-overlay :show="loading" opacity="1" style="background-color:inherit">
        <div class="store-front__pending" v-if="bids.length !== 0">
          <b-pagination
            v-model="currentPage"
            limit="3"
            size="lg"
            align="center"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="bids-table"
            pills
          ></b-pagination>
          <b-table
            id="bids-table"
            class="text-center"
            :per-page="perPage"
            :current-page="currentPage"
            :fields="fields"
            :items="bids"
            outlined
            borderless
          >
            <template #cell(name)="data">
              <div>
                <b-image-lazy
                  style="max-width:150px;max-height:150px;width:100%;height:100%"
                  :src="
                    `${$config.cloudinaryBaseURL}/q_auto,f_auto/dryp-shoe-pictures/${data.item.slug}/display_picture.png`
                  "
                  alt="product image"
                />
                <p>
                  {{ data.value }}
                </p>
              </div>
            </template>
            <template #cell(price)="data"> &#8377;{{ data.value }} </template>
            <template #cell(actions)="data" v-if="isAccepted">
              <button
                style="min-height:30px"
                class="black-button"
                @click="() => handlePay(data.item)"
              >
                Pay
              </button>
            </template>
          </b-table>
        </div>
        <h4 v-else class="store-front__no-products mt-5">
          No Bid found
        </h4>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import { BTable, BOverlay, BPagination, BImgLazy } from "bootstrap-vue";

export default {
  components: {
    "b-table": BTable,
    "b-overlay": BOverlay,
    "b-pagination": BPagination,
    "b-image-lazy": BImgLazy
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      isActive: true,
      loading: false,
      isExpired: false,
      isAccepted: false,
      activeBids: [],
      acceptedBids: [],
      expiredBids: []
    };
  },
  methods: {
    async handlePay(bid) {
      this.loading = true;
      const { data } = await this.$createBidPayOrder(bid.id, this.token);
      this.loading = false;
      const orderId = data?.data?.createBidPayOrder?.orderId;

      if (orderId) {
        const options = {
          key: this.$config.razorpayKeyId,
          amount: Math.ceil(bid.price) * 100,
          currency: "INR",
          description: "Payment",
          order_id: orderId,
          prefill: {
            name:
              this.user.first_name.toUpperCase() +
              " " +
              this.user.last_name.toUpperCase(),
            email: this.user.email,
            contact: this.user.phone
          },
          theme: {
            color: "#3399cc"
          },
          handler: async (response) => {
            const payload = {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: orderId,
              razorpaySignature: response.razorpay_signature,
              seller: bid.seller
            };
            const res = await this.$payBid(payload, this.token);
            console.log({res})
            if (res.status === 200) {
              this.$router.push('/seller/orders')
            }
          }
        };
        const razorPay = new Razorpay(options);
        razorPay.on("payment.failed", () => {
          this.$store.dispatch("notification_alert/updateNotification", {
            message: "Failed.",
            error: true
          });
        })
        razorPay.open();
      } else {
        this.$store.dispatch("notification_alert/updateNotification", {
          message: "Failed.",
          error: true
        });
      }
    },
    async getInitialData() {
      console.log({user: this.user})
      this.loading = true;
      const { data } = await this.$getBuyerBids(this.token);
      this.loading = false;
      if (data?.data?.bidsByBuyer) {
        data.data.bidsByBuyer.forEach(bid => {
          const expiry = new Date(bid.expiry).toLocaleString();
          if (bid.accepted) {
            if (!bid.active) {
              this.expiredBids.push({ ...bid, expiry: expiry });
            } else {
              const paymentDeadline = new Date(
              bid.paymentDeadline
              ).toLocaleString();
              this.acceptedBids.push({
                ...bid,
                paymentDeadline: paymentDeadline,
                expiry: expiry
              });
            }
          } else if (bid.active) {
            this.activeBids.push({ ...bid, expiry: expiry });
          } else if (!bid.completed) {
            this.expiredBids.push({ ...bid, expiry: expiry });
          }
        });
      }
    }
  },
  async mounted() {
    await this.getInitialData()
  },
  computed: {
    user() {
      return this.$store.getters["authentication/getnewUser"];
    },
    token() {
      return this.$store.getters["authentication/idToken"];
    },
    bids() {
      if (this.isActive) {
        return this.activeBids;
      } else if (this.isExpired) {
        return this.expiredBids;
      } else {
        return this.acceptedBids;
      }
    },
    rows() {
      return this.bids.length;
    },
    fields() {
      const labels = [
        {
          key: "name",
          label: "Product"
        },
        {
          key: "size",
          sortable: true
        },
        {
          key: "price",
          sortable: true,
          label: "Bid Price"
        },
        {
          key: "expiry",
          label: "Bid Expiry",
          sortable: true
        }
      ];
      const acceptedLabels = [
        ...labels,
        {
          key: "Actions"
        }
      ];
      return this.isAccepted ? acceptedLabels : labels;
    }
  }
};
</script>

<style lang="scss" scoped>
.store-front {
  padding: 0 5rem;
  @media screen and (max-width: 640px) {
    padding: 0;
  }
  &__nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    justify-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 3rem;
    @media screen and (max-width: 640px) {
      grid-template-columns: repeat(1, 1fr);
    }

    &--button {
      font-size: 2rem;
      font-weight: bold;
      text-align: left;
      background: none;
      color: #0f0f0f;
      border: none;
      outline: none;
      border-bottom: 4.3px solid #c8c8c8;
      text-transform: uppercase;

      @media screen and (max-width: 1024px) {
        font-size: 1.8rem;
        white-space: nowrap;
        padding: 0;
      }
      @media screen and (max-width: 575px) {
        margin-bottom: 0;
        font-size: 1.5rem;
      }
      @media screen and (max-width: 420px) {
        font-size: 1.4rem;
      }

      &.active {
        color: $primary;
        border-bottom: 4.3px solid $primary;
      }
    }
  }
  &__pending {
    @media screen and (max-width: 1800px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    &--search {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 41%;
      margin: 0 auto;
      margin-bottom: 6rem;
      // display: none;
      @media screen and (max-width: 1024px) {
        width: 100%;
      }
      @media screen and (max-width: 575px) {
        width: 100%;
      }
      @media screen and (min-width: 1024px) and (max-width: 1200px) {
        width: 60%;
      }
    }
    &--input {
      &-wrapper {
        width: 100%;
        margin-bottom: 2.9rem;
        position: relative;
        @media screen and (max-width: 1024px) {
          margin-bottom: 0;
        }
      }

      &-element {
        border: none;
        outline: none;
        padding: 1.2rem;
        font-size: 1.6rem;
        text-align: left;
        color: #c8c8c8;
        width: 100%;
        @media screen and (max-width: 575px) {
          padding: 1.2rem 4rem 1.2rem 1.2rem;
        }
      }
      &-img {
        width: 2.5rem;
        position: absolute;
        margin: 0 auto;
        top: 1.2rem;
        right: 2.8rem;
        @media screen and (max-width: 575px) {
          right: 1rem;
        }
      }
    }
    &--item {
      height: 16rem;
      display: flex;
      width: 75%;
      margin: 0 auto 1rem auto;
      justify-content: space-between;
      align-items: center;
      @media screen and (min-width: 1024px) and (max-width: 1200px) {
        width: 90%;
      }
      @media screen and (min-width: 1200px) and (max-width: 1300px) {
        width: 80%;
      }
      @media screen and (max-width: 1024px) {
        width: 48%;
        flex-direction: column;
        height: fit-content;
        justify-content: unset;
        align-items: unset;
        position: relative;
        margin: 1%;
        margin-top: 3rem;
      }
      @media screen and (max-width: 575px) {
        width: 85%;
        margin: 0 auto;
        &:not(:first-child) {
          margin-top: 3rem;
        }
      }

      &-img {
        &-wrapper {
          width: 23rem;
          height: 100%;
          max-height: 16rem;
          display: flex;
          justify-content: center;
          align-items: center;

          @media screen and (max-width: 1024px) {
            height: 30rem;
            max-height: 30rem;
            width: 100%;
          }
          @media screen and (max-width: 575px) {
            max-height: 24rem;
            width: 100%;
          }
        }
        &-element {
          max-height: 100%;
          width: auto;
          height: 100%;
          backface-visibility: hidden;
          @media screen and (max-width: 1024px) {
            max-height: 100%;
          }
        }
      }

      &-text {
        font-size: 1.6rem;
        font-weight: bold;
        @media screen and (min-width: 1025px) {
          margin: 0 2rem;
          flex: 0.9;
        }
        @media screen and (max-width: 1024px) {
          padding: 2% 6%;
        }
      }

      &-name {
        color: $primary;
        margin-bottom: 0;
      }

      &-price {
        margin-top: 0.5rem;
        color: $button-dark;
      }

      &-views {
        text-align: center;
        @media screen and (max-width: 1024px) {
          position: absolute;
          right: 2rem;
          top: 2rem;
        }
        &-img {
          width: 3rem;
          height: auto;
        }
        &-count {
          font-size: 1.6rem;
          font-weight: bold;
          color: $primary;
          margin-top: 0.5rem;
        }
      }
      &-buttons {
        display: flex;
        justify-content: space-between;

        @media screen and (max-width: 1024px) {
          margin-top: 0.5rem;
        }
      }
      &-edit {
        height: 5rem;
        width: 5rem;

        &-button {
          background-color: $base-white;
          border: none;
          height: inherit;
          width: inherit;
          & img {
            width: 2.6rem;
            height: auto;
          }
        }
      }

      &-status {
        @media screen and (max-width: 1024px) {
          width: 100%;
        }
        &-button {
          background-color: $button-dark;
          max-height: 5rem;
          font-size: 1.85rem;
          padding: 1.2rem 2.3rem;
          color: $base-white;
          border: none;
          margin-left: 3rem;
          @media screen and (max-width: 1024px) {
            width: 98%;
            margin-left: 2%;
          }
        }
      }
    }
  }
  &__no-products {
    color: $primary;
    font-size: 2rem;
    margin-bottom: 2.5rem;
    font-weight: bold;
    text-align: center;
    @media screen and (max-width: 575px) {
      font-size: 1.3rem;
    }
  }
}
</style>
