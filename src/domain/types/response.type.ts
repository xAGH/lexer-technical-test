export class ResponseType {

  status: boolean;
  message: string;
  data: any;

  constructor(status: boolean, data: any, message: string) {
      this.status = status;
      this.data = data;
      this.message = message;
  }
}
