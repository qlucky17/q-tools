<template>
  <a-sub-menu :key="menu.id">
    <template #icon>
      <icon-font v-if="menu.icon" :type="menu.icon" />
    </template>
    <template #title>{{ menu.title }}</template>
    <template v-for="item in menu.children" :key="item.key">
      <template v-if="item.web_component && !item.children?.length">
        <a-menu-item :key="item.id" @click="emits('click', item)">
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :key="item.id" :menu="item" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts">
  import { MenuItemModel } from '@/api/account/model/menuModel';

  defineProps<{
    menu: MenuItemModel;
  }>();

  const emits = defineEmits(['click']);
</script>

<style lang="scss" scoped></style>
