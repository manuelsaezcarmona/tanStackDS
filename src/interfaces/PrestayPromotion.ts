export type IPrestayPromotion = {
  categoryCode?: string;
  categoryDescription: string;
  creationDate?: string;
  name?: string;
  conceptCode?: string;
  conceptDescription?: string;
  partnerCode?: number;
  partnerDescription?: string;
  periodFrom?: string | null;
  periodTo?: string | null;
  promotionCode?: string;
  points?: number;
  expiryDate?: string;
  useOfPointsCode?: string;
  useOfPointsDescription?: string;
  highlight?: boolean;
  stateCode?: string;
  stateDescription?: string;
  id?: number;
};