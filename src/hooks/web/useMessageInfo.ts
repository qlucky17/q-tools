import { message } from 'ant-design-vue';

export function useMessageInfo() {
  function showErrorMessage(_msg: string) {
    message.error(_msg);
  }
  function showSuccessMessage(_msg: string) {}
  function showCommonMessage(_msg: string) {}
  function sendMessage(_type: string, _value?: any) {}
  function sendPopMessage(_data: any) {}
  function openParentMask() {
    console.log('open parent mask');
    // window.parent.postMessage(
    //   {
    //     type: 'agg_mask_visible',
    //     value: true,
    //   },
    //   '*'
    // );
  }
  function closeParentMask() {
    console.log('close parent mask');
    // window.parent.postMessage(
    //   {
    //     type: 'agg_mask_visible',
    //     value: false,
    //   },
    //   '*'
    // );
  }

  function showCustomMsg(success: number, fail: number) {
    let _txtHtml = '<div class="lh18">成功发布<span class="red">' + success + '个</span>商品</div>';
    if (fail > 0) {
      _txtHtml +=
        '<div class="lh18"><span class="red">' + fail + '个</span>商品已删除，无法发布</div>';
    } else if (fail > 0 && success > 0) {
      _txtHtml +=
        '<div class="lh18">成功发布<span class="red">' +
        success +
        '个</span>商品<br/><span class="red">' +
        fail +
        '个</span>商品已删除，无法发布</div>';
    }
  }

  return {
    showErrorMessage,
    showSuccessMessage,
    showCommonMessage,
    sendMessage,
    openParentMask,
    closeParentMask,
    sendPopMessage,
    showCustomMsg,
  };
}
