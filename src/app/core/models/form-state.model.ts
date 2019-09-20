export interface FormState<T> {
  /**
   * The model to bind to the form
   */
  model: T;

  /**
   * path of the model.
   */
  path?: string;

  /**
   * Key value pair of errors
   */
  errors?: { [k: string]: string };

  /**
   * Whether the form is dirty or not.
   */
  dirty?: boolean;

  /**
   * The status of the form
   */
  status?: string;

  /**
   * True if form was submitter.
   */
  saved?: boolean;
}
