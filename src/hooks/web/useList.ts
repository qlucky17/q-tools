import { ref } from 'vue';
import { cloneDeep } from 'lodash';

export function useList() {
  const basicList = ref(); //列表ref
  const visible = ref(false); //弹窗/抽屉显示
  const modalDrawerRef = ref(); //弹窗/抽屉ref

  //获取表格数据-是否是删除后查询
  const query = (isDel?: boolean) => {
    basicList.value.getTableList(isDel);
  };

  //添加弹窗/抽屉显示
  const handleAdd = () => {
    visible.value = true;
    modalDrawerRef.value.add();
  };

  //编辑弹窗/抽屉显示
  const handleEdit = (key: string | number) => {
    visible.value = true;
    modalDrawerRef.value.edit(key);
  };

  //处理排序回显
  const getColumnsSort = (columns, isMap = false) => {
    let arr: any = [];
    const detailToList = localStorage.getItem('detailToList')
      ? localStorage.getItem('detailToList') === '1'
        ? true
        : false
      : false;
    //详情页返回列表页，回填排序数据
    if (detailToList) {
      const list: Array<any> = cloneDeep(columns);
      const basicParams = localStorage.getItem('basicParams')
        ? JSON.parse(localStorage.getItem('basicParams') as string)
        : {};
      console.log('列表-basicParams', basicParams);
      //模板管理
      if (isMap) {
        const sort = basicParams?.sort ?? {};
        if (Object.keys(sort).length > 0) {
          const sort_type =
            sort.sort_type == '2' ? 'descend' : sort.sort_type == '1' ? 'ascend' : '';
          list.forEach((v) => {
            if (v.dataIndex === sort.sort_by) {
              v.defaultSortOrder = sort_type;
            } else {
              delete v.defaultSortOrder;
            }
          });
        } else {
          list.forEach((v) => {
            delete v.defaultSortOrder;
          });
        }
      } else {
        //其他页面的排序
        const sort = basicParams?.sort ?? [];
        if (sort.length > 0) {
          const sort_type =
            sort[0].sort_type == '2' ? 'descend' : sort[0].sort_type == '1' ? 'ascend' : '';
          list.forEach((v) => {
            if (v.dataIndex === sort[0].sort_by) {
              v.defaultSortOrder = sort_type;
            } else {
              delete v.defaultSortOrder;
            }
          });
        } else {
          list.forEach((v) => {
            delete v.defaultSortOrder;
          });
        }
      }

      arr = list;
    } else {
      //否则直接用默认的数据
      arr = columns;
    }
    return arr;
  };
  return { basicList, query, modalDrawerRef, visible, handleAdd, handleEdit, getColumnsSort };
}
