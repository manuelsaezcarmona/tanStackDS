/* eslint-disable import/prefer-default-export */
import { Promotion } from './Promotion.tablemodel';

export const promotions: Promotion[] = [
  {
    state: 'Active',
    category: 'Card registration',
    creationdate: '01/01/2022',
    expirationdate: '01/02/2022',
    name: 'Redención Iberia plus',
    partner: '7770',
    concept: 'ACTIVA PAC',
    code: 'AA41',
    points: '10000',
  },
  {
    state: 'Active',
    category: 'Card registration',
    creationdate: '01/01/2022',
    expirationdate: '31/12/2022',
    name: 'Empleados Flat',
    partner: '8932',
    concept: 'ACTIVA PAC',
    code: 'AA41',
    points: '10000',
  },
  {
    state: 'Cancelled',
    category: 'Card registration',
    creationdate: '01/01/2022',
    expirationdate: '01/03/2022',
    name: 'Clientes LongTime',
    partner: '7770',
    concept: 'ACTIVA PAC',
    code: 'AA41',
    points: '10000',
  },
  {
    state: 'Active',
    category: 'Card registration',
    creationdate: '01/01/2022',
    expirationdate: '01/02/2022',
    name: 'Travel Agency',
    partner: '8932',
    concept: 'ACTIVA PAC',
    code: 'AA41',
    points: '10000',
  },
];
