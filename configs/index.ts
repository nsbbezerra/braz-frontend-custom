import axios from "axios";

const baseURL = "https://tshirt.nkinfo.com.br";

const api = axios.create({
  baseURL,
});

const configs = {
  phone: "5561999116450",
  companyName: "Braz Camiseteria - Uniformes, Abadás, Jalecos entre outros",
};

export { configs, api, baseURL };
