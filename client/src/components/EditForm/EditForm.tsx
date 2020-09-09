import React, { useState } from "react";
import css from "./EditForm.module.scss";
import { Button, Modal, Form, Input, Select, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useForm } from "antd/lib/form/Form";
import {
  Partner,
  CompanyType,
  City,
  NewPartnerPayload,
} from "../../shared/types";
import {
  postNewPartner,
  postNewCity,
  postNewCompanyType,
  updateExistingPartner,
} from "../../shared/dbUtil";

const { Option } = Select;

interface EditFormProps {
  isOpen: boolean;
  setIsOpen: (x: any) => any;
  addNewPartner?: (partner: Partner) => any;
  updatePartner?: (partner: Partner) => any;
  initialValues?: any;
  addNewCompanyType: (partner: CompanyType) => any;
  addNewCity: (partner: City) => any;
  cities: City[];
  companyTypes: CompanyType[];
}

const EditForm: React.FC<EditFormProps> = ({
  addNewCity,
  addNewCompanyType,
  addNewPartner,
  isOpen,
  setIsOpen,
  cities,
  companyTypes,
  initialValues,
  updatePartner,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();
  const [newCity, setNewCity] = useState("");
  const [newCompanyType, setNewCompanyType] = useState("");

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);
      if (addNewPartner) {
        const insertedPartner = await postNewPartner(
          values as NewPartnerPayload
        );
        addNewPartner(insertedPartner);
      } else if (updatePartner) {
        const updatedPartner = await updateExistingPartner({
          ...values,
          partner_id: initialValues.partner_id,
        } as Partner);
        updatePartner(updatedPartner);
      }

      setIsLoading(false);
      setIsOpen(false);
      message.success("Successful insert!");
    } catch (errorInfo) {
      message.error("An error occured");
    }
  };

  const handleCityAdd = async () => {
    try {
      if (newCity) {
        const insertedCity = await postNewCity({ city_name: newCity });
        message.success("New city added!");
        addNewCity(insertedCity);
      }
    } catch (error) {
      message.error("An error occured");
    }
  };

  const handleCompanyTypeAdd = async () => {
    try {
      if (newCompanyType) {
        const insertedCompanyType = await postNewCompanyType({
          company_type: newCompanyType,
        });
        message.success("New company type added!");
        addNewCompanyType(insertedCompanyType);
      }
    } catch (error) {
      message.error("An error occured");
    }
  };

  return (
    <Modal
      title="Add new partner"
      visible={isOpen}
      onOk={handleSubmit}
      confirmLoading={isLoading}
      onCancel={() => setIsOpen(false)}
      forceRender
    >
      <Form initialValues={initialValues} layout="vertical" form={form}>
        <Form.Item
          name="name"
          label="Name"
          required
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input placeholder="Enter your address" />
        </Form.Item>
        <Form.Item name="tax_number" label="Tax number">
          <Input placeholder="Enter your tax number" />
        </Form.Item>
        <Form.Item name="registration_number" label="Registration number">
          <Input placeholder="Enter your reg. number" />
        </Form.Item>
        <Form.Item name="phone_number" label="Phone number">
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item name="comments" label="Comments">
          <TextArea placeholder="Enter your reg. number" />
        </Form.Item>
        <Form.Item
          name="city_id"
          label="City"
          required
          rules={[
            {
              required: true,
              message: "City is required",
            },
          ]}
        >
          <Select allowClear placeholder="Please select a city">
            {cities.map((city) => (
              <Option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className={css.addNewOption}>
          <Input
            placeholder="Enter new city if not on the list"
            onChange={(event) => setNewCity(event.target.value)}
          />
          <Button type="primary" onClick={handleCityAdd}>
            Add
          </Button>
        </div>
        <Form.Item name="company_type_id" label="Company type">
          <Select allowClear placeholder="Please select a company type">
            {companyTypes.map((type) => (
              <Option key={type.company_type_id} value={type.company_type_id}>
                {type.company_type}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className={css.addNewOption}>
          <Input
            placeholder="Enter new company type if not on the list"
            onChange={(event) => setNewCompanyType(event.target.value)}
          />
          <Button type="primary" onClick={handleCompanyTypeAdd}>
            Add
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditForm;
