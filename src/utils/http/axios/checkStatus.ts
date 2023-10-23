import type { ErrorMessageMode } from '#/axios';
import { useMessage } from '@/hooks/web/useMessage';
import { t } from '@/i18n/index';

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error;

export function checkStatus(
  status: number | string,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message'
): void {
  const router = (window as any).DDrouter;
  const userStore = inject('userStore') as any;
  let errMessage = '';

  switch (Number(status)) {
    case 400:
      errMessage = msg || t('api.errMsg400');
      break;
    case 401:
      errMessage = msg || t('api.errMsg401');
      userStore.resetUser();
      userStore.showLoginDialog(router.currentRoute.value.fullPath);
      break;
    case 403:
      errMessage = t('api.errMsg403');
      break;
    // 404请求不存在
    case 404:
      errMessage = t('api.errMsg404');
      break;
    case 405:
      errMessage = t('api.errMsg405');
      break;
    case 408:
      errMessage = t('api.errMsg408');
      break;
    case 420:
      errMessage = t('api.errMsg420');
      break;
    case 421:
      errMessage = t('api.errMsg421');
      break;
    case 500:
      errMessage = t('api.errMsg500');
      break;
    case 501:
      errMessage = t('api.errMsg501');
      break;
    case 502:
      errMessage = t('api.errMsg502');
      break;
    case 503:
      errMessage = t('api.errMsg503');
      break;
    case 504:
      errMessage = t('api.errMsg504');
      break;
    case 505:
      errMessage = t('api.errMsg505');
      break;
    default:
      errMessage = t('api.errMsgDefault');
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: t('api.errorTip'), content: errMessage });
    } else if (errorMessageMode === 'message') {
      // @ts-ignore
      error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}

function inject(arg0: string): any {
  throw new Error('Function not implemented.');
}
