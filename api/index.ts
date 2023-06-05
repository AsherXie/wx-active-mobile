import Http from '@/utils/axios.config';

export interface postAcitiveInfoParams {
  work_name: string;
  listen: string;
  name: string;
  image_url: string;
  remark: string;
  email_captcha: string;
}

export interface postAcitiveInfoResponse {
  url1: 'string';
}

export interface postSendEamilParams {
  email: string;
  emailCode: string;
}

export const postUploadImage = (data: FormData) =>
  Http.httpPost<postAcitiveInfoResponse>('/upload', data, {
    'Content-Type': 'multipart/form-data',
  });

export const postAcitiveInfo = (data: postAcitiveInfoParams) =>
  Http.httpPost('/submit/1', data);

export const postSendEamil = (data: postSendEamilParams) =>
  Http.httpPost('/upload', data);
