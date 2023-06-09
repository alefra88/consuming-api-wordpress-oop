const d = document,
  w = window,
  $site = d.getElementById("site"),
  $posts = d.getElementById("posts"),
  $loader = d.querySelector(".loader"),
  $template = d.getElementById("post-template"),
  $fragment = d.createDocumentFragment(),
  DOMAIN = "https://malvestida.com",
  SITE = `${DOMAIN}/wp-json`,
  API_WP = `${SITE}/wp/v2`,
  POSTS = `${API_WP}/posts?_embed`,
  PAGES = `${API_WP}/pages`,
  CATEGORIES = `${API_WP}/categories`;
//variables para la paginacion infinita
let page = 1,
  perPage = 5;

function getSiteData() {
  fetch(SITE)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      $site.innerHTML = `
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
      $site.innerHTML = `<p>Error${err.status}:${message}</p>`;
    });
}

function getPosts() {
  $loader.style.display = "block";
  fetch(`${POSTS}&page=${page}&per_page=${perPage}`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);

      json.forEach((el) => {
        let categories = "",
          tags = "";
        el._embedded["wp:term"][0].forEach(
          (el) => (categories += `<li>${el.name}</li>`)
        );
        el._embedded["wp:term"][1].forEach(
          (el) => (tags += `<li>${el.name}</li>`)
        );

        let $clone = $template.content.cloneNode(true);
        $clone.querySelector(".post-title").innerHTML = el.title.rendered;
        $clone.querySelector(".post-image").src = el._embedded[
          "wp:featuredmedia"
        ]
          ? el._embedded["wp:featuredmedia"][0].source_url
          : "";
        $clone.querySelector(".post-image").alt = el.title.rendered;
        $clone.querySelector(".post-title").innerHTML = el.title.rendered;
        $clone.querySelector(".post-author").innerHTML = `
  <img src= "${el._embedded.author[0].avatar_urls?.["48"] || ""}" alt="${
          el._embedded.author[0].avatar_urls?.["48"] || ""
        }">
  <figcaption>${el._embedded.author[0].name}</figcaption>
`;
        $clone.querySelector(".post-date").innerHTML = new Date(
          el.date
        ).toLocaleDateString();
        $clone.querySelector(".post-link").href = el.link;
        $clone.querySelector(".post-excerpt").innerHTML =
          el.excerpt.rendered.replace("[&hellip;]", "...");

        $clone.querySelector(".post-categories").innerHTML = `
          <p>Categorias</p>
          <ul>${categories}</ul>
          `;
        $clone.querySelector(".post-tags").innerHTML = `
          <p>Etiquetas</p>
          <ul>${tags}</ul>
          `;
        $clone.querySelector(".post-content > article").innerHTML =
          el.content.rendered;
        $fragment.appendChild($clone);
      });

      $posts.appendChild($fragment);
      $loader.style.display = "none";
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "Ocurrió un error";
      $posts.innerHTML = `<p>Error${err.status}:${message}</p>`;
      $loader.style.display = "none";
    });
}

d.addEventListener("DOMContentLoaded", (e) => {
  getSiteData();
  getPosts();
});

//paginaciòn infinita
w.addEventListener("scroll", (e) => {
  const { scrollTop, clientHeight, scrollHeight } = d.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    console.log("Load more posts");
    page++;
    getPosts();
  }
});

//POO

// class Site {
//   constructor() {
//     this.DOMAIN = "https://malvestida.com";
//     this.SITE = `${this.DOMAIN}/wp-json`;
//     this.API_WP = `${this.SITE}/wp/v2`;
//     this.POSTS = `${this.API_WP}/posts`;
//     this.PAGES = `${this.API_WP}/pages`;
//     this.CATEGORIES = `${this.API_WP}/categories`;
//     this.$site = document.getElementById("site");
//     this.$posts = document.getElementById("posts");
//     this.$loader = document.querySelector(".loader");
//     this.$template = document.getElementById("post-template");
//     this.$fragment = document.createDocumentFragment();
//   }

//   init() {
//     document.addEventListener("DOMContentLoaded", () => {
//       this.getSiteData();
//       this.getPosts();
//     });
//   }

//   getSiteData() {
//     fetch(this.SITE)
//       .then((res) => (res.ok ? res.json() : Promise.reject(res)))
//       .then((json) => {
//         console.log(json);
//         this.$site.innerHTML = `
//         <h3>Consumo de API Wordpress</h3>
//         <h2>
//         <a href="${json.url}" target="_blank">${json.name}</a>
//         </h2>
//         <p>${json.description}</p>
//         <p>${json.timezone_string}</p>
//         `;
//       })
//       .catch((err) => {
//         console.log(err);
//         let message = err.statusText || "Ocurrió un error";
//         this.$site.innerHTML = `<p>Error${err.status}:${message}</p>`;
//       });
//   }

//   getPosts() {
//     this.$loader.style.display = "block";
//     fetch(this.POSTS)
//       .then((res) => (res.ok ? res.json() : Promise.reject(res)))
//       .then((json) => {
//         console.log(json);
//         json.forEach((el) => {
//           let $clone = this.$template.content.cloneNode(true);
//           $clone.querySelector(".post-image").src =
//             el._embedded["wp:featuredmedia"][0].source_url;
//           // clone.querySelector(".post-image").alt = el.title.rendered;
//           $clone.querySelector(".post-title").innerHTML = el.title.rendered;
//           this.$fragment.appendChild($clone);
//         });
//         // Insertar el fragmento completo después del bucle forEach
//         this.$posts.appendChild(this.$fragment);
//         this.$loader.style.display = "none";
//       })
//       .catch((err) => {
//         console.log(err);
//         let message = err.statusText || "Ocurrió un error";
//         this.$posts.innerHTML = `<p>Error${err.status}:${message}</p>`;
//         this.$loader.style.display = "none";
//       });
//   }
// }

// const mySite = new Site();
// mySite.init();
