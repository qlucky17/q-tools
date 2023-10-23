<template>
  <div class="fn-layout-wrap">
    <a-layout>
      <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        :width="208"
        class="fn-layout-sider"
      >
        <div class="logo">
          <icon-font
            type="icon-logo_fnsz"
            class="icon"
            :style="{ fontSize: collapsed ? '60px' : '110px' }"
          />
        </div>
        <Menu
          v-model:selectedKeys="selectedKeys"
          v-model:openKeys="openKeys"
          :menuList="navList"
          mode="inline"
          :inline-collapsed="collapsed"
          class="pt-24px"
        />
        <div class="callcenter fn-primary-color" @click="toCallCenter">
          <icon-font type="icon-a-ic_customerservice" class="mr-5px" />
          <span v-if="!collapsed">客服中心</span>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="fn-layout-header">
          <div class="sidebar-collapsed-btn" @click="() => (collapsed = !collapsed)">
            <icon-font v-if="!collapsed" type="icon-direction_left" />
            <icon-font v-else type="icon-direction_right" />
          </div>
          <ZWABreadcrumb :list="systemStore.currentBreadcrumbList" separator="/" />
          <a-dropdown>
            <span class="ant-dropdown-link flex items-center" @click.prevent>
              <SvgIcon name="img_individual" color="#0453F3" width="20px" height="20px" />
              <span class="user-text ml-6px">{{ userInfo?.real_name }}</span>
              <icon-font type="icon-direction_down" class="ml-6px" />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="logout">
                  <span>退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-layout-header>
        <a-layout-content class="fn-layout-content fn-scrollbar">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import Menu from './components/Menu.vue';
  import { onMounted, ref, watch } from 'vue';
  import { userStoreWithOut } from '@/store/modules/user';
  import { systemStoreWithOut } from '@/store/modules/system';

  const route = (window as any).DDrouter.currentRoute.value;
  const router = (window as any).DDrouter;

  const userStore = userStoreWithOut();
  const systemStore = systemStoreWithOut();

  let collapsed = ref<boolean>(false);

  let navList = userStore.navList;
  let selectedKeys = ref();
  let openKeys = ref();

  const userInfo = userStore.userInfo;
  const logout = () => {
    userStore.logout();
  };

  const toCallCenter = () => {
    selectedKeys.value = [];
    router.push('/callCenter');
  };

  onMounted(() => {
    const mItem = userStore.permissions.find((a) => a.web_path == route.path);
    if (mItem) {
      selectedKeys.value = [mItem.id];
      openKeys.value = [mItem.pid];
    }
  });

  watch(
    () => route.path,
    () => {
      console.log('routepath', selectedKeys.value, openKeys.value);
    },
    {
      immediate: true,
    }
  );

  // const logosize = computed(() => {
  //   return collapsed.value ? '60px' : '110px';
  // });
</script>

<style lang="scss" scoped>
  .fn-layout-wrap {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .fn-layout-sider {
    height: 100vh;
    overflow: hidden;
    box-shadow: 2px 2px 6px 0px rgba(29, 33, 41, 0.1);
    position: relative;
  }

  .fn-layout-header {
    background: #fff;
    width: 100%;
    height: 64px;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 2px 6px 0px rgba(29, 33, 41, 0.1);
    position: relative;
  }

  .fn-layout-content {
    width: 100%;
    height: calc(100vh - 64px);
    overflow: auto;
  }

  .logo {
    width: 100%;
    height: 64px;
    background-image: url('/src/assets/image/pod_nav_header.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: all 0.4s;

    .icon {
      color: #fff;
      // font-size: v-bind(logosize);
    }
  }

  .sidebar-collapsed-btn {
    position: absolute;
    left: 0;
    top: 16px;
    width: 0;
    height: 32px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 0 32px 32px 0;
    background-color: #f2f3f5;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 99;

    &:hover {
      width: 32px;
      background-color: #e6f2ff;
      color: #0453f3;
    }
  }

  .fn-layout-sider:hover + .ant-layout .sidebar-collapsed-btn {
    width: 24px;
  }

  .callcenter {
    background: #fff;
    border-top: 1px solid #f0f2f5;
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>
