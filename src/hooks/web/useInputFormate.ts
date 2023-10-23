export function useInputFormate() {
  const formate = (e) => {
    e.target.value = e.target.value?.replace(
      /[\u4e00-\u9fa5]|[（）——|《》？：“”【】、；‘’，。、]/g,
      ''
    );
  };
  const formateValue = (e) => {
    return e?.replace(/[\u4e00-\u9fa5]|[（）——|《》？：“”【】、；‘’，。、]/g, '');
  };
  return {
    formate,
    formateValue,
  };
}
