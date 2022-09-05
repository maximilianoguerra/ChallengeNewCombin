import axios from "axios";

const URL_MEMBERS = "http://localhost:8081/api/members";

export const getToken = async (username:string,password:string) => {
  const auth = {
    username,
    password
  };

  const resp = await axios
    .post("http://localhost:8081/auth", auth)
    .then((response) => {
      return response;
    })
    .catch((reason) => {
      return reason;
    });
  if (resp?.status === 200) {
    return resp.data.token;
  } else {
    return "";
  }
};
export const getUsers = async (token: string) => {
  const bearer_token = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: bearer_token,
    },
  };
  const resp = await axios
    .get(URL_MEMBERS, config)
    .then((response) => {
      return response;
    })
    .catch((reason) => {
      return reason;
    });
  return resp.data;
};

export const saveUser = async (token: string, data: any) => {
    try {
        const bearer_token = `Bearer ${token}`;
        const config = {
          headers: {
            Authorization: bearer_token,
          },
        };
        const resp = await axios
          .post(URL_MEMBERS,data, config)
          .then((response) => response)
          .catch((reason) => reason);
          console.log(resp);
          return resp.status 
    } catch (error) {
        console.log(error);
        return 400;
    }

};
