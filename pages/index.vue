<template>
  <div class="homepage">
    <Header />
    <TheSideNav />
    <slider class="slider" />
    <section class="p-0">
      <ProductCarousel
        :productData="sneakersData"
        title="TRENDING SNEAKERS"
        id="info-modal-1"
        :description="sneakerDescription"
        productType="Sneakers"
        v-if="trendingData && trendingData.length !== 0"
      />
      <ProductCarousel
        id="info-modal-2"
        productType="Streetwear"
        :productData="streetwearData"
        :description="sneakerDescription"
        title="TRENDING STREETWEAR"
        v-if="trendingData && trendingData.length !== 0"
      />

      <!-- <ProductCarousel
        id="info-modal-3"
        productType="Collectibles"
        :productData="collectiblesData"
        :description="sneakerDescription"
        title="TRENDING COLLECTIBLES"
        v-if="collectiblesData && collectiblesData.length !== 0"
      /> -->
      <ProductCarousel
        id="info-modal-5"
        productType="Sneakers"
        :productData="soldData"
        :description="soldDescription"
        title="RECENTLY SOLD"
        v-if="soldData && soldData.length !== 0"
      />
      <TrendingBrands />
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import slider from "@/components/slider.vue";
import sneaker from "@/components/sneaker.vue";
import sneakerinfo from "@/components/sneakerinfo.vue";
import TheSideNav from "@/components/TheSidenav.vue";
import ComingSoon from "@/components/ComingSoon.vue";
import ProductCarousel from "@/components/ProductCarousel.vue";
import TrendingBrands from "@/components/TrendingBrands.vue";
export default {
  head() {
    return {
      title: "SoleSearch: Buy, Sell & Bid on Authentic Sneakers & Streetwear",
      meta: [
        {
          hid: "home-page-description",
          name: "description",
          content:
            "Find the best sneakers & streetwear from Nike, Adidas, Reebok, Yeezy, Air Jordans, Supreme &more at the best price. Authenticated & delivered to your door."
        }
      ]
    };
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      loading: false,
      comingsoon: false,
      sneakersData: [],
      streetwearData: [],
      collectiblesData: [],
      trendingData: {
        sneakers: [
          [
            "air-jordan-1-retro-high-og-'dark-marina-blue'-555088404",
            "Air Jordan 1 Retro High OG 'Dark Marina Blue'",
            12413,
            544
          ],
          ["dunk-low-'panda'-dd1391100", "Dunk Low 'Panda'", 22000, 482],
          [
            "air-jordan-4-retro-'red-thunder'-ct8527016",
            "Air Jordan 4 Retro 'Red Thunder'",
            20700,
            478
          ],
          [
            "air-jordan-1-retro-high-og-'bordeaux'-555088611",
            "Air Jordan 1 Retro High OG 'Bordeaux'",
            15999,
            435
          ],
          ["yeezy-slides-'ochre'-gw1931", "Yeezy Slides 'Ochre'", 8999, 377],
          [
            "yeezy-slide-'pure'-2021'-gw1934",
            "Yeezy Slide 'Pure' 2021'",
            10500,
            375
          ],
          [
            "air-jordan-1-retro-high-og-patent-'bred'-555088063",
            "Air Jordan 1 Retro High OG Patent 'Bred'",
            28000,
            361
          ],
          [
            "air-jordan-1-low-'unc'-553558144",
            "Air Jordan 1 Low 'UNC'",
            19000,
            253
          ],
          [
            "yeezy-boost-350-v2-'beluga-reflective'-gw1229",
            "Yeezy Boost 350 V2 'Beluga Reflective'",
            31999,
            234
          ],
          [
            "air-jordan-1-low-'bred-toe'-553558612",
            "Air Jordan 1 Low 'Bred Toe'",
            17500,
            229
          ],
          [
            "air-jordan-1-high-og-'crafted'-dh3097001",
            "Air Jordan 1 High OG 'Crafted'",
            20000,
            210
          ],
          [
            "air-jordan-1-low-'barcelona'-dc6991400",
            "Air Jordan 1 Low 'Barcelona'",
            10000,
            204
          ],
          [
            "yeezy-foam-runner-'ochre'-gw3354",
            "Yeezy Foam Runner 'Ochre'",
            9000,
            174
          ],
          [
            "air-jordan-1-low-'particle-grey'-553558040",
            "Air Jordan 1 Low 'Particle Grey'",
            18000,
            167
          ],
          [
            "air-jordan-1-low-og-'starfish'-cz0790801",
            "Air Jordan 1 Low OG 'Starfish'",
            21000,
            162
          ],
          [
            "air-jordan-1-mid-'shadow'-554724096",
            "Air Jordan 1 Mid 'Shadow'",
            14999,
            155
          ],
          [
            "air-jordan-1-retro-high-og-'dark-mocha'-555088105",
            "Air Jordan 1 Retro High OG 'Dark Mocha'",
            50000,
            154
          ],
          [
            "air-jordan-1-low-'noble-green'-553558371",
            "Air Jordan 1 Low 'Noble Green'",
            20000,
            151
          ],
          [
            "dunk-low-premium-'halloween'-dd3357100",
            "Dunk Low Premium 'Halloween'",
            17999,
            142
          ],
          [
            "air-jordan-1-high-retro-og-'pollen'-555088701",
            "Air Jordan 1 High Retro OG 'Pollen'",
            16500,
            139
          ],
          [
            "air-jordan-1-retro-high-og-'prototype'-dc6515100",
            "Air Jordan 1 Retro High OG 'Prototype'",
            23499,
            139
          ],
          ["yeezy-slides-'onyx'-hq6448", "Yeezy Slides 'Onyx'", 9500, 127],
          [
            "air-jordan-1-retro-high-og-'shadow-2.0'-555088035",
            "Air Jordan 1 Retro High OG 'Shadow 2.0'",
            26500,
            126
          ],
          [
            "dunk-low-'midas-gold'-dd1391701",
            "Dunk Low 'Midas Gold'",
            11000,
            123
          ],
          [
            "air-jordan-1-retro-high-og-'electro-orange'-555088180",
            "Air Jordan 1 Retro High OG 'Electro Orange'",
            22999,
            119
          ],
          [
            "air-jordan-1-retro-high-‘tokyo-bio-hack’-555088201",
            "Air Jordan 1 Retro High ‘Tokyo Bio Hack’",
            27000,
            116
          ],
          [
            "dunk-low-'court-purple'-dd1391104",
            "Dunk Low 'Court Purple'",
            16350,
            114
          ],
          [
            "air-jordan-1-low-'dark-teal'-553558411",
            "Air Jordan 1 Low 'Dark Teal'",
            18000,
            114
          ],
          [
            "yeezy-boost-350-v2-'mx-rock'-gw3774",
            "Yeezy Boost 350 V2 'MX Rock'",
            27500,
            105
          ],
          [
            "wmns-air-jordan-1-low-'black-university-blue'-dc0774041",
            "Wmns Air Jordan 1 Low 'Black University Blue'",
            18000,
            104
          ]
        ],
        streetwear: [
          [
            "anti-social-social-club-kkoch-tee-kkoch",
            "Anti Social Social Club Kkoch Tee",
            6522,
            81
          ],
          [
            "fear-of-god-essentials-t-shirt---pistachio-ss21",
            "Fear of God Essentials T-shirt - Pistachio",
            7500,
            42
          ],
          [
            "travis-scott-x-mcdonald's-crew-t-shirt-mcdcrew",
            "Travis Scott x McDonald's Crew T-shirt",
            4200,
            36
          ],
          [
            "fear-of-god-essentials-t-shirt---harvest-ss21",
            "Fear of God Essentials T-shirt - Harvest",
            6500,
            31
          ],
          [
            "drew-house-mascot-ss-tee-'cream'-mascotlogo",
            "Drew house mascot ss tee 'Cream'",
            8999,
            26
          ],
          [
            "drew-house-mascot-ss-tee-'ink'-mascotss",
            "Drew house mascot ss tee 'Ink'",
            9000,
            26
          ],
          [
            "fear-of-god-essentials-t-shirt-'cream|buttercream'-ss21",
            "Fear of God Essentials T-shirt 'Cream|Buttercream'",
            9000,
            24
          ],
          [
            "fear-of-god-essentials-core-collection-t-shirt-'stretch-limo'-fw21",
            "Fear of God Essentials Core Collection T-shirt 'Stretch Limo'",
            7500,
            22
          ],
          [
            "fear-of-god-essentials-pull-over-hoodie---cream-|-buttercream-ss21",
            "Fear of God Essentials Pull-Over Hoodie - Cream | Buttercream",
            13000,
            19
          ],
          [
            "travis-scott-cactus-jack-for-fragment-sunrise-tee-",
            "Travis Scott Cactus Jack For Fragment Sunrise Tee",
            6500,
            19
          ],
          [
            "travis-scott-cactus-jack-for-fragment-manifest-t-shirt-'cream'-",
            "Travis Scott Cactus Jack For Fragment Manifest T-shirt 'Cream'",
            8000,
            18
          ],
          [
            "drew-house-mascot-t-shirt-'black'-fw21",
            "Drew house mascot t-shirt 'Black'",
            10499,
            17
          ],
          [
            "fear-of-god-essentials-boxy-t-shirt-applique-logo-ss20",
            "Fear of God Essentials Boxy T-Shirt Applique Logo",
            10000,
            16
          ],
          [
            "anti-social-social-club-99-retro-iv-hoodie-'black'-ss21",
            "Anti Social Social Club 99 Retro IV Hoodie 'Black'",
            9783,
            14
          ],
          [
            "drew-house-mascot-ss-tee-'lavender'-mascotss",
            "Drew house mascot ss tee 'Lavender'",
            11000,
            13
          ],
          [
            "essentials-ssense-exclusive-beige-pullover-hoodie-212161m202029",
            "ESSENTIALS SSENSE Exclusive Beige Pullover Hoodie",
            16500,
            13
          ],
          [
            "fear-of-god-essentials-t-shirt---amber-ss21",
            "Fear of God Essentials T-shirt - Amber",
            6999,
            12
          ],
          [
            "travis-scott-cactus-jack-for-fragment-hiroshi-tee-",
            "Travis Scott Cactus Jack For Fragment Hiroshi Tee",
            7000,
            12
          ],
          [
            "travis-scott-cactus-jack-+-kaws-for-fragment-tee-'aged-yellow'-",
            "Travis Scott Cactus Jack + Kaws For Fragment Tee 'Aged Yellow'",
            7000,
            11
          ],
          [
            "drew-house-deconstructed-mascot-hoodie-'light-yellow'-deconstructedmascot",
            "Drew house deconstructed mascot hoodie 'Light Yellow'",
            17935,
            10
          ],
          [
            "off-white-slim-fit-degrade-arrows-t-shirt-'white'-fw21",
            "OFF-WHITE Slim Fit Degrade Arrows T-Shirt 'White'",
            14999,
            9
          ],
          [
            "drew-house-mascot-hoodie-'lavender'-mascot",
            "Drew house mascot hoodie 'Lavender'",
            21000,
            8
          ],
          [
            "fear-of-god-essentials-knit-pullover-hoodie---harvest-ss21",
            "Fear of God Essentials Knit Pullover Hoodie - Harvest",
            24000,
            8
          ],
          [
            "fear-of-god-essentials-'seafoam-t-shirt'-ss22",
            "Fear of God Essentials 'Seafoam T-Shirt'",
            6999,
            8
          ],
          [
            "fear-of-god-essentials-pullover-hoodie---harvest-ss21",
            "Fear of God Essentials Pullover Hoodie - Harvest",
            16000,
            7
          ],
          [
            "drew-house-mascot-hoodie-'sky-blue'-",
            "Drew house mascot hoodie 'Sky Blue'",
            21799,
            7
          ],
          [
            "fear-of-god-essentials-3m-logo-boxy-t-shirt-'black'-ss19",
            "Fear Of God Essentials 3M Logo Boxy T-Shirt 'Black'",
            11999,
            6
          ],
          [
            "travis-scott-cactus-jack-for-fragment-icons-tee-'brown'-",
            "Travis Scott Cactus Jack For Fragment Icons Tee 'Brown'",
            12000,
            6
          ],
          [
            "drew-house-mascot-hoodie-'black'-fw21",
            "Drew house mascot hoodie 'Black'",
            20000,
            5
          ],
          [
            "off-white-'cut-here-arrow-skate-crewneck-sweatshirt'-",
            "Off-White 'Cut Here Arrow Skate Crewneck Sweatshirt'",
            18999,
            5
          ]
        ]
      },
      soldData: [],
      sneakerDescription:
        "These are a curated collection of our best selling items.",
      soldDescription:
        "These are a curated collection of our best recently sold items."
    };
  },
  components: {
    Header,
    Footer,
    slider,
    sneaker,
    sneakerinfo,
    TheSideNav,
    ComingSoon,
    ProductCarousel,
    TrendingBrands
  },
  async asyncData(context) {
    try {
      const { data: collectiblesData } = await context.$getTrendingProducts(
        "Collectibles"
      );
      console.log('call');
      const response = await context.$getTrendingBidProducts();
      const { data: soldData } = await context.$getRecentlySoldProducts();
      return {
        soldData: soldData.products,
        sneakersData: response?.data && response?.data.sneakers,
        streetwearData: response?.data && response?.data.streetwear,
        collectiblesData: context.$removeProductDuplicates(
          collectiblesData.products
        )
      };
    } catch (err) {
      console.log(err);
    }
  },
  middleware: ["check-auth"]
};
</script>

