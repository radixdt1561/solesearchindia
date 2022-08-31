<template>
  <div v-if="orders">
    <div class="store-front__pending" v-if="!isCheckStatusActive">
      <h4 v-if="orders.length === 0" class="store-front__no-products mt-5">
        No product found
      </h4>
      <div v-else>
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
          :items="orders"
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
          <template #cell(price)="data"> &#8377;{{ data.value }} </template>
          <template #cell(orderedAt)="data">
            {{ new Date(data.value).toLocaleString() }}
          </template>
          <template #cell(actions)="data">
            <div class="text-center" v-if="data.item.productId">
              <button
                class="black-button small"
                @click="() => getProductStatus(data.item.productId)"
              >
                Check Status
              </button>
            </div>
          </template>
          <template #cell(success)="data">
            <b-check v-if="data.value" variant="success" />
            <b-x v-else variant="danger" />
          </template>
        </b-table>
      </div>
    </div>
    <CheckStatus
      v-else
      @closeCheckStatus="
        isCheckStatusActive = false;
        productStatus = null;
      "
      :shoeStatus="productStatus"
    />
  </div>
</template>

<script>
import axios from "axios";
import CheckStatus from "@/components/seller/CheckStatus";
import { BIconCheckCircleFill, BIconXCircleFill } from "bootstrap-vue";
export default {
  components: {
    CheckStatus,
    "b-x": BIconXCircleFill,
    "b-check": BIconCheckCircleFill
  },
  data() {
    return {
      isCheckStatusActive: false,
      productStatus: undefined,
      orders: [],
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
          sortable: true
        },
        {
          key: "orderedAt",
          sortable: true
        },
        {
          key: "success",
          label: "Status"
        },
        "Actions"
      ],
      perPage: 10,
      currentPage: 1
    };
  },
  async asyncData(context) {
    try {
      const { data } = await axios.post(
        "/graphql",
        {
          query: `query{
  ordersByBuyer{
    productId
    slug
    size
    orderedAt
    success
    name
    price
  }
}`
        },
        {
          headers: {
            Authorization:
              "Bearer " + context.store.getters["authentication/idToken"]
          }
        }
      );
      return {
        orders: data.data.ordersByBuyer.map(order => {
          return {
            ...order,
            date: new Date(order["orderedAt"]).toLocaleString()
          };
        })
      };
    } catch (err) {
      context.store.dispatch("notification_alert/updateNotification", {
        message: "Something went wrong",
        error: true
      });
    }
  },
  methods: {
    getProductStatus(productId) {
      axios
        .get(`/product/id/${productId}`, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(res => {
          this.productStatus = res.data.product;
          this.isCheckStatusActive = true;
        })
        .catch(() =>
          this.$store.dispatch("notification_alert/updateNotification", {
            message: "Something went wrong",
            error: true
          })
        );
    }
  },
  computed: {
    rows() {
      return this.orders.length;
    },
    token() {
      return this.$store.getters["authentication/idToken"];
    }
  }
};
</script>

<style lang="scss" scoped>
.store-front {
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
