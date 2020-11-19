/**
 * Traveler Info state contract defination
 *
 * @export
 * @interface IReviewAndPayState
 */
export interface IReviewAndPayState {
  billingInfo: object;
  billingAddress: object;
  loading: boolean;
  binValidation: object;
}

/**
 * Initial Traveller Info state defination.
 *
 * @export
 */
export const initialReviewAndPayState: IReviewAndPayState = {
  billingInfo: null,
  billingAddress: null,
  loading: true,
  binValidation: null
};
