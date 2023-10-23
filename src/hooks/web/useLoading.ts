export function useLoading() {
  //const loadingInstance = ref()

  function showLoading() {
    // loadingInstance.value = ElLoading.service({
    //   lock: true,
    //   text: '请求数据中...',
    //   background: 'rgba(0,0,0,0.5)'
    // })
  }
  function closeLoading() {
    // loadingInstance.value && loadingInstance.value.close()
  }
  return { showLoading, closeLoading };
}
