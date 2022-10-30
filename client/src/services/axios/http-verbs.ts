import { type AxiosResponse } from 'axios';

import http from './http-common';
import {
  type DELETERoutesType,
  type GETRoutesType,
  type PATCHRoutesType,
  type POSTRoutesType,
  type PUTRoutesType
} from './types';

/**
 * GET request
 * @param request - request object
 * @returns a promise - with the response from the server
 */
export async function getRequest(
  request: GETRoutesType
): Promise<AxiosResponse> {
  return http.get<typeof request.response>(
    `${request.URL}${request.params ? '/' + request.params : ''}${
      request.query ? '?' + request.query : ''
    }`,
    request.payload
  );
}

/**
 * POST request
 * @param request - request object
 * @returns a promise with the response from the server
 */
export async function postRequest(request: POSTRoutesType) {
  return http.post<
    typeof request.response,
    AxiosResponse<typeof request.response>
  >(
    `${request.URL}${request.params ? '/' + request.params : ''}${
      request.query ? '?' + request.query : ''
    }`,
    { ...request.payload }
  );
}
/**
 * PATCH request
 * @param request - request object
 * @returns a promise with the response from the server
 */
export async function patchRequest(request: PATCHRoutesType) {
  return http.patch<typeof request.response>(
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
export async function putRequest(request: PUTRoutesType) {
  return http.put<typeof request.response>(
    `${request.URL}${request.params ? '/' + request.params : ''}${
      request.query ? '?' + request.query : ''
    }`,
    request.payload
  );
}
