<template>
  <img
    v-bind="$attrs"
    :src="src"
    class="bowlofnoodles-img"
    v-viewer
  />
</template>

<script>
import Viewer from 'v-viewer';
import Vue from 'vue';

Vue.use(Viewer);

export default {
  name: 'Img',
  data() {
    return {
    };
  },
  props: {
    src: {
      required: true,
      type: String
    }
  }
}
</script>

<style src="viewerjs/dist/viewer.css" />

<style lang="stylus">
.bowlofnoodles-img {
  cursor: zoom-in;
}
.viewer-prev, .viewer-next {
  display: none;
}
.viewer-backdrop {
  background-color: rgba(0, 0, 0, 0.75);
}
</style>