<style lang="scss" scoped>
// .page-enter-active,
// .page-leave-active {
//   transition-property: opacity;
//   transition-timing-function: ease-in-out;
//   transition-duration: 500ms;
// }

// .page-enter,
// .page-leave-to {
//   opacity: 0;
// }

// .page-leave-active,
// .page-enter-active {
//   transition: 1s;
// }
// .page-enter {
//   transform: translate(100%, 0);
// }
// .page-leave-to {
//   transform: translate(-100%, 0);
// }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  @media screen and (max-width: 640px) {
    padding: 4px;
  }
}

.email {
  margin-top: 28px;
  font-size: 16px;
  width: 100%;
  justify-content: center;
  display: flex;
  color: white;
  @media screen and (max-width: 640px) {
    font-size: 12px;
    margin-top: 16px;
  }
  form {
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 300px;
  }
  input {
    border-radius: 8px;
    width: 296px;
    padding: 12px;
    height: 46px;
    // @media screen and (max-width: 640px) {
    //   width: 256px;
    // }
  }
  button {
    border-radius: 8px;
    background: #ee2257;
    color: white;
    height: 46px;
    appearance: none;
    border-style: solid;
    border: 1px solid #ee2257;
    width: 120px;
    letter-spacing: normal;
    font-weight: 600;
    align-self: center;
  }
}

.icons {
  img {
    width: 40px;
    height: 40px;
    @media screen and (max-width: 750px) {
      width: 30px;
      height: 30px;
    }
  }
}

.coming-soon {
  font-size: 70px;
  text-align: center;
  margin-top: 44px;
  width: 100%;
  color: white;
  text-transform: uppercase;
  font-weight: 100;
  letter-spacing: 20.4px;
  @media screen and (max-width: 750px) {
    margin-top: 8px;
    font-size: 56px;
    letter-spacing: 16.4px;
  }
}

.homepage {
  position: relative;
  .p-0 {
    display: flex;
    flex-direction: column;
    background-color: $base-grey;
    padding: 5% 5% 100px 5% !important;
    @media screen and (min-width: 640px) {
      gap: 64px;
    }
  }
}
@media screen and (max-width: 575px) {
  .mb-small-3 {
    margin-bottom: 3rem !important;
  }
  .mt-small-1 {
    margin-top: 1rem !important;
  }
}
</style>
