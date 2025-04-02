import { TypeEnum } from '../interfaces/opportunity';

export const OpportunityTypes = {
  TENDER: {
    name: 'Licitación',
    code: TypeEnum.tender,
    color: 'red',
  },
  AGILE: {
    name: 'Compra ágil',
    code: TypeEnum.agile,
    color: 'blue',
  },
};
