import axios from "axios";
import https from "https";

export default function(context) {
  // (axios.defaults.responseType = "application/json"),
  axios.defaults.baseURL = context.$config.drypApiURL;
  axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
}
