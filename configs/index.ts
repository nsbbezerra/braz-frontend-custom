import axios from "axios";

const api = axios.create({
  baseURL: "https://tshirt.nkinfo.com.br",
});

const configs = {
  phone: "5561999116450",
  companyName: "Braz Camiseteria - Uniformes, Abadás, Jalecos entre outros",
};

export { configs, api };
