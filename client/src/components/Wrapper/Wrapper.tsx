import React from "react";
import css from "./Wrapper.module.scss";
import TableWrapper from "../Table/TableWrapper";

const Wrapper: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <TableWrapper />
    </div>
  );
};

export default Wrapper;
