export const generateAlgoliaQuery = (query, newVal, filterArray) => {
  if (query && newVal && filterArray) {
    let stringval;
    if (query === "sizes") {
      stringval = "size";
    }
    if (query === "colors") {
      stringval = "color";
    }
    if (query === "brands") {
      stringval = "brand_name";
    }
    if (query === "genders") {
      stringval = "gender";
    }
    if (Array.isArray(newVal[query])) {
      newVal[query].forEach(el => {
        if (filterArray.indexOf(`"${stringval}:${el}"`) === -1) {
          filterArray.push(`"${stringval}:${el}"`);
        }
      });
    } else {
      filterArray.push(`"${stringval}:${newVal[query]}"`);
    }
  }
}
