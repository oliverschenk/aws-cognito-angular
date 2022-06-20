export interface NotificationState {
  show: boolean;
  message: string;
  colour: string;
}

export interface PageState {
  loading: boolean;

  notification: NotificationState;
}
