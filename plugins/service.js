import axios from "axios";
import orderService from "~/services/order";
import productService from "~/services/product";
import utils from "~/services/utils";
import userService from "~/services/user";

export default (_, inject) => {
  const allMethods = {
    ...orderService(axios),
    ...productService(axios),
    ...utils(),
    ...userService(axios)
    // import another service here
  };
  const methods = Object.keys(allMethods);
  methods.forEach(method => {
    inject(method, allMethods[method]);
  });
};
