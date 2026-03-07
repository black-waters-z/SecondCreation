export type FormValue = any;

export interface FormBaseType {
  type: 'text' | 'textarea' | 'number' | 'password' | 'email' | 'date' | 'time' | 'datetime' | 'select' | 'radio' | 'checkbox' | 'file' | 'button';
  name: string;
  value: FormValue;
  placeholder: string;
}
