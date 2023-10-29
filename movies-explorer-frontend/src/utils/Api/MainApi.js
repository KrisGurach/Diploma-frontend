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

  getSavedMovies = () => {
    return this._request("/movies", {
      method: "GET",
      headers: {
        authorization: this._getToken(),
      }
    })
  };

  saveMovie = (movie) => {
    return this._request("/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: this._getToken(),
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
    })
  }
}

const config = {
  baseUrl: "https://api.kinofilms.nomoredomainsrocks.ru",
};

const mainApi = new MainApi(config);

export default mainApi;
