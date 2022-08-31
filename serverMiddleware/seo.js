export default function(req, res, next) {
  const redirects = [
    {
      from: "/products/sneakers",
      to: "/products?product_type=Sneakers"
    },
    {
      from: "/products/streetwear",
      to: "/products?product_type=Streetwear"
    },
    {
      from: "/products/sneaker-care",
      to: "/products?product_type=Sneaker Care"
    },
    {
      from: "/products/homegrown",
      to: "/products?product_type=Homegrown"
    },
    {
      from: "/products/accessories",
      to: "/products?product_type=Accessories"
    }
  ];

  const redirect = redirects.find(r => r.from === req.url);
  if (redirect) {
    res.writeHead(301, { Location: redirect.to });
    res.end();
  } else {
    next();
  }
}
