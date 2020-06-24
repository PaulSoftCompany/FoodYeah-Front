import { Customer } from './customer';

export class Card {
	id: number;
	cardNumber: number;
	cardType: boolean;
	cardCvi: number;
	cardExpireDate: string;
	customer: Customer;
	cardMoney: number
	state: string;
}
