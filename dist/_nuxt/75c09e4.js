(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{607:function(e,t,r){var content=r(649);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(145).default)("4eee187d",content,!0,{sourceMap:!1})},648:function(e,t,r){"use strict";r(607)},649:function(e,t,r){var n=r(144)(!1);n.push([e.i,".sneaker[data-v-2c8a9e0a],.wrapper[data-v-2c8a9e0a]{display:flex;flex-direction:column}.sneaker[data-v-2c8a9e0a]{justify-content:space-evenly;align-items:center;max-width:37.7rem;background-color:#fff;cursor:pointer}.sneaker__img[data-v-2c8a9e0a]{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.sneaker__img img[data-v-2c8a9e0a]{height:25rem}@media screen and (max-width:1015px){.sneaker__img img[data-v-2c8a9e0a]{height:18rem}}@media screen and (max-width:320px){.sneaker__img img[data-v-2c8a9e0a]{height:15rem}}.sneaker__name[data-v-2c8a9e0a]{min-height:5rem}.sneaker__name a[data-v-2c8a9e0a],.sneaker__name h6[data-v-2c8a9e0a]{text-decoration:none;color:#0f0f0f;font-size:1.6rem;margin:0}.sneaker__name .price[data-v-2c8a9e0a]{color:#323232;margin-top:2rem}@media screen and (max-width:375px){.sneaker a[data-v-2c8a9e0a],.sneaker h6[data-v-2c8a9e0a]{font-size:1.4rem}}.sneaker .select--button[data-v-2c8a9e0a]{width:100%;font-size:1.85rem;padding:1rem 0;text-align:center}@media screen and (min-width:900px){.newGridWidth[data-v-2c8a9e0a]{grid-template-columns:repeat(3,1fr)!important;width:75%;grid-row-gap:4rem;row-gap:4rem}}.sneaker[data-v-2c8a9e0a]:active,.sneaker[data-v-2c8a9e0a]:hover{background-color:#fff;text-decoration:none}.sneaker:active .select--button[data-v-2c8a9e0a],.sneaker:hover .select--button[data-v-2c8a9e0a]{border:1px solid #323232!important;background-color:#fff!important;color:#323232!important}",""]),e.exports=n},714:function(e,t,r){"use strict";r.r(t);r(320),r(53),r(89),r(34),r(52);var n={name:"sneakers",data:function(){return{selectedShoe:""}},props:{showTag:{type:Boolean,required:!1},tagline:{type:String},sneakersData:{type:Array,required:!0},page:{type:Number,required:!1},numberOfPages:{type:Number,required:!1}},methods:{selectSneaker:function(e){this.selectedShoe=e,this.$emit("selectedShoe",e)}},filters:{priceFormat:function(e){var t=(e=e.toString()).substring(e.length-3),r=e.substring(0,e.length-3);return""!=r&&(t=","+t),r.replace(/\B(?=(\d{2})+(?!\d))/g,",")+t}}},c=(r(648),r(143)),component=Object(c.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"sneakers grid newGridWidth"},e._l(e.sneakersData,(function(t,n){return r("div",{key:n,staticClass:"sneaker",on:{click:function(r){return e.selectSneaker(t._source.slug)}}},[r("div",{staticClass:"sneaker__img"},[r("img",{attrs:{src:e.$config.cloudinaryBaseURL+"/q_auto,f_auto/dryp-shoe-pictures/"+t._source.slug+"/"+t._source.main_picture_url,alt:t._source.name}})]),e._v(" "),r("div",{staticClass:"sneaker__name d-flex flex-column justify-content-between text-center w-75"},[r("h6",{staticClass:"name"},[e._v(e._s(t._source.name))])]),e._v(" "),r("button",{staticClass:"black-button "},[e._v("Select")])])})),0)}),[],!1,null,"2c8a9e0a",null);t.default=component.exports}}]);