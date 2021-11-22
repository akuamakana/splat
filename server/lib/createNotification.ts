import { Notification } from '../entities/Notification';
import { Ticket } from '../entities/Ticket';
const createNotification = (message: string, ticket: Ticket, user: number): Notification[] => {
  const notifications: Notification[] = [];

  if (user !== ticket.assigned_user.id) {
    const notification = new Notification();
    notification.message = message;
    notification.ticket = ticket.id;
    notification.user = ticket?.assigned_user;
    notifications.push(notification);
  }

  if (user !== ticket.submitter.id) {
    const notification = new Notification();
    notification.message = message;
    notification.ticket = ticket.id;
    notification.user = ticket?.submitter;
    notifications.push(notification);
  }

  return notifications;
};

export default createNotification;
