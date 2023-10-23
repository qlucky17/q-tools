import Cookies from 'js-cookie';
import { Env, Envs, envPrefix } from './data';
import ObsClient from 'esdk-obs-browserjs';
import { buildUUID } from '../uuid';

const uploadFiles = {
  actionEum: {
    development: 'http://content-api.zwdc.com',
    test: 'http://content-api.zwdc.com',
    sandbox: 'https://content-api.zhiwendiy.com',
    production: 'https://content-api.hicustom.com',
  },
  async getCtToken({ http, url, bizType = '' }) {
    const ctToken = Cookies.get('ctToken');
    if (!ctToken) {
      try {
        const { ctToken, expiredTimeMills } = await http.post({
          url,
          params: { bizType },
        });
        const inFifteenMinutes = new Date(expiredTimeMills - 10 * 60 * 1000);
        Cookies.set('ctToken', ctToken, {
          expires: inFifteenMinutes,
        });
      } catch (error) {
        console.log(error);
      }
    }

    return Cookies.get('ctToken') as string;
  },
  getAction(env: Env) {
    return this.actionEum[env] + '/file-upload/multipart-file-upload';
  },
  accessToken: Cookies.get('accessToken') as any,
  envs: {} as Envs,
  obsClient: {} as any,
  async init({ http, url, bizType = '' }) {
    this.envs = await http.get({
      url: '/envs?plugin_codes=env_content',
    });

    // if (!this.accessToken) {
    try {
      const accessToken = await http.post({
        url,
        params: { bizType },
      });
      const inFifteenMinutes = new Date(accessToken.expiredTimeMills - 10 * 60 * 1000);
      Cookies.set('accessToken', JSON.stringify(accessToken), {
        expires: inFifteenMinutes,
      });
    } catch (error) {
      console.log(error);
    }
    // }
    this.accessToken = JSON.parse(Cookies.get('accessToken') as any);
    this.obsClient = new ObsClient({
      access_key_id: this.accessToken.ak,
      secret_access_key: this.accessToken.sk,
      security_token: this.accessToken.st,
      server: this.accessToken.obsHost,
    });
    return this.accessToken.ctToken;
  },
  async initImgDomains(http: any) {
    this.envs = await http.get({
      url: '/envs?plugin_codes=env_content',
    });
  },
  customRequest(file: any, { cb1, params, cb2 }: { cb1?: any; params?: any; cb2?: any }) {
    const { dir, bucketName, ctToken } = this.accessToken;
    const key = `${dir}/${buildUUID()}.${file.type.split('/')[1]}`;
    this.obsClient.putObject(
      {
        Bucket: bucketName,
        Key: key,
        SourceFile: file,
        Metadata: { ctToken, originName: file.name },
      },
      function (err: any, _result: any) {
        if (err) {
          console.log(err);
        } else {
          cb1 && cb1(key, params);
          // 如：传完直接列表刷新
          cb2 && cb2();
        }
      }
    );
  },
  getFullPath(path: string) {
    const key = envPrefix + path.split('/')[0];
    const host = this.envs.env_content[key];
    if (path?.startsWith('/')) {
      return host + path;
    }
    return host + '/' + path;
  },
  getFullPathWithSize(path: string, size: number) {
    const fullPath = this.getFullPath(path);
    if (size) {
      return `${fullPath}?x-image-process=style/s${size}`;
    } else {
      return fullPath;
    }
  },
  customRequestPromise(file: any, params?: { params?: any }) {
    const that = this as any;

    return new Promise<any>((resolve, reject) => {
      const { dir, bucketName, ctToken } = that.accessToken;
      const key = `${dir}/${buildUUID()}.${file.type.split('/')[1]}`;
      that.obsClient.putObject(
        {
          Bucket: bucketName,
          Key: key,
          SourceFile: file,
          Metadata: { ctToken, originName: file.name },
        },
        function (err: any, _result: any) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            // const keyPath = envPrefix + key.split('/')[0];
            // const host = that.envs.env_content[keyPath];
            file.status = 'success';
            resolve({ relativeUrl: key, params, id: key, file });
            // return host + '/' + key;
            // cb1 && cb1(key, params);
            // // 如：传完直接列表刷新
            // cb2 && cb2();
          }
        }
      );
    });
  },
  customRequestPromiseOriginFile(file: any, params?: { params?: any }) {
    const that = this as any;
    return new Promise<any>((resolve, reject) => {
      const { dir, bucketName, ctToken } = that.accessToken;
      const key = `${dir}/${buildUUID()}.${file.file.name.split('.')[1]}`;
      that.obsClient.putObject(
        {
          Bucket: bucketName,
          Key: key,
          SourceFile: file.file,
          Metadata: { ctToken, originName: file.file.name },
        },
        function (err: any, _result: any) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            // const keyPath = envPrefix + key.split('/')[0];
            // const host = that.envs.env_content[keyPath];
            file.onSuccess({ data: { relativeUrl: key, params, id: key, file } });
            resolve({ relativeUrl: key, params, id: key });
            // return host + '/' + key;
            // cb1 && cb1(key, params);
            // // 如：传完直接列表刷新
            // cb2 && cb2();
          }
        }
      );
    });
  },
};

export default uploadFiles;
