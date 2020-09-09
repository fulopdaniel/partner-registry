const express = require("express");
const partnerRoutes = require("./partner/routes");
const companyTypeRoutes = require("./company_type/routes");
const cityRoutes = require("./city/routes");

const routes = express.Router();

routes.use("/partner", partnerRoutes);
routes.use("/company_type", companyTypeRoutes);
routes.use("/city", cityRoutes);

module.exports = routes;
