export interface ITicketInput {
  title: string;
  description: string;
  status: 'open' | 'closed' | 'in progress';
  priority: 'low' | 'medium' | 'high';
  type: 'bugs/errors' | 'feature requests' | 'other' | 'training';
  project: string;
  assigned_user: string;
}
