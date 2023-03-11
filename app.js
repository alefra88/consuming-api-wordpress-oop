// const d = document,
//   $site = d.getElementById("site"),
//   $posts = d.getElementById("posts"),
//   $loader = d.querySelector(".loader"),
//   $template = d.getElementById("post-template"),
//   $fragment = d.createDocumentFragment(),
//   DOMAIN = "https://malvestida.com",
//   SITE = `${DOMAIN}/wp-json`,
//   API_WP = `${SITE}/wp/v2`,
//   POSTS = `${API_WP}/posts`,
//   PAGES = `${API_WP}/pages`,
//   CATEGORIES = `${API_WP}/categories`;

// function getSiteData() {
//   fetch(SITE)
//     .then((res) => (res.ok ? res.json() : Promise.reject(res)))
//     .then((json) => {
//       console.log(json);
//     })
//     .catch((err) => {
//       console.log(err);
//       let message = err.statusText || "Ocurrió un error";
//       $site.innerHTML = `<p>Error${err.status}:${message}</p>`;
//     });
// }

// function getPosts() {
//   fetch(POSTS)
//     .then((res) => (res.ok ? res.json() : Promise.reject(res)))
//     .then((json) => {
//       console.log(json);
//     })
//     .catch((err) => {
//       console.log(err);
//       let message = err.statusText || "Ocurrió un error";
//       $posts.innerHTML = `<p>Error${err.status}:${message}</p>`;
//       $loader.style.display = "none";
//     });
// }

// d.addEventListener("DOMContentLoaded", (e) => {
//   getSiteData();
//   getPosts();
// });

//POO
//clase con los atributos
class Site {
  constructor() {
    this.DOMAIN = "https://malvestida.com";
    this.SITE = `${this.DOMAIN}/wp-json`;
    this.API_WP = `${this.SITE}/wp/v2`;
    this.POSTS = `${this.API_WP}/posts`;
    this.PAGES = `${this.API_WP}/pages`;
    this.CATEGORIES = `${this.API_WP}/categories`;
    this.$site = document.getElementById("site");
    this.$posts = document.getElementById("posts");
    this.$loader = document.querySelector(".loader");
    this.$template = document.getElementById("post-template");
    this.$fragment = document.createDocumentFragment();
  }
  /**
  Inicializa la aplicación al escuchar el evento DOMContentLoaded y llama a los métodos getSiteData() y getPosts().
 
  Inicializa la aplicación al escuchar el evento DOMContentLoaded y llama a los métodos getSiteData() y getPosts().

 */

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.getSiteData();
      this.getPosts();
    });
  }

  getSiteData() {
    fetch(this.SITE)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        this.$site.innerHTML = `
        <h3>Consumo de API Wordpress</h3>
        <h2>
        <a href="${json.url}" target="_blank">${json.name}</a>
        </h2>
        <p>${json.description}</p>
        <p>${json.timezone_string}</p>
        `;
      })
      .catch((err) => {
        console.log(err);
        let message = err.statusText || "Ocurrió un error";
        this.$site.innerHTML = `<p>Error${err.status}:${message}</p>`;
      });
  }

  getPosts() {
    fetch(this.POSTS)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
        let message = err.statusText || "Ocurrió un error";
        this.$posts.innerHTML = `<p>Error${err.status}:${message}</p>`;
        this.$loader.style.display = "none";
      });
  }
}

const mySite = new Site();
mySite.init();
