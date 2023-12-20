export const dummyList = [
  { warehouse: "Seattle", warehouseCode: "WARE2542", id: 1 },
  { warehouse: "Abdul", warehouseCode: "WARE1234", id: 2 },
  { warehouse: "Rohan", warehouseCode: "WARE1235", id: 3 },
  { warehouse: "Abdul", warehouseCode: "WARE1236", id: 4 },
  { warehouse: "Sandeep", warehouseCode: "WARE1237", id: 5 },
];

export const searchWarehouseInputs = [
  {
    name: "warehouseCode",
    label: "Warehouse Code",
    value: "",
    selected: false,
  },
  {
    name: "warehouseName",
    label: "Warehouse Name",
    value: "",
    selected: false,
  },
];

export const errorFieldsMock = {
  mobileUsername: {
    isError: false,
    isTouched: false,
  },
  fusionUsername: {
    isError: false,
    isTouched: false,
  },
  printer: {
    isError: false,
    isTouched: false,
  },
  password: {
    isError: false,
    isTouched: false,
  },
  email: {
    isError: false,
    isTouched: false,
  },
};
