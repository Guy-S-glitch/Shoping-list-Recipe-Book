import{a as b,c as f}from"./chunk-AMA66JBV.js";import{a as d}from"./chunk-PFK6XVEQ.js";import{U as h,a as p,b as a,d as g,h as n,n as o,o as c,q as r}from"./chunk-NGME7X53.js";var u=g(b());var m=(()=>{let t=class t{constructor(e){this.slService=e,this.recipesChanged=new u.Subject,this.recipes=[]}setRecipes(e){this.recipes=e,this.recipesChanged.next(this.recipes.slice())}getRecipes(){return this.recipes.slice()}getRecipe(e){return this.recipes[e]}addIngredientsToShoppingList(e){this.slService.addIngredients(e)}addRecipe(e){this.recipes.push(e),this.recipesChanged.next(this.recipes.slice())}updateRecipe(e,i){this.recipes[e]=i,this.recipesChanged.next(this.recipes.slice())}deleteRecipe(e){this.recipes.splice(e,1),this.recipesChanged.next(this.recipes.slice())}};t.\u0275fac=function(i){return new(i||t)(r(f))},t.\u0275prov=c({token:t,factory:t.\u0275fac});let s=t;return s})();var C=(()=>{let t=class t{constructor(e,i,l){this.http=e,this.recipeService=i,this.authService=l}saveData(){let e=this.recipeService.getRecipes();return this.http.put("https://course-database-574ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json",e)}fetchData(){return this.http.get("https://course-database-574ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json").pipe(n(e=>e.map(i=>a(p({},i),{ingredients:i.ingredients?i.ingredients:[]}))),o(e=>{this.recipeService.setRecipes(e)}))}};t.\u0275fac=function(i){return new(i||t)(r(h),r(m),r(d))},t.\u0275prov=c({token:t,factory:t.\u0275fac,providedIn:"root"});let s=t;return s})();export{m as a,C as b};