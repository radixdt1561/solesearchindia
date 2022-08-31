export const filterOptionsMixin = {
  data() {
    return {
      brands: [],
      genders: [],
      prices: [
        { name: "All Prices", value: "1-9999999999" },
        { name: "Below ₹ 5,000", value: "0-5000" },
        { name: "₹ 5,000 - ₹ 10,000", value: "5000-10000" },
        { name: "₹ 10,000 - ₹ 15,000", value: "10000-15000" },
        { name: "₹ 15,000 - ₹ 20,000", value: "15000-20000" },
        { name: "₹ 20,000 - ₹ 25,000", value: "20000-25000" },
        { name: "₹ 25,000 - ₹ 30,000", value: "25000-30000" },
        { name: "₹ 30,000 - ₹ 35,000", value: "30000-35000" },
        { name: "₹ 35,000 - ₹ 40,000", value: "35000-40000" },
        { name: "₹ 40,000 - ₹ 45,000", value: "40000-45000" },
        { name: "₹ 45,000 - ₹ 50,000", value: "45000-50000" },
        { name: "₹ 50,000 - ₹ 1,00,000", value: "50000-100000" },
        { name: "₹ 1,00,000 & Above", value: "100000-9999999999" }
      ],
      sizes: [],
      colors: [
        { value: "Black", backgroundColor: "#000000" },
        { value: "Brown", backgroundColor: "#ca8d49" },
        { value: "Cream", backgroundColor: "#fffdd0" },
        { value: "Green", backgroundColor: "#74ab37" },
        { value: "White", backgroundColor: "#ffffff" },
        { value: "Orange", backgroundColor: "#fc813b" },
        { value: "Yellow", backgroundColor: "#ebcb18" },
        { value: "Blue", backgroundColor: "#2116b5" },
        { value: "Copper", backgroundColor: "#ce7861" },
        { value: "Gold", backgroundColor: "#d4af37" },
        { value: "Grey", backgroundColor: "#bebebe" },
        {
          value: "Multi",
          backgroundImage: "linear-gradient(to top, #12d6df, #f70fff);"
        },
        { value: "Red", backgroundColor: "#e74341" },
        { value: "Purple", backgroundColor: "#8a57bc" }
      ],
      selected: {},
      notSize: {},
      onMount: {
        brands: [],
        genders: [],
        sizes: [],
        color: [],
        product_type: []
      }
    };
  },
  methods: {
    showSizeValue(sizes, index, index2) {
      //only show boxes with size
      if (typeof sizes[index * 4 + index2] !== "undefined") {
        return sizes[index * 4 + index2]["value"];
      } else {
        this.$set(this.notSize, index * 4 + index2, true);
        return;
      }
    },
    selectSize(sizes, event) {
      let sizeIndex = sizes.findIndex(
        el => el.value === event.target.innerHTML.trim()
      );
      // let selectedValue = +event.target.innerHTML;
      this.$set(sizes[sizeIndex], "selected", !sizes[sizeIndex].selected);
      this.$set(this.selected, sizeIndex, !this.selected[sizeIndex]);
    },
    onMountdynamicFilterOptions(facetOptions, facetName) {
      this[facetName] = [];
      this.onMount[facetName] = [];
      Object.keys(facetOptions).forEach(el => {
        this.onMount[facetName].push({
          name: el.charAt(0).toUpperCase() + el.slice(1),
          value: el.charAt(0).toUpperCase() + el.slice(1)
        });
        this[facetName] = this.onMount[facetName];
      });
      if (facetName === "sizes") {
        //stateMaintain for sizes
        this.sizes.sort((a, b) => {
          return a.value - b.value;
        }); //sorting of sizes
        if (typeof this.$route.query.sizes == "string") {
          let sizeIndex = this.sizes.findIndex(
            el => el.value === this.$route.query.sizes
          );
          this.$set(this.selected, sizeIndex, !this.selected[sizeIndex]);
        } else {
          let sizeIndex = [];
          for (let el in this.$route.query.sizes) {
            sizeIndex.push(
              this.sizes.findIndex(
                ele => ele.value === this.$route.query.sizes[el]
              )
            );
          }
          sizeIndex.forEach(el => {
            this.$set(this.selected, el, !this.selected[el]);
          });
        }
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 4; j++) {
            //to update size filter on each particular click accordingly
            this.$set(this.notSize, i * 4 + j, false);
          }
        }
      }
      // this.stateMaintainSelectedFilters();
    }
  }
};
