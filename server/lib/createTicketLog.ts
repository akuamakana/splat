import { getRepository } from 'typeorm';
import { Ticket } from '../entities/Ticket';
import { TicketHistory } from '../entities/TicketHistory';

export default async (originalTicket: Ticket, updatedTicket: Ticket) => {
  const ticketHistoryRepository = getRepository(TicketHistory);
  let logs: TicketHistory[] = [];
  for (const [key, value] of Object.entries(originalTicket)) {
    if (value !== updatedTicket[key as keyof Ticket] && key !== 'updated_at') {
      const log = new TicketHistory();
      log.type = `update ${key}`;
      log.field = key;
      log.old = value ? (value as string) : 'n/a';
      log.new = updatedTicket[key as keyof Ticket].toString();
      log.ticket = originalTicket;
      logs.push(log);
    }
  }
  await ticketHistoryRepository.save(logs);
};
