(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{563:function(e,t,n){var content=n(587);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(145).default)("5bdef33a",content,!0,{sourceMap:!1})},586:function(e,t,n){"use strict";n(563)},587:function(e,t,n){var o=n(144)(!1);o.push([e.i,".reset_container[data-v-275ac722]{min-height:40rem;display:flex;flex-direction:column}.reset_container--heading[data-v-275ac722]{margin-top:5rem;font-size:2rem;font-weight:700}.reset_container--heading[data-v-275ac722],.reset_container--text[data-v-275ac722]{font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:normal;text-align:center;color:#646464}.reset_container--text[data-v-275ac722]{margin:4.1rem 0 3.1rem;font-size:1.6rem;font-weight:400}.reset_container--input[data-v-275ac722]{outline:none;margin:.5rem auto;font-size:1.6rem;width:100%;height:4.5rem;padding-left:1.7rem;border:1px solid hsla(0,0%,54.9%,.3);background-color:hsla(0,0%,100%,.3);color:#b4b4b4}.reset_container--input[data-v-275ac722]::-moz-placeholder{color:#b4b4b4}.reset_container--input[data-v-275ac722]:-ms-input-placeholder{color:#b4b4b4}.reset_container--input[data-v-275ac722]::placeholder{color:#b4b4b4}.reset_container--input[data-v-275ac722]:active,.reset_container--input[data-v-275ac722]:focus{border:1px solid hsla(0,0%,54.9%,.7);background-color:hsla(0,0%,100%,.7)}.reset_container--resetButton[data-v-275ac722]{margin-top:.5rem;outline:none;width:100%;color:#f0f0f0;background-color:#c8c8c8;border:1px solid #c8c8c8;height:4rem;font-size:1.6rem}.reset_container--resetButton[data-v-275ac722]:active,.reset_container--resetButton[data-v-275ac722]:hover{background-color:#00f;border:1px solid #00f}.reset_container .inactive[data-v-275ac722]{background-color:#c8c8c8;border:1px solid #c8c8c8}.reset_container .active[data-v-275ac722],.reset_container .inactive[data-v-275ac722]{margin-top:2rem;outline:none;width:100%;color:#f0f0f0;height:4rem;font-size:1.6rem}.reset_container .active[data-v-275ac722]{background-color:#00f;border:1px solid #00f}.reset_container--goBack[data-v-275ac722]{display:block;background-color:transparent;border:none;margin:.7rem 0 .7rem auto;font-size:1.4rem;font-stretch:normal;font-style:normal;line-height:normal;font-weight:400;letter-spacing:normal;text-align:left;color:#646464;padding:0}.reset_container--goBack[data-v-275ac722]:active,.reset_container--goBack[data-v-275ac722]:hover{font-weight:600}",""]),e.exports=o},592:function(e,t,n){var content=n(622);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(145).default)("3f1feacd",content,!0,{sourceMap:!1})},596:function(e,t,n){"use strict";n.r(t);var o=n(110),r=n.n(o),c={data:function(){return{email:"",signUpAck:!1,description:"If there is an account associated with the provided email address, then you will receive an email with a link to reset your password.",heading:"Reset Password Email Sent!",src:"email@2x.png"}},comments:{signupack:n(555).default},props:{msg:{type:String,default:"Continue Shopping"},href:{type:String,default:"/login"}},computed:{validateEmail:function(){return!!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(this.email).toLowerCase())},isdisabled:function(){return!(!this.email||!this.validateEmail)}},methods:{resetPassword:function(){var e=this;if(""!==this.email&&this.validateEmail)r.a.post("/send-verification-link",{email:this.email,reset:!0}).then((function(t){if(200==t.status){e.signUpAck=!0;var n=t.data&&t.data.message?{message:t.data.message,error:!1}:{message:"Email sent successfully.",error:!1};e.$store.dispatch("notification_alert/updateNotification",n)}})).catch((function(t){var n=(t.response.data&&t.response.data.message&&t.response.data.error,{message:"Invalid email id.",error:!0});e.$store.dispatch("notification_alert/updateNotification",n)}));else{this.$store.dispatch("notification_alert/updateNotification",{message:"Invalid email id.",error:!0})}},buyerSignedUp:function(e){this.$emit("emailSent",e)}}},l=(n(586),n(143)),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.signUpAck?n("signupack",{staticClass:"ack",attrs:{heading:e.heading,description:e.description,msg:e.msg,href:e.href,src:e.src},on:{buyerSignedUp:e.buyerSignedUp,hideNav:e.hideNav}}):n("form",{staticClass:"reset_container",on:{submit:function(t){return t.preventDefault(),t.stopPropagation(),e.resetPassword.apply(null,arguments)}}},[n("h3",{staticClass:"reset_container--heading"},[e._v("Reset Password")]),e._v(" "),n("p",{staticClass:"reset_container--text"},[e._v("\n    Please enter the email address that is associated with your SoleSearch\n    account.\n  ")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"reset_container--input",attrs:{type:"email",name:"email",id:"email",placeholder:"Email Address"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),e._v(" "),n("button",{class:1==e.isdisabled?"active":"inactive",attrs:{type:"submit"}},[e._v("\n    Reset Password\n  ")]),e._v(" "),n("button",{staticClass:"reset_container--goBack",attrs:{type:"button"},on:{click:function(t){return e.$emit("reset",!1)}}},[e._v("\n    Go Back\n  ")])])}),[],!1,null,"275ac722",null);t.default=component.exports;installComponents(component,{Signupack:n(555).default})},621:function(e,t,n){"use strict";n(592)},622:function(e,t,n){var o=n(144)(!1);o.push([e.i,".loginSignup[data-v-63dc0c9b]{background-color:#fff;padding:9rem 5rem 3rem}@media screen and (max-width:425px){.loginSignup[data-v-63dc0c9b]{padding:2rem}}.loginSignup .loginSignupdiv[data-v-63dc0c9b]{display:flex;flex-direction:column;margin:0 auto}@media screen and (max-width:992px){.loginSignup .loginSignupdiv[data-v-63dc0c9b]{max-width:40rem}}.loginSignup .loginSignupdiv nav ul[data-v-63dc0c9b]{padding:0;list-style:none;text-align:center;display:flex;flex-direction:row}.loginSignup .loginSignupdiv nav ul li[data-v-63dc0c9b]{width:100%}.loginSignup .loginSignupdiv nav ul li button[data-v-63dc0c9b]{width:100%;font-weight:700;font-size:1.8rem;color:#b4b4b4;padding-bottom:.4rem;outline:none;background:#fff;border:none;border-bottom:1px solid #b4b4b4}.loginSignup .loginSignupdiv nav ul .active button[data-v-63dc0c9b],.loginSignup .loginSignupdiv nav ul li:active button[data-v-63dc0c9b],.loginSignup .loginSignupdiv nav ul li:hover button[data-v-63dc0c9b]{border-bottom:1px solid #000;font-weight:700;color:#000}",""]),e.exports=o},641:function(e,t,n){"use strict";n.r(t);var o=n(578),r=n(579),c=n(596),l={components:{login:o.default,Signup:r.default,Reset:c.default},data:function(){return{IsSignup:!1,IsLogin:!0,isForgotPasswordActive:!1,noNavHeader:!0}},props:{msg:{type:String},href:{type:String}},methods:{showLogin:function(){this.IsLogin=!0,this.IsSignup=!1},showSignup:function(){this.IsSignup=!0,this.IsLogin=!1},setForgotPassword:function(e){this.isForgotPasswordActive=e},loggedIn:function(e){this.$emit("loggedIn",e)},buyerSignedUp:function(e){this.$emit("buyerSignedUp",e)},hideNav:function(e){this.noNavHeader=!1},emailSent:function(e){this.isForgotPasswordActive=!e}}},d=(n(621),n(143)),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"loginSignup"},[n("div",{staticClass:"loginSignupdiv"},[!e.isForgotPasswordActive&&e.noNavHeader?n("nav",[n("ul",[n("li",{class:1==e.IsSignup?"active":"",on:{click:e.showSignup}},[n("button",[e._v("Sign Up")])]),e._v(" "),n("li",{class:1==e.IsLogin?"active":"",on:{click:e.showLogin}},[n("button",[e._v("Log In")])])])]):e._e(),e._v(" "),e.IsSignup?n("div",{staticClass:"signup"},[n("Signup",{attrs:{msg:e.msg,href:e.href},on:{buyerSignedUp:e.buyerSignedUp,hideNav:e.hideNav}})],1):e._e(),e._v(" "),e.IsLogin&&!e.isForgotPasswordActive?n("div",{staticClass:"login"},[n("login",{on:{reset:e.setForgotPassword,loggedIn:e.loggedIn}})],1):e._e(),e._v(" "),e.isForgotPasswordActive?n("div",{staticClass:"reset"},[n("Reset",{attrs:{msg:e.msg,href:e.href},on:{emailSent:e.emailSent,reset:e.setForgotPassword}})],1):e._e()])])])}),[],!1,null,"63dc0c9b",null);t.default=component.exports;installComponents(component,{Signup:n(579).default,Login:n(578).default})}}]);