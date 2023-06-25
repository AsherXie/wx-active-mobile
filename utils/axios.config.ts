import axios, { AxiosInstance } from 'axios';

export enum HttpCode {
  OK = 200,
  PERM_ERROR = 403,
  SIGN_ERROR = 401,
  SERVER_ERROR = 500,
}

const HttpHeaders = {
  'Content-Type': 'application/json',
};

export interface HttpParams {
  [portName: string]: any;
}
// const http = axios.create({
//   baseURL: '/api',
// });

// http.interceptors.request.use((request) => {
//   request.headers = Object.assign({}, HttpHeaders, request.headers);
//   request.headers.a = 1;
//   console.log(request.headers);
//   return request;
// });

// http.interceptors.response.use(
//   (response) => {
//     const { status } = response;
//     if (status !== HttpCode.OK) return Promise.reject(response.data || 'error');
//     // if()
//     return response;
//   },
//   (error) => Promise.reject(error.data)
// );
// class Http {
//   constructor() {}
//   httpGet(url: string, params: HttpParams, headers = HttpHeaders) {
//     return http
//       .get(url, { params, headers })
//       .catch((err) => Promise.reject(err));
//   }
//   httpPost(url: string, data: any, headers = HttpHeaders) {
//     return http({ method: 'POST', url, data, headers }).catch((err) =>
//       Promise.reject(err)
//     );
//   }
// }

// export default Http;
class HttpClient {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: '/api',
    });
    this.instance.interceptors.request.use((request) => {
      request.headers = Object.assign({}, HttpHeaders, request.headers);
      return request;
    });

    this.instance.interceptors.response.use(
      (response) => {
        const { status } = response;
        if (status !== HttpCode.OK)
          return Promise.reject(response.data || 'error');
        // if()
        return response;
      },
      (error) => Promise.reject(error.data)
    );
  }

  httpGet<T>(url: string, params: HttpParams) {
    return this.instance
      .get<T>(url, params)
      .catch((err) => Promise.reject(err));
  }

  httpPost<T>(url: string, data: any, headers = HttpHeaders) {
    return this.instance
      .post<T>(url, data, { headers })
      .catch((err) => Promise.reject(err));
  }
}
const httpServer = new HttpClient();
export default httpServer;
