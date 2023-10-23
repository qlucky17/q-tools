import { markRaw } from 'vue';

export function useDyamicComponent() {
  const componetObj = getComponentObj();
  // const componetObj = {
  //   ZWAInput: markRaw(ZWAInput),
  //   ZWAInputNumber: markRaw(ZWAInputNumber),
  //   ZWAFoldSelect: markRaw(ZWAFoldSelect),
  //   ZWASpDateRangePicker: markRaw(ZWASpDateRangePicker),
  //   ZWASorting: markRaw(ZWASorting),
  // };
  //console.log('componetObj', componetObj);
  function getComponent(key: string | undefined) {
    if (!key) {
      return undefined;
    }
    const componet = componetObj[key];
    return componet;
  }

  return { getComponent };
}

function getComponentObj() {
  const result = {};

  const commonComponentsModules = import.meta.globEager('../../components/**/index.vue');
  const keys = Object.keys(commonComponentsModules);
  keys.forEach((key) => {
    const k = key.lastIndexOf('/');
    const kStr = key.substring(0, k);
    const kStrIndex = kStr.lastIndexOf('/');
    const objectKey = kStr.substring(kStrIndex + 1, kStr.length);
    result[objectKey] = markRaw(commonComponentsModules[key].default);
  });

  return result;
}
