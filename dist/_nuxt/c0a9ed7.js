(window.webpackJsonp=window.webpackJsonp||[]).push([[20,16],{583:function(t,e,n){var content=n(600);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(145).default)("6cc5d0fb",content,!0,{sourceMap:!1})},585:function(t,e,n){"use strict";n.r(e);var r=n(152),o=n(0),c={props:{id:{type:String,default:"info"},title:{type:String,default:"Title"},description:{type:String,default:"description"}},components:{"b-modal":r.a,"b-question":o.fs}},d=(n(599),n(143)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("button",{staticStyle:{background:"none",border:"none"},attrs:{id:"info-btn"},on:{click:function(e){return t.$bvModal.show(t.id)}}},[n("b-question")],1),t._v(" "),n("b-modal",{attrs:{id:t.id,"hide-footer":"","hide-header":"",centered:"",size:"sm"}},[n("div",{staticClass:"text-center mt-5"},[n("h3",[t._v(t._s(t.title))]),t._v(" "),n("p",[t._v(t._s(t.description))])]),t._v(" "),n("button",{staticClass:"mt-3 black-button",staticStyle:{"max-width":"100%"},attrs:{block:""},on:{click:function(e){return t.$bvModal.hide(t.id)}}},[t._v("\n      GOT IT\n    ")])])],1)}),[],!1,null,"5eba35c8",null);e.default=component.exports},599:function(t,e,n){"use strict";n(583)},600:function(t,e,n){var r=n(144)(!1);r.push([t.i,"#info-btn svg[data-v-5eba35c8]{font-size:16px}h3[data-v-5eba35c8]{color:#1c1c20;font-weight:600;font-size:18px}p[data-v-5eba35c8]{font-size:14px}",""]),t.exports=r},636:function(t,e,n){var content=n(672);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(145).default)("029bf1de",content,!0,{sourceMap:!1})},671:function(t,e,n){"use strict";n(636)},672:function(t,e,n){var r=n(144)(!1);r.push([t.i,".swiper-button-next[data-v-9f2b8c1e]:after,.swiper-button-prev[data-v-9f2b8c1e]:after{height:100px}button[data-v-9f2b8c1e]{background:none;border:none}.toggle[data-v-9f2b8c1e]{display:none}@media screen and (min-width:640px){.toggle[data-v-9f2b8c1e]{display:block}}.swiper-container-horizontal>.swiper-pagination-bullets[data-v-9f2b8c1e]{bottom:0}.swiper[data-v-9f2b8c1e]{height:400px;width:100%}@media screen and (max-width:640px){.swiper[data-v-9f2b8c1e]{height:350px}}.container[data-v-9f2b8c1e]{display:flex;flex-direction:column}.container img[data-v-9f2b8c1e]{text-align:center}@media screen and (min-width:994px){.container[data-v-9f2b8c1e]{margin-left:20px}}@media screen and (max-width:993px){.container[data-v-9f2b8c1e]{align-items:center;text-align:center}}.product-name[data-v-9f2b8c1e]{font-size:16px;height:60px;width:100%;overflow:hidden;margin-top:4px;font-weight:500}@media screen and (max-width:450px){.product-name[data-v-9f2b8c1e]{font-size:12px;height:40px}}.lowest-ask[data-v-9f2b8c1e]{margin-top:4px;color:#8f8f96;font-size:14px}@media screen and (max-width:450px){.lowest-ask[data-v-9f2b8c1e]{font-size:12px}}.product-price[data-v-9f2b8c1e]{font-size:18px;font-weight:600}@media screen and (max-width:450px){.product-price[data-v-9f2b8c1e]{font-size:14px}}",""]),t.exports=r},679:function(t,e,n){"use strict";n.r(e);var r=n(585),o=n(151),c=n(0),d={props:{productType:{type:String,default:"Sneakers"},title:{type:String,default:"Title"},id:{type:String,default:"info"},description:{type:String,default:"description"},productData:{type:Array,default:[]}},components:{InfoModal:r.default,"b-img-lazy":o.a,BIconArrowRight:c.Y},computed:{swiperOptions:function(){return{pagination:{el:"#pagination"+this.id,clickable:!0},navigation:{nextEl:"#"+this.next,prevEl:"#"+this.prev},breakpoints:{1800:{slidesPerView:5,slidesPerGroup:5,spaceBetween:0},1024:{slidesPerView:4,slidesPerGroup:4,spaceBetween:0},768:{slidesPerView:3,slidesPerGroup:3,spaceBetween:0},640:{slidesPerView:2,slidesPerGroup:2,spaceBetween:0},300:{slidesPerView:1,slidesPerGroup:1,spaceBetween:0,pagination:!1}}}},next:function(){return"next-"+this.id},prev:function(){return"prev-"+this.id}},methods:{onClick:function(t){this.$router.push({path:"products/".concat(t)})}}},l=(n(671),n(143)),component=Object(l.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"d-flex align-items-center justify-content-between"},[n("div",{staticClass:"\n    d-flex align-items-center"},[n("div",{staticClass:"product-carousel-title"},[t._v(t._s(t.title))]),t._v(" "),n("InfoModal",{attrs:{title:t.title,description:t.description,id:t.id}})],1),t._v(" "),n("nuxt-link",{staticClass:"d-flex align-items-center",staticStyle:{"font-size":"16px",color:"#006340",gap:"4px"},attrs:{to:{path:"/products",query:{product_type:t.productType}}}},[n("div",[t._v("See All")]),t._v(" "),n("BIconArrowRight")],1)],1),t._v(" "),n("div",{staticStyle:{"margin-top":"32px"}},[n("div",{directives:[{name:"swiper",rawName:"v-swiper",value:t.swiperOptions,expression:"swiperOptions"}],staticClass:"swiper",attrs:{loadtheme:!1}},[n("div",{staticClass:"swiper-wrapper"},t._l(t.productData,(function(e,i){return n("div",{key:i,staticClass:"swiper-slide"},["Sneakers"!=t.productType&&"Streetwear"!=t.productType?n("div",{staticClass:"container"},[n("div",{staticClass:"cursor",on:{click:function(n){return t.onClick(e._source.slug)}}},[n("b-img-lazy",{attrs:{width:"200px",height:"200px",src:t.$config.cloudinaryBaseURL+"/q_auto,f_auto/dryp-shoe-pictures/"+e._source.slug+"/"+e._source.main_picture_url,alt:e._source.name}})],1),t._v(" "),n("div",{staticClass:"product-name"},[t._v(t._s(e._source.name))]),t._v(" "),n("div",{staticClass:"lowest-ask"},[t._v("\n              Lowest Ask\n            ")]),t._v(" "),n("p",{staticClass:"product-price"},[t._v("\n              ₹"+t._s(e._source.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))+"\n            ")])]):n("div",{staticClass:"container"},[n("div",{staticClass:"cursor",on:{click:function(n){return t.onClick(e[0])}}},[n("b-img-lazy",{attrs:{width:"200px",height:"200px",src:t.$config.cloudinaryBaseURL+"/q_auto,f_auto/dryp-shoe-pictures/"+e[0]+"/display_picture.png",alt:e[1]}})],1),t._v(" "),n("div",{staticClass:"product-name"},[t._v(t._s(e[1]))]),t._v(" "),n("div",{staticClass:"lowest-ask"},[t._v("\n              Lowest Ask\n            ")]),t._v(" "),n("p",{staticClass:"product-price"},[t._v("\n              ₹"+t._s(e[2].toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))+"\n            ")])])])})),0),t._v(" "),n("div",{staticClass:"swiper-pagination swiper-pagination-bullets toggle",attrs:{id:"pagination"+t.id}}),t._v(" "),n("button",{staticClass:"swiper-button-prev",attrs:{slot:"button-prev",id:t.prev},slot:"button-prev"}),t._v(" "),n("button",{staticClass:"swiper-button-next",attrs:{slot:"button-next",id:t.next},slot:"button-next"})])])])}),[],!1,null,"9f2b8c1e",null);e.default=component.exports;installComponents(component,{InfoModal:n(585).default})}}]);