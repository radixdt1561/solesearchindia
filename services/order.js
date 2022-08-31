export default axios => {
  const apis = {
    createOrder: async (params, authToken) => {
      return await axios.post(
        "/graphql",
        {
          query: `mutation createOrder($name:String!,$cityVillage:String!,$size:String!,$slug:String!,$price:Int!,$email:String!,$firstName:String!,$lastName:String!,$phoneNumber:String!,$buildingName:String!,$houseFlatNumber:String!,$streetName:String!,$landmark:String,$state:String!,$zip:String!,$country:String!,$isBid:Boolean!) {
      createOrder(name:$name,cityVillage:$cityVillage,size:$size,slug:$slug,price:$price,email:$email,firstName:$firstName,lastName:$lastName,phoneNumber:$phoneNumber,buildingName:$buildingName,houseFlatNumber:$houseFlatNumber,streetName:$streetName,landmark:$landmark,state:$state,zip:$zip,country:$country,isBid:$isBid) { 
        orderId
        error
      }
    }`,
          variables: {
            name: params.name,
            size: params.size,
            slug: params.slug,
            discount: params.discount,
            price: params.price,
            email: params.email,
            firstName: params.first_name,
            lastName: params.last_name,
            phoneNumber: params.phone_number,
            buildingName: params.building_name,
            houseFlatNumber: params.house_flat_number,
            streetName: params.street_name,
            landmark: params.landmark,
            state: params.state,
            cityVillage: params.city_village,
            country: params.country,
            zip: params.zip,
            isBid: params.isBid
          }
        },
        {
          headers: {
            Authorization: "Bearer " + authToken
          }
        }
      );
    },
    getBuyerBids: async authToken => {
      return await axios.post(
        "/graphql",
        {
          query: `query{
  bidsByBuyer{
    id
    slug
    size
    expiry
    price
    accepted
    active
    orderId
    paymentDeadline
    seller
    name
    completed
  }
}`
        },
        {
          headers: {
            Authorization: "Bearer " + authToken
          }
        }
      );
    },
    getSellerBids: async authToken => {
      return await axios.post(
        "/graphql",
        {
          query: `query{
  bidsForSeller{
    id
    slug
    size
    expiry
    price
    accepted
    active
    orderId
    name
  }
}`
        },
        {
          headers: {
            Authorization: "Bearer " + authToken
          }
        }
      );
    },
    getSellerAcceptedBids: async authToken => {
      return await axios.post(
        "/graphql",
        {
          query: `query{
  acceptedBidsForSeller{
    id
    slug
    name
    size
    expiry
    price
    accepted
    active
    orderId
    paymentDeadline
  }
}`
        },
        {
          headers: {
            Authorization: "Bearer " + authToken
          }
        }
      );
    },
    getBidsByProduct: async slug => {
      return await axios.post("/graphql", {
        query: `query($slug:String!){
  bidsByProduct(slug:$slug){
    slug
    name
    size
    price
  }
}`,
        variables: {
          slug: slug
        }
      });
    },
    rejectBid: async (id, authToken) => {
      return await axios.post(
        "/graphql",
        {
          query: `mutation rejectBid($id:String!) {
      rejectBid(id:$id) { 
        error
      }
    }`,
          variables: {
            id: id
          }
        },
        {
          headers: {
            Authorization: "Bearer " + authToken
          }
        }
      );
    },
    acceptBid: async (id, authToken) => {
      return await axios.post(
        "/graphql",
        {
          query: `mutation acceptBid($id:String!) {
      acceptBid(id:$id) { 
        error
      }
    }`,
          variables: {
            id: id
          }
        },
        {
          headers: {
            Authorization: "Bearer " + authToken
          }
        }
      );
    },
    payBid: async (params, token) => {
      return await axios.post(
        "/graphql",
        {
          query: `mutation payBid($razorpayOrderId:String!,$razorpayPaymentId:String!,$razorpaySignature:String!,$seller:String!) {
      payBid(razorpayOrderId:$razorpayOrderId,razorpayPaymentId:$razorpayPaymentId,razorpaySignature:$razorpaySignature,seller:$seller) { 
        error
      }
    }`,
          variables: {
            razorpayOrderId: params.razorpayOrderId,
            razorpayPaymentId: params.razorpayPaymentId,
            razorpaySignature: params.razorpaySignature,
            seller: params.seller
          }
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
    },
    createBidPayOrder: async (id, authToken) => {
      return await axios.post(
        "/graphql",
        {
          query: `mutation createBidPayOrder($id:String!) {
      createBidPayOrder(id:$id) { 
        error
        orderId
      }
    }`,
          variables: {
            id: id
          }
        },
        {
          headers: {
            Authorization: "Bearer " + authToken
          }
        }
      );
    }
  };

  return apis;
};
