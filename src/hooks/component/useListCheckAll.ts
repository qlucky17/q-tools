import { ref } from 'vue';

export default function useListCheckAll() {
  /**** 全选的按钮 ****/
  const rowKey = ref<string>('');
  const tableList = ref();
  const isChkAll = ref<boolean>(false);
  const chkedIds = ref<string[]>([]);
  const total = ref<number>(0);
  const selectedRowKeys = ref<any[]>([]);
  const tableDataList = ref<any[]>([]);
  const onSelectChange = (changableRowKeys: string[]) => {
    selectedRowKeys.value = chkedIds.value = changableRowKeys;
    isChkAll.value = selectedRowKeys.value.length === 20 ? true : false;
  };
  const getResData = (data: any) => {
    tableDataList.value = data?.list;
    total.value = data?.total || 0;
  };
  const toggleChkAll = () => {
    if (isChkAll.value) {
      const data =
        tableDataList.value && (tableDataList.value.map((e) => e[rowKey.value]) as string[]);
      chkedIds.value = data;
      selectedRowKeys.value = data;
    } else {
      selectedRowKeys.value = chkedIds.value = [];
    }
    tableList.value?.updateSelectedKeys(selectedRowKeys.value);
  };

  return {
    tableList,
    onSelectChange,
    getResData,
    toggleChkAll,
    isChkAll,
    chkedIds,
    selectedRowKeys,
    rowKey,
  };
}
