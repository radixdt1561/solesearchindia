<template>
  <div @mouseover="onOver" @mouseleave="onLeave">
    <b-nav-item-dropdown
      @toggle.prevent="onClick"
      toggle-class="text-decoration-none"
      :text="title"
      size="lg"
      no-caret
      variant="link"
      ref="dropdown"
    >
      <slot></slot>
    </b-nav-item-dropdown>
  </div>
</template>

<script>
export default {
  name: "b-dropdown-hover",
  props: {
    title: {
      type: String,
      default: "Title"
    }
  },
  methods: {
    onOver() {
      if (this.$refs.dropdown) {
        this.$refs.dropdown.visible = true;
      }
    },
    onLeave() {
      if (this.$refs.dropdown) {
        this.$refs.dropdown.visible = false;
      }
    },
    onClick() {
      if (this.title !== "More") {
        this.$router.push({
          name: "products",
          query: { product_type: this.title }
        });
        this.$refs.dropdown.visible = false;
      }
    }
  }
};
</script>
