import "./index.css";
import { BASE_URL } from "./services/userService";
import Cookies from "universal-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";

const cookies = new Cookies();

const auth_token = cookies.get("auth_token");

const data = jwtDecode(cookies.get("auth_token"));
await axios
  .get(`${BASE_URL}/users/${data.user_id}`, {
    headers: {
      Authorization: `Bearer ${cookies.get("auth_token")}`,
    },
  })
  .then((res) => setUser(res.data))
  .catch((err) => console.log(err));
