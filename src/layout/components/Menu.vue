<template>
  <a-menu
    v-bind="$attrs"
    v-model:selectedKeys="selectedKeys"
    class="__fnsz___layout___menu"
    :selectable="false"
    @click="checkLogin"
  >
    <template v-for="item in menuList" :key="item.id">
      <template v-if="item.web_component && !item.children?.length">
        <a-menu-item :key="item.id" @click="clickMenuItem(item)">
          <template #icon>
            <icon-font v-if="item.icon" :type="item.icon" />
          </template>
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :key="item.id" :menu="item" @click="clickMenuItem" />
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
  import SubMenu from './SubMenu.vue';
  import { ref, watch } from 'vue';
  import { menuData } from '@/router/routes/menu';
  import { userStoreWithOut } from '@/store/modules/user';

  const router = (window as any).DDrouter;
  const userStore = userStoreWithOut();
  const route = (window as any).DDrouter.currentRoute.value;

  interface PropsType {
    menuList: any;
  }

  withDefaults(defineProps<PropsType>(), {
    menuList: [],
  });

  let selectedKeys = ref();
  let clickedItem = ref();

  const clickMenuItem = (item) => {
    clickedItem.value = item;
  };

  const checkLogin = () => {
    if (clickedItem.value.needLogin && !userStore.userInfo) {
      userStore.showLoginDialog(clickedItem.value.web_path);
    } else {
      router.push(clickedItem.value.web_path);
    }
  };

  const updateSelectedKeys = () => {
    const mItem = menuData.find((a) => a.web_path == route.path);
    selectedKeys.value = mItem ? [mItem.id] : [];
  };

  watch(
    () => route.path,
    () => {
      updateSelectedKeys();
    },
    {
      immediate: true,
    }
  );
</script>

<style scoped lang="scss"></style>
<style lang="scss">
  .__fnsz___layout___menu {
    &.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,
    &.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open,
    &.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected,
    &.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected {
      color: #fff;
      background-color: var(--fn-primary-color);
    }

    &.ant-menu-light .ant-menu-submenu-active,
    &.ant-menu-light .ant-menu-submenu-title:hover {
      color: #fff;
    }

    &.ant-menu-horizontal > .ant-menu-item::after,
    &.ant-menu-horizontal > .ant-menu-submenu::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected:after {
      border-bottom: 0 !important;
    }
  }
</style>
