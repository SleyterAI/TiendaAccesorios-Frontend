
export interface Customer {
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  card: Card;
}

export interface Card {
  cardNumber: string;
  expirationDate: string;
}
