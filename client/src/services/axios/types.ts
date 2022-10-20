import { CoursesRoutes } from './dataServices/CoursesDataService';
import { UserRoutes } from './dataServices/UserDataService';
/**
 * HTTP methods
 */
export type VERBS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
/**
 * User routes are defined in the dataServices/UserDataService.ts file
 * and are used to define the routes for the user data service
 * @param  verb - The HTTP verb to use for the request
 */
export type UserRoutesType<VERB extends VERBS> =
  typeof UserRoutes[VERB][keyof Partial<typeof UserRoutes[VERB]>];
export type CoursesRoutesType<VERB extends VERBS> =
  typeof CoursesRoutes[VERB][keyof Partial<typeof CoursesRoutes[VERB]>];

/**
 * All GET routes that are available for the  data service
 */
export type GETRoutesType = UserRoutesType<'GET'> | CoursesRoutesType<'GET'>;
/**
 * All POST routes that are available for the  data service
 */
export type POSTRoutesType = UserRoutesType<'POST'>;
/**
 * All PUT routes that are available for the  data service
 */
export type PUTRoutesType = UserRoutesType<'PUT'>;
export type PATCHRoutesType = UserRoutesType<'PATCH'>;
export type DELETERoutesType = UserRoutesType<'DELETE'>;
