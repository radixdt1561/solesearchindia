<template>
  <div>
    <div v-if="!isCheckStatusActive">
      <div v-if="finalProductData.length !== 0">
        <b-pagination
          v-model="currentPage"
          limit="3"
          size="lg"
          align="center"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="data-table"
          pills
        ></b-pagination>
        <b-table
          id="data-table"
          class="text-center"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          :items="finalProductData"
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
            &#8377;{{
              ["Sneakers", "Streetwear"].includes(data.item.product_type)
                ? $getOriginalProductPrice(data.value)
                : data.value
            }}
          </template>
          <template #cell(actions)="data">
            <div class="d-flex actions">
              <button
                class="black-button small"
                @click="() => checkShoeStatus(data.item)"
              >
                Check Status
              </button>
              <button
                class="red-button small"
                @click="() => onDeleteProduct(data.item.product_id)"
              >
                Delete
              </button>
            </div>
          </template>
        </b-table>
      </div>
      <h4 v-else class="no-products ">
        No Product Found
      </h4>
    </div>
    <CheckStatus
      @closeCheckStatus="
        isCheckStatusActive = false;
        shoeStatus = null;
      "
      :shoeStatus="shoeStatus"
    />
  </div>
</template>

<script>
import { BTable, BPagination, BImgLazy } from "bootstrap-vue";
import CheckStatus from "@/components/seller/CheckStatus";

export default {
  components: {
    "b-table": BTable,
    "b-pagination": BPagination,
    "b-image-lazy": BImgLazy,
    CheckStatus
  },
  props: {
    isPendingActive: {
      type: Boolean,
      default: false
    },
    isSoldProductsActive: {
      type: Boolean,
      default: false
    }
  },
  async mounted() {
    let result = await this.$getStoreFrontPendingProducts(this.token);
    this.pendingProductsData = result.data?.products;
    result = await this.$getStoreFrontSoldProducts(this.token);
    this.soldProductsData = result.data?.products;
  },
  data() {
    return {
      pendingProductsData: [],
      soldProductsData: [],
      fields: [
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
          label: "Payout"
        },
        "Actions"
      ],
      perPage: 10,
      currentPage: 1,
      isCheckStatusActive: false,
      shoeStatus: null,
      finalData: []
    };
  },
  methods: {
    checkShoeStatus(product) {
      this.isCheckStatusActive = true;
      this.shoeStatus = product;
    },
    onDeleteProduct(productId) {
      this.$bvModal
        .msgBoxConfirm("Are you sure you want to delete this product ?", {
          title: false,
          size: "sm",
          buttonSize: "lg",
          okVariant: "danger",
          cancelVariant: "dark",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2 border-top-0",
          bodyClass: "text-center modal-text",
          centered: true
        })
        .then(value => {
          if (value === true) {
            this.$deleteStoreFrontProduct(productId, this.token)
              .then(() => {
                if (this.isPendingActive) {
                  this.pendingProductsData = this.pendingProductsData.filter(
                    el => el.product_id !== productId
                  );
                } else {
                  this.soldProductsData = this.soldProductsData.filter(
                    el => el.product_id !== productId
                  );
                }
                this.$store.dispatch("notification_alert/updateNotification", {
                  message: "Product deleted successfully.",
                  error: false
                });
              })
              .catch(() => {
                this.$store.dispatch("notification_alert/updateNotification", {
                  message: "Failed.",
                  error: true
                });
              });
          }
        });
    }
  },
  computed: {
    rows() {
      return this.finalProductData.length;
    },
    token() {
      return this.$store.getters["authentication/idToken"];
    },
    finalProductData() {
      if (this.isPendingActive) {
        return this.pendingProductsData;
      } else if (this.isSoldProductsActive) {
        return this.soldProductsData;
      } else return [];
    }
  }
};
</script>
<style lang="scss" scoped>
.actions {
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  @media screen and (min-width: 720px) {
    flex-direction: row;
  }
}

.modal-text {
  font-size: 16px;
  font-weight: 500;
}

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
