export enum NotificationType {
    SUCCESS,
    ERROR,
    INFO,
}

export interface INotification {
    id: number,
    title: string,
    text: string,
    type: NotificationType,
}