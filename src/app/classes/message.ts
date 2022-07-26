import { Status } from './enum/status';

export class Message {
  message: string = '';
  status: Status = Status.MESSAGE_NOSTATE;
}
