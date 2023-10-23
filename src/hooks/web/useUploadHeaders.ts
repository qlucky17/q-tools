import { userStoreWithOut } from '@/store/modules/user';
import { getHeaders } from '@/utils/http/axios/helper';
import { ref } from 'vue';

export function useUploadHeaders() {
  const userStore = userStoreWithOut();
  const { token } = userStore;
  function imgUploadHeader(data) {
    const headers = ref<any>({});
    if (token) {
      headers.value['Authorization'] = token ? 'Bearer' + ' ' + token : '';
    }
    const payloadString = JSON.stringify(data);
    const { stamp, nonce, sign } = getHeaders('', payloadString, 'post', token ?? '');
    headers.value['sign'] = sign;
    headers.value['stamp'] = stamp;
    headers.value['nonce'] = nonce;
    headers.value['version'] = 'v1';
    return headers.value;
  }
  return {
    imgUploadHeader,
  };
}
