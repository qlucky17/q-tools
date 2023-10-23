/**
 * @description: 图片懒加载
 */
import { useIntersectionObserver } from '@vueuse/core';
import DefaultImg from '@/assets/image/default-imgbg.png';
import { DirectiveBinding } from 'vue';

function loadImgHooks(el: HTMLImageElement, src: string) {
  const imgEl = new Image();
  imgEl.src = src;
  imgEl.onload = () => {
    el.src = src;
    el.style.objectFit = '';
  };
  imgEl.onerror = () => {
    el.src = DefaultImg;
    el.style.backgroundColor = '#F4F4F4';
    el.style.objectFit = 'contain';
  };
}

function loadImg(el: HTMLImageElement, binding: DirectiveBinding) {
  const { value } = binding;
  el.src = DefaultImg;
  el.style.backgroundColor = '#F4F4F4';
  el.style.objectFit = 'contain';
  if (!value) return;

  const { stop, isSupported } = useIntersectionObserver(
    el,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        loadImgHooks(el, value);
        stop();
      }
    },
    { threshold: 0 }
  );
  if (!isSupported) {
    console.warn('is not supported useIntersectionObserver');
    loadImgHooks(el, value);
  }
}

export default {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    loadImg(el, binding);
  },
  updated(el: HTMLImageElement, binding: DirectiveBinding) {
    if (binding.oldValue === binding.value) return;
    loadImg(el, binding);
  },
};
