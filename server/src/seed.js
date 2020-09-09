const createTables = [
  `
CREATE TABLE "company_type" (
	"company_type_id"	INTEGER NOT NULL,
	"company_type"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("company_type_id" AUTOINCREMENT)
)`,
  `CREATE TABLE "city" (
	"city_id"	INTEGER NOT NULL,
	"city_name"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("city_id" AUTOINCREMENT)
)`,
  `CREATE TABLE "partner" (
	"partner_id"	INTEGER NOT NULL,
	"tax_number"	TEXT,
	"registration_number"	TEXT,
	"address"	TEXT,
	"phone_number"	TEXT,
	"comments"	TEXT,
	"name"	TEXT NOT NULL,
	"company_type_id"	INTEGER,
	"city_id"	INTEGER,
	FOREIGN KEY("city_id") REFERENCES "city"("id"),
	FOREIGN KEY("company_type_id") REFERENCES "company_type"("id"),
	PRIMARY KEY("partner_id" AUTOINCREMENT)
)`,
];

const createCompanyTypes = `INSERT INTO company_type ("company_type") VALUES ${[
  "KFT",
  "RT",
  "BT",
  "ZRT",
  "EV",
]
  .map((type) => `("${type}")`)
  .join(",")};`;

const createCities = `INSERT INTO city ("city_name") VALUES ${[
  "New York",
  "Budapest",
  "Oslo",
  "Helsinki",
  "Tokyo",
]
  .map((name) => `("${name}")`)
  .join(",")};`;

const mockPartners = [];

for (let i = 0; i < 10; i++) {
  mockPartners.push({
    tax_number: "123-456-78" + i,
    registration_number: "#12345" + i,
    address: `Test str. ${i + 1}.`,
    phone_number: "+3620123456" + i,
    comments: i % 2 === 0 ? "I left a comment" : "",
    name: "Company #" + i,
    company_type_id: (i % 5) + 1,
    city_id: (i % 5) + 1,
  });
}

const createPartners = `INSERT INTO partner 
("tax_number", "registration_number", "address", "phone_number", "comments", "name", "company_type_id", "city_id") 
VALUES ${mockPartners
  .map(
    (partner) =>
      `("${partner.tax_number}","${partner.registration_number}","${partner.address}","${partner.phone_number}","${partner.comments}","${partner.name}","${partner.company_type_id}","${partner.city_id}")`
  )
  .join(",")}`;

module.exports = {
  createTables,
  createCompanyTypes,
  createCities,
  createPartners,
};
