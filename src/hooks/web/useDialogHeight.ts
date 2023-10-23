import { systemStore } from '@/store/modules/system';
import { useWindowSize } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
export function useDialogHeight(params?: { offetHeight: number; hideFooter?: boolean }) {
  const dialogMaxHeight = ref(750);
  const bodyMaxHeight = ref(642);
  const topHeight = ref(100);
  const { height, width } = useWindowSize();
  const systemInfo = systemStore();
  const windowWidth = computed(() => width.value + systemInfo.menuWidth);
  const contentHeight = computed(() => {
    let offet = 130;
    if ((params && params.offetHeight) || (params && params.offetHeight == 0)) {
      offet = params.offetHeight;
    }
    return `${bodyMaxHeight.value - offet}px`;
  });
  watch(
    () => height.value,
    (curr) => {
      dialogMaxHeight.value = curr * 0.9;
      if (!params || (params && !params.hideFooter)) {
        bodyMaxHeight.value = dialogMaxHeight.value - 108;
      } else {
        bodyMaxHeight.value = dialogMaxHeight.value - 55;
      }
    },
    { immediate: true }
  );
  return {
    dialogMaxHeight,
    bodyMaxHeight,
    topHeight,
    windowHeight: height,
    windowWidth,
    childWindowWidth: width,
    contentHeight,
  };
}
