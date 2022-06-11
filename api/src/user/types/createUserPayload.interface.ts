export interface CreateUserPayloadInterface {
  email: string;
  name: string;
  surname: string;
  secondName: string;
  password: string;
  phone: string;
  roles?: string[];
  image?: string[];
}
