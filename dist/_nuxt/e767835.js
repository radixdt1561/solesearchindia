(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{712:function(e,t,o){"use strict";o.r(t);var n={name:"b-dropdown-hover",props:{title:{type:String,default:"Title"}},methods:{onOver:function(){this.$refs.dropdown&&(this.$refs.dropdown.visible=!0)},onLeave:function(){this.$refs.dropdown&&(this.$refs.dropdown.visible=!1)},onClick:function(){"More"!==this.title&&(this.$router.push({name:"products",query:{product_type:this.title}}),this.$refs.dropdown.visible=!1)}}},r=o(143),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{on:{mouseover:e.onOver,mouseleave:e.onLeave}},[o("b-nav-item-dropdown",{ref:"dropdown",attrs:{"toggle-class":"text-decoration-none",text:e.title,size:"lg","no-caret":"",variant:"link"},on:{toggle:function(t){return t.preventDefault(),e.onClick.apply(null,arguments)}}},[e._t("default")],2)],1)}),[],!1,null,null,null);t.default=component.exports}}]);