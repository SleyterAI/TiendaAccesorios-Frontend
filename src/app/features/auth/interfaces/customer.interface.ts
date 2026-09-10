export interface Customer {
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  card: CardRequest;
}


export interface CustomerRequest {
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  card: CardRequest;
}

export interface CardRequest {
  cardNumber: string;
  expirationDate: string;
}

export interface CustomerResponse{
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  card: CardRequest;
}
