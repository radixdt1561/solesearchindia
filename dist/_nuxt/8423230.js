(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{696:function(e,t,n){var content=n(772);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(145).default)("197e9b44",content,!0,{sourceMap:!1})},771:function(e,t,n){"use strict";n(696)},772:function(e,t,n){var r=n(144)(!1);r.push([e.i,".sell[data-v-3727e2c0]{background-color:#f9f9f9}@media screen and (max-width:1400px)and (min-width:992px){.sell__components[data-v-3727e2c0]{padding:0 5%}}.sell__userinfo[data-v-3727e2c0]{display:flex;justify-content:space-between;font-size:2rem;font-weight:700;text-align:left;color:#0f0f0f;padding:2rem 0;margin:0}@media screen and (max-width:700px){.sell__userinfo[data-v-3727e2c0]{justify-content:center}.sell__userinfo .logout[data-v-3727e2c0]{display:none}}@media screen and (max-width:992px){.sell__userinfo[data-v-3727e2c0]{padding:2rem 1rem}}.sell__userinfo--text[data-v-3727e2c0]{margin-bottom:0}@media screen and (max-width:575px){.sell__userinfo--text[data-v-3727e2c0]{font-size:1.8rem}}.sell__components[data-v-3727e2c0]{max-width:136.6rem;margin:0 auto}.sell__container[data-v-3727e2c0]{box-shadow:0 1px 2px 0 rgba(0,0,0,.35);background-color:#fff;padding-top:5.5rem;padding-bottom:12rem;min-height:calc(100vh - 270px)}@media screen and (max-width:575px){.sell__container[data-v-3727e2c0]{min-height:calc(100vh - 445px)}}.logout[data-v-3727e2c0]{text-decoration:underline;-webkit-text-decoration-color:rgba(0,0,0,.35);text-decoration-color:rgba(0,0,0,.35);cursor:pointer}",""]),e.exports=r},827:function(e,t,n){"use strict";n.r(t);var r=n(36),o=(n(34),n(52),n(124),n(110)),c=n.n(o),l={middleware:["check-auth","auth"],components:{SellerHeader:n(713).default},computed:{user:function(){return this.$store.getters["authentication/getnewUser"]},users:function(){return this.$store.getters["authentication/getUser"]},notificationData:function(){return this.$store.getters["notification_alert/getNotificationAlert"]}},asyncData:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("/user-update",{headers:{Authorization:"Bearer "+e.store.getters["authentication/idToken"]}});case 2:n=t.sent,e.store.commit("authentication/updateUser",{user:n.data.user});case 4:case"end":return t.stop()}}),t)})))()},methods:{logout:function(){var e=this;this.$store.dispatch("authentication/updateLogout").then((function(){return e.$router.replace("/")})),webengage.user.logout()}}},d=(n(771),n(143)),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"sell"},[n("SellerHeader"),e._v(" "),n("section",{staticClass:"sell__components"},[n("div",{staticClass:"sell__userinfo"},[n("p",{staticClass:"sell__userinfo--text"},[e._v("\n        Hello\n        "+e._s(e.user&&e.user.first_name.charAt(0).toUpperCase()+e.user.first_name.slice(1).toLowerCase())+"\n      ")]),e._v(" "),n("p",{staticClass:"sell__userinfo--text logout",on:{click:e.logout}},[e._v("Log Out")])]),e._v(" "),n("div",{staticClass:"sell__container"},[n("NuxtChild")],1)])],1)}),[],!1,null,"3727e2c0",null);t.default=component.exports;installComponents(component,{SellerHeader:n(713).default})}}]);