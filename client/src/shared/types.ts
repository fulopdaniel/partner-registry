export interface Partner {
  partner_id: number;
  city_id: number;
  company_type_id?: number;
  tax_number?: string;
  registration_number?: string;
  phone_number?: string;
  address?: string;
  comments?: string;
  city_name: string;
  company_type?: string;
  name: string;
}

export interface CompanyType {
  company_type_id: number;
  company_type: string;
}

export interface City {
  city_id: number;
  city_name: string;
}

export interface NewPartnerPayload {
  city_id: number;
  company_type_id?: number;
  tax_number?: string;
  registration_number?: string;
  phone_number?: string;
  address?: string;
  comments?: string;
  name: string;
}

export interface DeletePartnerPayload {
  partner_id: number;
}

export interface NewCityPayload {
  city_name: string;
}

export interface NewCompanyTypePayload {
  company_type: string;
}
