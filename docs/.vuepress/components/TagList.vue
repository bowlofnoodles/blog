<template>
  <span>
    <Tag v-for="(item, index) of computedList" :key="index" :type="item[1]">
      {{ item[0] }}
    </Tag>
  </span>
</template>

<script>
import Tag, { colorMapping } from './Tag';
import { shuffle } from '../utils';

export default {
  name: 'TagList',
  components: {
    Tag
  },
  props: {
    list: {
      // Array[text] Array[[text, type]]
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      colorMapping
    };
  },
  computed: {
    computedList() {
      const types = shuffle(Object.keys(this.colorMapping));
      return (this.list || []).map((item, index) => {
        if (Array.isArray(item)) {
          return item;
        } else {
          item = [item];
          item[1] = types[index % types.length];
          return item;
        }
      });
    }
  }
};
</script>

<style lang="stylus"></style>
