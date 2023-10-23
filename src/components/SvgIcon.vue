<template>
  <svg
    :class="{ 'svg-icon-spin': spin }"
    :style="{ ...getStyle, width, height }"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
  import { computed, CSSProperties } from 'vue';
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
    size: {
      type: [Number, String],
      default: 16,
    },
    spin: {
      type: Boolean,
      default: false,
    },
    width: String,
    height: String,
  });

  const getStyle = computed((): CSSProperties => {
    const { size } = props;
    let s = `${size}`;
    s = `${s.replace('px', '')}px`;
    return {
      width: s,
      height: s,
    };
  });

  const symbolId = computed(() => `#icon-${props.name}`);
</script>

<style lang="scss" scoped>
  svg {
    display: inline-block;
    fill: currentColor;
    overflow: hidden;
  }

  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>
