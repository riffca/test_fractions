<template>
  <div class="page">
    <router-link :to="{path:'comments'}">Comments</router-link>
    <router-link :to="{path:'calc'}">Fractions</router-link>
  </div>
</template>

<script>
import Counter from 'components/Counter'

export default {
  components: {
    Counter
  }
}
</script>
<style>
.page a {
  cursor: pointer;
  margin: 1rem;
  padding: 2rem;
}
.page a:hover {
  border: 1px solid grey;
}


</style>
