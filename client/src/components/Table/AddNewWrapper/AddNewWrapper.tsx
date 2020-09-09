import React, { useState } from "react";
import css from "./AddNewWrapper.module.scss";
import { Button } from "antd";
import { CompanyType, City, Partner } from "../../../shared/types";

import EditForm from "../../EditForm/EditForm";

interface AddNewWrapperProps {
  cities: City[];
  companyTypes: CompanyType[];
  addNewPartner: (partner: Partner) => any;
  addNewCompanyType: (partner: CompanyType) => any;
  addNewCity: (partner: City) => any;
}

const AddNewWrapper: React.FC<AddNewWrapperProps> = ({
  cities,
  companyTypes,
  addNewPartner,
  addNewCompanyType,
  addNewCity,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.wrapper}>
      <Button onClick={() => setIsOpen(true)} type="primary">
        Add new partner
      </Button>
      <EditForm
        cities={cities}
        companyTypes={companyTypes}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addNewCity={addNewCity}
        addNewPartner={addNewPartner}
        addNewCompanyType={addNewCompanyType}
      />
    </div>
  );
};

export default AddNewWrapper;
