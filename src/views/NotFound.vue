<template>
  <div>
    <h1>Oops!</h1>
    <p>The {{ resource }} you're looking for is not here.</p>
    <router-link :to="{ name: 'list' }">Back to home page.</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      require: true,
    },
  },
};
</script>
