class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _request(endPoint, options) {
    return fetch(this._baseUrl + endPoint, options).then(this._getResponseData);
  }

  _getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  };

  _getToken = () => `Bearer ${localStorage.getItem("token")}`;

  updateUser = ({email, name}) => {
    return this._request("/users/me", {
        method: "PATCH",   
        headers: {
            "Content-Type": "application/json",
            authorization: this._getToken(),
        },
        body: JSON.stringify({
          email: email,
          name: name,
        }),
    })
  }
}

const config = {
  baseUrl: "https://api.kinofilms.nomoredomainsrocks.ru",
};

const mainApi = new MainApi(config);

export default mainApi;
