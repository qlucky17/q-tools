import { inject } from 'vue';

export default {
  mounted(el, binding) {
    const router = (window as any).DDrouter;
    const userStore = inject('userStore') as any;
    const { value } = binding;
    const curPath = router.currentRoute.value.path;
    const roles = userStore.pagePermissions[curPath] || [];
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role);
      });
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`使用方式： v-permission="['admin','editor']"`);
    }
  },
};
