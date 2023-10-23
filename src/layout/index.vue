<template>
  <a-layout class="fnsz-layout">
    <a-layout-header :style="{ position: 'fixed', zIndex: 100, width: '100%' }">
      <div class="flex justify-between">
        <div class="flex">
          <div class="logo ml-36px mr-74px">
            <SvgIcon name="logo_fnsz" color="#0453F3" width="110px" height="20px" />
          </div>
          <Menu :menuList="navList" mode="horizontal" />
        </div>
        <div class="pr-24px">
          <a-dropdown v-if="userInfo">
            <span class="flex items-center ant-dropdown-link" @click.prevent>
              <SvgIcon name="img_individual" color="#C0CBF2" width="20px" height="20px" />
              <span class="ml-6px">{{ userInfo?.real_name }}</span>
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
          <a-button v-else type="link" @click="userStore.showLoginDialog()">登录 / 注册</a-button>
        </div>
      </div>
    </a-layout-header>
    <a-layout class="layout-content-wrap mini-scrollbar">
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>

  <!-- 登录框 -->
  <div v-if="isShowLogin">
    <LoginDialog
      v-model:visible="isShowLogin"
      @cancel="userStore.hideLoginDialog"
      @ok="loginSuccess"
    />
  </div>
</template>

<script lang="ts" setup>
  import LoginDialog from '@/views/login/components/LoginDialog.vue';
  import Menu from './components/Menu.vue';
  import { computed } from 'vue';
  import { userStoreWithOut } from '@/store/modules/user';
  import IconFont from '@/assets/iconFont/index';

  const router = (window as any).DDrouter;
  const userStore = userStoreWithOut();

  let isShowLogin = computed(() => {
    return userStore.isShowLogin;
  });

  const userInfo = computed(() => {
    return userStore.userInfo;
  });

  const navList = computed(() => {
    return userStore.navList;
  });

  const logout = async () => {
    userStore.logout();
  };

  const loginSuccess = () => {
    userStore.hideLoginDialog();
    userStore.redirectPath ? router.push(userStore.redirectPath) : location.reload();
  };
</script>

<style lang="scss" scoped>
  .fnsz-layout {
    overflow: auto;
    background: #fff;

    .ant-layout-header {
      padding: 0;
      background: #fff;
      box-shadow: 0px 2px 6px 0px rgba(29, 33, 41, 0.1);
    }

    .layout-content-wrap {
      width: 100%;
      height: calc(100vh - 64px);
      margin-top: 64px;
      background: #fff;
      position: relative;
      overflow: auto;

      > .ant-layout-content {
        width: 1500px;
        margin: 0 auto;
      }
    }
  }
</style>
