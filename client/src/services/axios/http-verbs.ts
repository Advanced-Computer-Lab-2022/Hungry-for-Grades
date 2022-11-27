/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type AxiosResponse } from 'axios';

import { http, httpProtected } from './http-common';
import {
  DELETERoutesType,
  //type DELETERoutesType,
  type GETRoutesType,
  // type PATCHRoutesType,
  type POSTRoutesType
  //type PUTRoutesType
} from './types';

type Options = {
  withCredentials: boolean;
};

/**
 * GET request
 * @param request - request object
 * @returns a promise - with the response from the server
 */
export async function getRequest(
  request: GETRoutesType,
  isProtected?: boolean,
  options?: Options
): Promise<AxiosResponse<typeof request.response>> {
  const httpInstance = isProtected ? httpProtected : http;
  return httpInstance.get<typeof request.response>(
    `${request.URL}${request.params ? '/' + request.params : ''}${
      request.query ? '?' + request.query : ''
    }`,
    options
  );
}

/**
 * POST request
 * @param request - request object
 * @returns a promise with the response from the server
 */
export async function postRequest(
  request: POSTRoutesType,
  isProtected?: boolean,
  options?: Options
) {
  const httpInstance = isProtected ? httpProtected : http;
  return httpInstance.post<
    typeof request.response,
    AxiosResponse<typeof request.response>
  >(
    `${request.URL}${request.params ? '/' + request.params : ''}${
      request.query ? '?' + request.query : ''
    }`,
    { ...request?.payload },
    { ...options }
  );
}
/*
/**
 * PATCH request
 * @param request - request object
 * @returns a promise with the response from the server
 */
/* export async function patchRequest(request: PATCHRoutesType) {
	return http.patch<typeof request.response>(
		`${request.URL}${request.params ? '/' + request.params : ''}${
			request.query ? '?' + request.query : ''
		}`,
		request.payload
	);
} */

/**
 * DELETE request
 * @param request - request object
 * @returns a promise with the response from the server
 */
export async function deleteRequest(request: DELETERoutesType) {
  return http.delete<typeof request.response>(
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
/*
export async function putRequest(request: PUTRoutesType) {
	return http.put<typeof request.response>(
		`${request?.URL}${request?.params ? '/' + request?.params : ''}${
			request?.query ? '?' + request?.query : ''
		}`,
		request?.payload
	);
}
 */
