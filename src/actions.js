/*
 * action types
 */

export const CLICK_SQUARE = "CLICK_SQUARE";
export const JUMP_TO_PAST = "JUMP_TO_PAST";

/*
 * action creators
 */

export function clickSquare(index) {
  return { type: CLICK_SQUARE, index };
}

export function jumpToPast(step) {
  return { type: JUMP_TO_PAST, step };
}
