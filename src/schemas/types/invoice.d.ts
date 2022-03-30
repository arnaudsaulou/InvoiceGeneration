/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Invoice {
  reference: string;
  date: string;
  paymentDelayInDays: number;
  customer: {
    name: string;
    address: {
      street: string;
      city: string;
      zipcode?: string;
      state?: string | null;
      country: string;
      additional?: string | null;
    };
    [k: string]: unknown;
  };
  biller: {
    phoneNumber?: string;
    email: string;
    invoiceLegalFooter: string;
    address: {
      street: string;
      city: string;
      zipcode?: string;
      state?: string | null;
      country: string;
      additional?: string | null;
    };
  };
  itemInvoices: {
    description?: string;
    quantity: number;
    unitPriceWithoutTax: number;
    taxPercent: number;
  }[];
}