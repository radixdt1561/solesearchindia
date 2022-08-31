<template>
  <b-overlay :show="loading" opacity="1" style="background-color:inherit">
    <div v-if="bids.length !== 0">
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
            <b-img-lazy
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
        <template #cell(price)="data">
          &#8377;{{ $getOriginalProductPrice(data.value / 1.0344) }}
        </template>
        <template #cell(actions)="data">
          <button
            style="min-height:40px"
            class="black-button"
            v-if="isPendingBidsActive"
            @click="() => handleAccept(data.item.id)"
          >
            Accept
          </button>
          <button
            style="min-height:40px"
            class="black-button"
            v-if="!isPendingBidsActive"
            @click="() => handleReject(data.item.id)"
          >
            Reject
          </button>
        </template>
      </b-table>
    </div>
    <h4 v-else class="no-products ">
      No Bid Found
    </h4>
  </b-overlay>
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
  props: {
    isPendingBidsActive: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data() {
    return {
      pendingBids: [],
      acceptedBids: [],
      perPage: 10,
      currentPage: 1,
      loading: false
    };
  },
  mounted() {
    this.getPendingBids();
    this.getAcceptedBids();
  },
  methods: {
    async getPendingBids() {
      this.loading = true;
      const { data: bids } = await this.$getSellerBids(this.token);
      if (bids?.data?.bidsForSeller) {
        this.pendingBids = bids.data.bidsForSeller.map(bid => {
          return { ...bid, expiry: new Date(bid.expiry).toLocaleString() };
        });
      }
    },
    async getAcceptedBids() {
      const { data: acceptedBids } = await this.$getSellerAcceptedBids(
        this.token
      );
      if (acceptedBids?.data?.acceptedBidsForSeller) {
        this.acceptedBids = acceptedBids.data.acceptedBidsForSeller.map(bid => {
          // if (new Date(bid.paymentDeadline) < new Date()) {
          //   this.handleReject(bid.id);
          // }
          return {
            ...bid,
            paymentDeadline: new Date(bid.paymentDeadline).toLocaleString()
          };
        });
      }
      this.loading = false;
    },
    async handleAccept(id) {
      const { data } = await this.$acceptBid(id, this.token);
      if (data?.data?.acceptBid?.error === false) {
        this.$store.dispatch("notification_alert/updateNotification", {
          message: "Bid Accepted",
          error: false
        });
        this.getPendingBids();
        this.getAcceptedBids();
      } else {
        this.$store.dispatch("notification_alert/updateNotification", {
          message: "Failed.",
          error: true
        });
      }
    },
    async handleReject(id) {
      const { data } = await this.$rejectBid(id, this.token);
      if (data?.data?.rejectBid?.error === false) {
        this.$store.dispatch("notification_alert/updateNotification", {
          message: "Bid Rejected",
          error: false
        });
        this.getPendingBids();
        this.getAcceptedBids();
      } else {
        this.$store.dispatch("notification_alert/updateNotification", {
          message: "Failed.",
          error: true
        });
      }
    }
  },
  computed: {
    token() {
      return this.$store.getters["authentication/idToken"];
    },
    bids() {
      if (this.isPendingBidsActive) {
        return this.pendingBids.sort((a, b) => b.price - a.price);
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
          label: "Payout Price"
        },
        {
          key: "expiry",
          label: "Bid Expiry",
          sortable: true
        },
        "Actions"
      ];
      if (!this.isPendingBidsActive) {
        labels[3] = { key: "paymentDeadline" };
      } else {
        labels[3] = {
          key: "expiry",
          label: "Bid Expiry"
        };
      }
      return labels;
    }
  }
};
</script>
<style scoped>
.no-products {
  color: inherit;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;

  @media screen and (max-width: 575px) {
    font-size: 1.3rem;
  }
}
</style>
