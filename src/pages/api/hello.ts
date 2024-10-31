import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const items = {
    itemName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    sku: faker.string.uuid(),
    category: faker.helpers.arrayElement([
      "Mechanical",
      "Electrical",
      "Civil",
      "Software",
    ]),
    manufacturer: faker.company.name(),
    price: parseFloat(faker.commerce.price({ min: 100, max: 1000 })), // Random price between 5 and 500
    qtd: faker.number.int({ min: 0, max: 300 }),
    pos: faker.number.int({ min: 0, max: 8 }),
    specifications: {
      weight: faker.number.float({ min: 0.5, max: 100, fractionDigits: 2 }),
      dimensions: `${faker.number.int({
        min: 10,
        max: 100,
      })}x${faker.number.int({ min: 10, max: 100 })}x${faker.number.int({
        min: 10,
        max: 100,
      })} cm`,
      material: faker.helpers.arrayElement([
        "Steel",
        "Aluminum",
        "Plastic",
        "Composite",
      ]),
    },
  };
  res.status(200).json({ message: JSON.stringify(items) });
}
