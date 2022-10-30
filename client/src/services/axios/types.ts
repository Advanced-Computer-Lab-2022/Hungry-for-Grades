
import { CategoryRoute } from './dataServices/CategoryDataService';
import { CoursesRoutes } from './dataServices/CoursesDataService';
import { UserRoutes } from './dataServices/UserDataService';

import {AdminRoutes} from './dataServices/AdminDataService';
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

export type CategoryRouteType = typeof CategoryRoute['GET'][keyof Partial<
  typeof CategoryRoute['GET']
>];

export type AdminRoutesType = typeof AdminRoutes['POST'][keyof Partial<
  typeof AdminRoutes['POST']
>];


export type CoursesRoutesType = typeof CoursesRoutes['GET'][keyof Partial<
  typeof CoursesRoutes['GET']
>];

/**
 * All GET routes that are available for the  data service
 */
export type GETRoutesType =
  | UserRoutesType<'GET'>
  | CategoryRouteType
  | CoursesRoutesType;
/**
 * All POST routes that are available for the  data service
 */
export type POSTRoutesType = UserRoutesType<'POST'> | AdminRoutesType;
/**
 * All PUT routes that are available for the  data service
 */
export type PUTRoutesType = UserRoutesType<'PUT'>;
export type PATCHRoutesType = UserRoutesType<'PATCH'>;
export type DELETERoutesType = UserRoutesType<'DELETE'>;


