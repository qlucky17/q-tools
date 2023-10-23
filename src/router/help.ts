import { RouteRecordRaw } from 'vue-router';
import { noFoundRoutes } from './routes/index';
import router from './index';
import { MenuItemModel } from '@/api/account/model/menuModel';
const mainLayout = () => import('@/layout/index.vue');

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

export const addRoutes = (permissions: MenuItemModel[]) => {
  dynamicViewsModules = import.meta.glob('../views/**/*.vue');
  permissions.forEach((item) => {
    const { id, pid, web_path, web_component, title, icon, is_blank, is_hidden, is_path } = item;
    if (web_component) {
      const route = {
        path: '/',
        // name: Symbol(),
        name: web_path,
        component: mainLayout,
        children: [
          {
            path: web_path as string,
            name: Symbol(),
            // component: () => import('../views' + web_component),
            component: dynamicImport(dynamicViewsModules, web_component as string),
            meta: { title, icon, is_blank, is_hidden, is_path, id, pid },
          },
        ],
      };
      // 按钮权限
      const btnPermissions: string[] = [];
      permissions.forEach((element) => {
        const { pid, web_permission_code } = element;
        if (pid === id) {
          btnPermissions.push(web_permission_code as string);
        }
      });
      // @ts-ignore
      route.children[0].meta.btnPermissions = btnPermissions;
      router.addRoute(route as unknown as RouteRecordRaw);
    }
  });
  router.addRoute(noFoundRoutes[0]);
};

//  component:(eg:/menu/MenuPermission.vue,/menu/MenuPermission,menu/MenuPermission.vue。。。等都是符合的)
function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../views', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  } else if (matchKeys?.length > 1) {
    console.log('请不要在相同层次src/views文件夹下创建相同文件名的.vue文件。这将导致动态引入失败');
    return;
  } else {
    console.log(`在src/views/下找不到${component}.vue的文件 , 请自行创建!`);
    return;
  }
}
