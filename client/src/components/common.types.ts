import { Dispatch, SetStateAction } from 'react';

// common types across components

/**
 * Button event type
 * @param  event - The event object
 */
export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

/**
 * Focus event type
 * @param  event - The event object
 */
export type FocusEvent = React.FocusEvent<HTMLButtonElement>;
/**
 * Input event type
 * @param  event - The event object
 */
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
/**
 * Set State type
 * @param  T - type
 */
export type SetStateType<T> = Dispatch<SetStateAction<T>>;
