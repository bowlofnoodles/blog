<template>
  <span
    class="bowlofnoodles-tag"
    :style="{backgroundColor: this.computedColor}"
  >
    <slot />
  </span>
</template>

<script>

export const colorMapping = {
  success: '#bae637',
  danger: '#ff4d4f',
  warning: '#ffc53d',
  blue: '#40a9ff'
};

export default {
  name: 'Tag',
  props: {
    color: {
      type: String
    },
    type: {
      default: 'danger',
      validator: function (value) {
        return ['success', 'warning', 'danger', 'blue'].includes(value)
      }
    }
  },
  computed: {
    computedColor() {
      return this.color || colorMapping[this.type];
    }
  }
}
</script>

<style lang="stylus">

.bowlofnoodles-tag {
  color: #fff;
  background: #ff4d4f;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  margin: 0 3px;
}

</style>