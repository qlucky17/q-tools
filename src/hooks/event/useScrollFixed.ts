import { onMounted, onUnmounted, Ref } from 'vue';

export default function useScrollFixed({
  target,
  offset,
}: {
  target: Ref<HTMLElement>;
  offset: number;
}) {
  const updateFixedByScroll = () => {
    const scrollTop = document.documentElement.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight || 0;
    const clientHeight = document.documentElement.clientHeight || 0;
    const targetHeight = target.value?.offsetHeight;
    const fixedRootOffsetTop = offset;
    const bottomDistance = scrollHeight - scrollTop - clientHeight; //计算滚动条距离底部的距离小于分页的高度，定位修改
    const hasScroll = document.body.scrollHeight > (window.innerHeight || clientHeight);

    //菜单管理页面-没有分页-特殊处理
    if (!target.value) {
      return;
    } else {
      if (hasScroll && bottomDistance > targetHeight + 6) {
        target.value.style.position = 'fixed';
        target.value.style.bottom = `${fixedRootOffsetTop}px`;
        target.value.style.width = 'calc(100% - 40px)';
      } else {
        target.value.style.position = 'static';
        target.value.style.width = '100%';
      }
    }
  };

  onMounted(() => {
    document.addEventListener('scroll', updateFixedByScroll);
  });

  onUnmounted(() => {
    document.removeEventListener('scroll', updateFixedByScroll);
  });

  return updateFixedByScroll;
}
