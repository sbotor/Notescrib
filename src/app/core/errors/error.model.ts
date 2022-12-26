export interface ErrorModel {
  code: string;
  message?: string;
}

export interface ValidationErrorModel {
  code: string;
  messages: string[];
}

export interface ErrorResponse {
  errors?: ErrorModel[];
  validationErrors?: ValidationErrorModel[];
}
