class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  };

  getMovies = () => {
    return fetch(this._baseUrl, {}).then(this._getResponseData);
  };
}

const config = {
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
};

const moviesApi = new MoviesApi(config);

export default moviesApi;
