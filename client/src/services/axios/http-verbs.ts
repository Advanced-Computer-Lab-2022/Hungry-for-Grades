/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { http } from './http-common';
import {
  type DELETERoutesType,
  //type DELETERoutesType,
  type GETRoutesType,
  // type PATCHRoutesType,
  type POSTRoutesType
  //type PUTRoutesType
} from './types';

/**
 * GET request
 * @param request - request object
 * @returns a promise - with the response from the server
 */
export async function getRequest<T>(
  request: GETRoutesType
): Promise<T | undefined> {
  const response = await http.get<T>(
    `${request.URL}${request.params ? '/' + request.params : ''}${
      request.query ? '?' + request.query : ''
    }`,
    { withCredentials: true }
  );

  return response?.data;
}

/**
 * POST request
 * @param request - request object
 * @returns a promise with the response from the server
 */
export async function postRequest<T>(request: POSTRoutesType): Promise<T> {
  const response = await http.post<T>(
    `${request.URL}${request.params ? '/' + request.params : ''}${
      request.query ? '?' + request.query : ''
    }`,
    { ...request?.payload },
    { withCredentials: true }
  );

  return response?.data;
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
export async function deleteRequest<T>(request: DELETERoutesType) {
  const response = await http.delete<T>(
    `${request.URL}${request.params ? '/' + request.params : ''}${
      request.query ? '?' + request.query : ''
    }`
  );

  return response?.data;
}

/**
 * PUT request
 * @param request - request object
 * @returns a promise with the response from the server
 */

/* export async function putRequest<T>(request: PUTRoutesType):Promise<T> {
	const response=await  http.put<T>(
		`${request?.URL}${request?.params ? '/' + request?.params : ''}${
			request?.query ? '?' + request?.query : ''
		}`,
		request?.payload
	);

	return response?.data;
} */
