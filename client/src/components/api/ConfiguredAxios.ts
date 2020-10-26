import axios from "axios";
import config from "./config";

const ConfiguredAxios = axios.create(config);

export default ConfiguredAxios;
