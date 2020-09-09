import axios from "axios";
import {
  NewPartnerPayload,
  NewCityPayload,
  NewCompanyTypePayload,
  Partner,
  DeletePartnerPayload,
} from "./types";

export const fetchAllPartners = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/partner`
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const fetchAllCities = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/city`
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const fetchAllCompanyTypes = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/company_type`
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const postNewPartner = async (partner: NewPartnerPayload) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/partner`,
      partner
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const updateExistingPartner = async (partner: Partner) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/partner`,
      partner
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const deleteExistingPartner = async (
  partner_id: DeletePartnerPayload
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/partner/delete`,
      partner_id
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const postNewCity = async (city: NewCityPayload) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/city`,
      city
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const postNewCompanyType = async (
  companyType: NewCompanyTypePayload
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/company_type`,
      companyType
    );
    return data;
  } catch (e) {
    throw e;
  }
};
