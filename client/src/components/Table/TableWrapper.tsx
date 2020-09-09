import React, { useState, useEffect } from "react";
import css from "./TableWrapper.module.scss";
import {
  fetchAllPartners,
  fetchAllCities,
  fetchAllCompanyTypes,
} from "../../shared/dbUtil";
import { Table } from "antd";
import { columnMetaData } from "./TableWrapper.const";
import { Partner, CompanyType, City } from "../../shared/types";
import Actions from "./Actions/Actions";
import AddNewWrapper from "./AddNewWrapper/AddNewWrapper";

const TableWrapper: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);

  useEffect(() => {
    fetchPartners();
    fetchCities();
    fetchCompanyTypes();
  }, []);

  const fetchPartners = async () => {
    const partners = await fetchAllPartners();
    setPartners(partners);
  };

  const fetchCities = async () => {
    const cities = await fetchAllCities();
    setCities(cities);
  };

  const fetchCompanyTypes = async () => {
    const companyTypes = await fetchAllCompanyTypes();
    setCompanyTypes(companyTypes);
  };

  const addNewPartner = (partner: Partner) => {
    setPartners([...partners, partner]);
  };

  const addNewCompanyType = (companyType: CompanyType) => {
    setCompanyTypes([...companyTypes, companyType]);
  };

  const addNewCity = (city: City) => {
    setCities([...cities, city]);
  };

  const updatePartner = (partner: Partner) => {
    const index = partners.findIndex(
      (p) => p.partner_id === partner.partner_id
    );
    const newPartners = [...partners];
    newPartners[index] = partner;
    setPartners(newPartners);
  };

  const deletePartner = (partner_id: number) => {
    const index = partners.findIndex((p) => p.partner_id === partner_id);
    const newPartners = [...partners];
    newPartners.splice(index, 1);
    setPartners(newPartners);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <div className={css.addNewWrapper}>
          <AddNewWrapper
            addNewPartner={addNewPartner}
            addNewCity={addNewCity}
            addNewCompanyType={addNewCompanyType}
            cities={cities}
            companyTypes={companyTypes}
          />
        </div>
      </div>
      <div className={css.tableWrapper}>
        <Table
          pagination={false}
          size="small"
          bordered
          rowKey={(i) => i.partner_id}
          dataSource={partners}
          columns={[
            ...columnMetaData,
            {
              title: "Actions",
              key: "actions",
              render: (val, rec, index) => (
                <Actions
                  cities={cities}
                  companyTypes={companyTypes}
                  addNewCity={addNewCity}
                  addNewCompanyType={addNewCompanyType}
                  updatePartner={updatePartner}
                  deletePartner={deletePartner}
                  partner={partners[index]}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TableWrapper;
