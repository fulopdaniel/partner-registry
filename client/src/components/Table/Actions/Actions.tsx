import React, { useState } from "react";
import css from "./Actions.module.scss";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import { CompanyType, Partner, City } from "../../../shared/types";
import EditForm from "../../EditForm/EditForm";
import { deleteExistingPartner } from "../../../shared/dbUtil";

interface ActionsProps {
  updatePartner: (partner: Partner) => any;
  addNewCompanyType: (partner: CompanyType) => any;
  addNewCity: (partner: City) => any;
  deletePartner: (partner_id: number) => any;
  cities: City[];
  companyTypes: CompanyType[];
  partner: Partner;
}

const Actions: React.FC<ActionsProps> = ({
  partner,
  cities,
  companyTypes,
  addNewCity,
  addNewCompanyType,
  updatePartner,
  deletePartner,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteExistingPartner({ partner_id: partner.partner_id });
      deletePartner(partner.partner_id);
      message.success("Successfully deleted");
    } catch (e) {
      message.error("An error occured");
    }
  };

  return (
    <div className={css.wrapper}>
      <Button onClick={() => setIsOpen(true)} icon={<EditOutlined />} />
      <Popconfirm
        onConfirm={handleDelete}
        title="Are you sure？"
        okText="Yes"
        cancelText="No"
      >
        <Button danger icon={<DeleteOutlined />} />
      </Popconfirm>
      <EditForm
        cities={cities}
        companyTypes={companyTypes}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addNewCity={addNewCity}
        updatePartner={updatePartner}
        addNewCompanyType={addNewCompanyType}
        initialValues={partner}
      />
    </div>
  );
};

export default Actions;
