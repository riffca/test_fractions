<template>
  <div id="app">
    <div class="page">
      <router-link :to="{path:'comments'}">Comments</router-link>
      <router-link :to="{path:'calc'}">Fractions</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  font-size: 2rem;
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
}


.page a {
  display: inline-block;
}
.page {
  text-align: center;
  /* nesting for the need to test postcss */
  code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
  }
}
</style>
