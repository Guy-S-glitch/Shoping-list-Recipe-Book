import{c as g,d as a,e as c,i as l,j as p}from"./chunk-NGME7X53.js";var h=g(r=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var x=(p(),c(l));r.Subject=x.Subject});var u=g(n=>{"use strict";function f(i){for(var e in i)n.hasOwnProperty(e)||(n[e]=i[e])}Object.defineProperty(n,"__esModule",{value:!0});f(h())});var t=class{constructor(e,s){this.name=e,this.amount=s}};var d=a(u()),o=class{constructor(){this.ingredientsChanged=new d.Subject,this.startedEditing=new d.Subject,this.ingredients=[new t("Apples",5),new t("Tomatoes",10)]}getIngredients(){return this.ingredients.slice()}getIngredient(e){return this.ingredients[e]}addIngredient(e){this.ingredients.push(e),this.ingredientsChanged.next(this.ingredients.slice())}addIngredients(e){this.ingredients.push(...e),this.ingredientsChanged.next(this.ingredients.slice())}updateIngredient(e,s){this.ingredients[e]=s,this.ingredientsChanged.next(this.ingredients.slice())}deleteIngredient(e){this.ingredients.splice(e,1),this.ingredientsChanged.next(this.ingredients.slice())}};export{u as a,t as b,o as c};
