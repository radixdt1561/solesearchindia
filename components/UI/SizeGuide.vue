<template>
  <b-sidebar
    :id="id"
    sidebar-class="sidebar-width"
    title="Size Guide"
    backdrop-variant="dark"
    bg-variant="white"
    right
    shadow
    lazy
    backdrop
  >
    <div class="px-3 py-2">
      <b-table
        class="text-center"
        :fields="fields"
        :items="sizeGuideData"
        outlined
        borderless
        striped
      >
      </b-table>
    </div>
  </b-sidebar>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      fields: [
        {
          key: "us",
          label: "US (Men)"
        },
        {
          key: "usw",
          label: "US (Women)"
        },
        {
          key: "uk",
          label: "UK"
        },
        {
          key: "eu",
          label: "EU"
        }
      ],
      sizeGuideData: [
        { us: 3, uk: 2.5, eu: 35, usw: 4.5 },
        { us: 3.5, uk: 3, eu: 35.5, usw: 5 },
        { us: 4, uk: 3.5, eu: 36, usw: 5.5 },
        { us: 4.5, uk: 4, eu: 36.5, usw: 6 },
        { us: 5, uk: 4.5, eu: 37.5, usw: 6.5 },
        { us: 5.5, uk: 5, eu: 38, usw: 7 },
        { us: 6, uk: 5.5, eu: 38.5, usw: 7.5 },
        { us: 6.5, uk: 6, eu: 39, usw: 8 },
        { us: 7, uk: 6.5, eu: 40, usw: 8.5 },
        { us: 7.5, uk: 7, eu: 40.5, usw: 9 },
        { us: 8, uk: 7.5, eu: 41, usw: 9.5 },
        { us: 8.5, uk: 8, eu: 42, usw: 10 },
        { us: 9, uk: 8.5, eu: 42.5, usw: 10.5 },
        { us: 9.5, uk: 9, eu: 43, usw: 11 },
        { us: 10, uk: 9.5, eu: 44, usw: 11.5 },
        { us: 10.5, uk: 10, eu: 44.5, usw: 12 },
        { us: 11, uk: 10.5, eu: 45, usw: 12.5 },
        { us: 11.5, uk: 11, eu: 45.5, usw: 13 },
        { us: 12, uk: 11.5, eu: 46, usw: 13.5 },
        { us: 12.5, uk: 12, eu: 47, usw: 14 },
        { us: 13, uk: 12.5, eu: 47.5, usw: 14.5 },
        { us: 13.5, uk: 13, eu: 48, usw: 15 },
        { us: 14, uk: 13.5, eu: 48.5, usw: 15.5 },
        { us: 14.5, uk: 14, eu: 49, usw: 16 },
        { us: 15, uk: 14.5, eu: 49.5, usw: 16.5 },
        { us: 16, uk: 15.5, eu: 50.5, usw: 17 },
        { us: 17, uk: 16.5, eu: 51.5, usw: 17.5 },
        { us: 18, uk: 17.5, eu: 52.5, usw: 18 }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.sizeGuide {
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 100;
  position: fixed;
  background-color: #fff;
  overflow-y: scroll;
  &__header {
    &--wrapper {
      position: sticky;
      top: 0;
      width: 100%;
      background-color: #fff;
    }
    &--heading {
      width: 100%;
      display: flex;
      padding: 1.5rem;
      color: $primary;
      align-items: center;

      & span:first-child {
        font-size: 2rem;
        flex: 1;
        text-align: center;
        font-weight: bold;
        @media screen and (max-width: 575px) {
          font-size: 1.6rem;
        }
      }
    }
    &--title {
      background-color: $base-white;
      font-size: $small-screen-font;
      display: flex;
      border: 1px solid $grey-medium;
      padding: 0.7rem;
      height: 5rem;
      line-height: 2.5rem;

      & span {
        display: flex;
        font-weight: bold;
        color: #646464;
        flex: 1;
        text-align: center;
        align-items: center;
        justify-content: center;
        &:not(:last-child) {
          border-right: 1px solid $grey-medium;
        }
      }

      @media screen and (min-width: 575px) {
        font-size: $mid-screen-font;
      }
    }
  }
  &__table {
    display: table;
    border-collapse: collapse;

    & tbody tr:nth-of-type(odd) {
      background-color: $base-grey;
    }
    & tbody tr:nth-of-type(even) {
      background-color: $grey-light;
    }

    & td {
      text-align: center;
      font-size: $small-screen-font;
      color: $primary;
      font-weight: 600;
      padding: 1.4rem;
      @media screen and (min-width: 575px) {
        font-size: $mid-screen-font;
      }
    }
  }

  & thead tr {
    background-color: $base-white;
  }

  & thead th {
    border-right: 1px solid $grey-light;
    position: relative;

    &::before {
      border-left: 1px solid #eaeaec !important;
      width: 1px;
      height: 22px;
      position: absolute;
      left: 50%;
      top: 15px;
      z-index: 1;
    }
  }
}
img {
  vertical-align: middle;
  border-style: none;
  width: 100%;
  height: auto;
  max-width: 2rem;
}
.showasmodal {
  position: absolute;
}
</style>
