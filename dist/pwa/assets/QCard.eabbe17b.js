import{c as s,b as n}from"./QBtn.ae86b284.js";import{g as u,h as c,m as i}from"./index.de853ee5.js";import{u as d,a as l}from"./QList.ff619ca1.js";function f(a){return{all:a=a||new Map,on:function(r,t){var e=a.get(r);e?e.push(t):a.set(r,[t])},off:function(r,t){var e=a.get(r);e&&(t?e.splice(e.indexOf(t)>>>0,1):a.set(r,[]))},emit:function(r,t){var e=a.get(r);e&&e.slice().map(function(o){o(t)}),(e=a.get("*"))&&e.slice().map(function(o){o(r,t)})}}}const q=f();var v=s({name:"QCardSection",props:{tag:{type:String,default:"div"},horizontal:Boolean},setup(a,{slots:r}){const t=u(()=>`q-card__section q-card__section--${a.horizontal===!0?"horiz row no-wrap":"vert"}`);return()=>c(a.tag,{class:t.value},n(r.default))}}),h=s({name:"QCard",props:{...d,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(a,{slots:r}){const{proxy:{$q:t}}=i(),e=l(a,t),o=u(()=>"q-card"+(e.value===!0?" q-card--dark q-dark":"")+(a.bordered===!0?" q-card--bordered":"")+(a.square===!0?" q-card--square no-border-radius":"")+(a.flat===!0?" q-card--flat no-shadow":""));return()=>c(a.tag,{class:o.value},n(r.default))}});export{h as Q,v as a,q as e};
