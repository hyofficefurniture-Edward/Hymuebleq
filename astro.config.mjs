import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://hymueble.com",
  output: "static",
  redirects: {
    "/catalogo/hoteleria/": {
      status: 301,
      destination: "/catalogo/hoteles/",
    },
    "/catalogo/hoteleria/habitaciones/": {
      status: 301,
      destination: "/catalogo/hoteles/habitaciones/",
    },
    "/catalogo/hoteleria/muebles-de-bano/": {
      status: 301,
      destination: "/catalogo/hoteles/muebles-de-bano/",
    },
    "/catalogo/hoteleria/muebles-exteriores/": {
      status: 301,
      destination: "/catalogo/hoteles/muebles-exteriores/",
    },
    "/catalogo/hoteleria/muebles-para-bar/": {
      status: 301,
      destination: "/catalogo/hoteles/muebles-para-bar/",
    },
    "/catalogo/hoteleria/muebles-para-restaurante/": {
      status: 301,
      destination: "/catalogo/hoteles/muebles-para-restaurante/",
    },
    "/catalogo/hoteleria/mobiliario-para-conferencias/": {
      status: 301,
      destination: "/catalogo/hoteles/mobiliario-para-conferencias/",
    },
    "/proyectos/hoteleria/": {
      status: 301,
      destination: "/proyectos/hoteles/",
    },
    "/proyectos/hoteleria/grand-kempinski-hotel/": {
      status: 301,
      destination: "/proyectos/hoteles/grand-kempinski-hotel/",
    },
    "/proyectos/hoteleria/hilton-doubletree-hotel/": {
      status: 301,
      destination: "/proyectos/hoteles/hilton-doubletree-hotel/",
    },
    "/proyectos/hoteleria/raffles-hotel/": {
      status: 301,
      destination: "/proyectos/hoteles/raffles-hotel/",
    },
  },
});
