export interface DialogData<T> {
  title?: string;
  value?: T;
}

export interface ConfirmationDialogData extends DialogData<string> {
  confirmButton?: ConfirmationButton;
  cancelButton?: ConfirmationButton;
}

export interface ConfirmationButton {
  label?: string;
  color?: 'primary' | 'accent' | 'warn';
}
