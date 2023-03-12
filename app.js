const d = document,
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
  fetch(POSTS)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      json.forEach((el) => {
        let $clone = $template.content.cloneNode(true);
        $clone.querySelector(".post-image").src =
          el._embedded["wp:featuredmedia"][0].source_url;
        $clone.querySelector(".post-image").alt = el.title.rendered;
        $clone.querySelector(".post-title").innerHTML = el.title.rendered;
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
//     if (!this.$posts) return;
//     fetch(this.POSTS)
//       .then((res) => (res.ok ? res.json() : Promise.reject(res)))
//       .then((json) => {
//         console.log(json);
//         json.forEach((el) => {
//           let $template = this.$template.cloneNode(true);
//           $template.querySelector(".post-title").innerHTML = el.title.rendered;
//           let $clone = document.importNode($template.content, true);
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
