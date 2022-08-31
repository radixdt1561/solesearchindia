<template>
  <section class="sell">
    <SellerHeader />
    <section class="sell__components">
      <div class="sell__userinfo">
        <p class="sell__userinfo--text">
          Hello
          {{
            user &&
            user.first_name.charAt(0).toUpperCase() +
              user.first_name.slice(1).toLowerCase()
          }}
        </p>
        <p @click="logout" class="sell__userinfo--text logout">Log Out</p>
      </div>
      <div class="sell__container">
        <NuxtChild />
      </div>
    </section>
  </section>
</template>

<script>
import axios from "axios";
import SellerHeader from "@/components/seller/SellerHeader";

export default {
  middleware: ["check-auth", "auth"],
  components: { SellerHeader },
  computed: {
    user() {
      return this.$store.getters["authentication/getnewUser"];
    },
    users() {
      return this.$store.getters["authentication/getUser"];
    },
    notificationData() {
      return this.$store.getters["notification_alert/getNotificationAlert"];
    },
  },
  async asyncData(context) {
    const user = await axios.get("/user-update", {
      headers: {
        Authorization:
          "Bearer " + context.store.getters["authentication/idToken"],
      },
    });
    context.store.commit("authentication/updateUser", { user: user.data.user });
    // return { users: user.data.user };
  },
  methods: {
    logout() {
      this.$store
        .dispatch("authentication/updateLogout")
        .then(() => this.$router.replace("/"));
      webengage.user.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.sell {
  background-color: $grey-light;
  &__components {
    @media screen and (max-width: 1400px) and (min-width: 992px) {
      padding: 0 5%;
    }
  }
  &__userinfo {
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
    font-weight: bold;
    text-align: left;
    color: #0f0f0f;
    padding: 2rem 0;
    margin: 0;
    @media screen and (max-width: 700px) {
      justify-content: center;
      .logout {
        display: none;
      }
    }
    @media screen and (max-width: 992px) {
      padding: 2rem 1rem;
    }
    &--text {
      margin-bottom: 0;
      @media screen and (max-width: 575px) {
        font-size: 1.8rem;
      }
    }
  }
  &__components {
    max-width: 136.6rem;
    margin: 0rem auto;
  }
  &__container {
    box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.35);
    background-color: $base-grey;
    padding-top: 5.5rem;
    padding-bottom: 12rem;
    min-height: calc(100vh - 270px);
    @media screen and (max-width: 575px) {
      min-height: calc(100vh - 445px);
    }
  }
}
.logout {
  text-decoration: underline;
  text-decoration-color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
}
</style>
