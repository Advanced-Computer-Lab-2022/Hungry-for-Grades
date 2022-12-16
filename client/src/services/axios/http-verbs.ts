import { AxiosResponse } from 'axios';
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { http } from './http-common';
import {
  type PUTRoutesType,
  //type PUTRoutesType
  type DELETERoutesType,
  //type DELETERoutesType,
  type GETRoutesType,
  // type PATCHRoutesType,
  type POSTRoutesType,
 type  PATCHRoutesType
  //type POSTRoutesType
} from './types';

/**
 * GET request
 * @param request - request object
 * @returns a promise - with the response from the server
 */
export async function getRequest<T>(
  request: GETRoutesType
): Promise<AxiosResponse<T>> {
  return http.get<T>(
    `${request.URL}${request.params ? '/' + request.params : ''}${
      request.query ? '?' + request.query : ''
    }`,
    { withCredentials: true }
  );
}

/**
 * POST request
 * @param request - request object
 * @returns a promise with the respon
 * se from the server
 */
export async function postRequest<T>(
  request: POSTRoutesType
): Promise<AxiosResponse<T>> {
  return http.post<T>(
    `${request.URL}${request.params ? '/' + request.params : ''}${
      request.query ? '?' + request.query : ''
    }`,
    { ...request?.payload },
    { withCredentials: true }
  );
}
/*

 * PATCH request
 * @param request - request object
 * @returns a promise with the response from the server
 */

export async function patchRequest<T>(request: PATCHRoutesType): Promise<AxiosResponse<T>> {
	return http.patch<T>(
		`${request.URL}${request.params ? '/' + request.params : ''}${
			request.query ? '?' + request.query : ''
		}`,
		request.payload
	);
} 

/**
 * DELETE request
 * @param request - request object
 * @returns a promise with the response from the server
 */
export async function deleteRequest<T>(
  request: DELETERoutesType
): Promise<AxiosResponse<T>> {
  return http.delete<T>(
    `${request.URL}${request.params ? '/' + request.params : ''}${
      request.query ? '?' + request.query : ''
    }`
  );
}

/**
 * PUT request
 * @param request - request object
 * @returns a promise with the response from the server
 */

export async function putRequest<T>(
  request: PUTRoutesType
): Promise<AxiosResponse<T>> {
  return http.put<T>(
    `${request?.URL}${request?.params ? '/' + request?.params : ''}${
      request?.query ? '?' + request?.query : ''
    }`,
    { ...request?.payload },
    { withCredentials: true }
  );
}
