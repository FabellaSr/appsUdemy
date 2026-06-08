import heroWorkshop from "@/assets/hero-workshop.jpg";
import ironwork from "@/assets/craft-ironwork.jpg";
import ceramics from "@/assets/craft-ceramics.jpg";
import carpentry from "@/assets/craft-carpentry.jpg";
import glass from "@/assets/craft-glass.jpg";

export type CollectionStatus = "publicada" | "borrador" | "pendiente_pago" | "pendiente_aprobacion" | "oculta";

export interface Collection {
  id: string;
  titulo: string;
  descripcion: string;
  status: CollectionStatus;
  cover: string;
  fotos: string[];
  fecha: string;
}

export interface Tallerista {
  slug: string;
  nombre: string;
  oficio: string;
  ubicacion: string;
  bio: string;
  contacto: { email: string; telefono?: string };
  destacada: string;
  colecciones: Collection[];
}

export const talleristas: Tallerista[] = [
  {
    slug: "tomas-herrera",
    nombre: "Tomás Herrera",
    oficio: "Herrería artística",
    ubicacion: "San Telmo, Buenos Aires",
    bio: "Tres generaciones forjando hierro a mano. Trabajo rejas, herrajes y mobiliario por encargo, con técnicas tradicionales y diseño contemporáneo.",
    contacto: { email: "tomas@manosdeoficio.test", telefono: "+54 11 5555-1010" },
    destacada: heroWorkshop,
    colecciones: [
      {
        id: "h1",
        titulo: "Rejas y portones 2024",
        descripcion: "Serie de portones forjados a mano para casas patrimoniales del barrio.",
        status: "publicada",
        cover: ironwork,
        fotos: [ironwork, heroWorkshop, ironwork, heroWorkshop],
        fecha: "Marzo 2024",
      },
      {
        id: "h2",
        titulo: "Mobiliario en hierro",
        descripcion: "Mesas, sillas y lámparas en hierro patinado.",
        status: "publicada",
        cover: heroWorkshop,
        fotos: [heroWorkshop, ironwork],
        fecha: "Septiembre 2024",
      },
    ],
  },
  {
    slug: "lucia-paredes",
    nombre: "Lucía Paredes",
    oficio: "Cerámica utilitaria",
    ubicacion: "Tilcara, Jujuy",
    bio: "Cerámica de alta temperatura inspirada en la paleta del norte argentino. Piezas únicas, esmaltes propios y barro de la zona.",
    contacto: { email: "lucia@manosdeoficio.test" },
    destacada: ceramics,
    colecciones: [
      {
        id: "c1",
        titulo: "Vajilla cotidiana",
        descripcion: "Tazas, cuencos y platos para uso diario, esmaltados a mano.",
        status: "publicada",
        cover: ceramics,
        fotos: [ceramics, ceramics, ceramics],
        fecha: "Mayo 2024",
      },
      {
        id: "c2",
        titulo: "Serie Quebrada",
        descripcion: "Piezas inspiradas en los colores de los cerros de Tilcara.",
        status: "publicada",
        cover: ceramics,
        fotos: [ceramics, ceramics],
        fecha: "Octubre 2024",
      },
    ],
  },
  {
    slug: "andres-monte",
    nombre: "Andrés Monte",
    oficio: "Carpintería de autor",
    ubicacion: "El Bolsón, Río Negro",
    bio: "Muebles de madera maciza con maderas locales: lenga, ñire, raulí. Uniones tradicionales, sin tornillos a la vista.",
    contacto: { email: "andres@manosdeoficio.test", telefono: "+54 294 444-2020" },
    destacada: carpentry,
    colecciones: [
      {
        id: "ca1",
        titulo: "Mesas de lenga",
        descripcion: "Mesas familiares en lenga con uniones de cola de milano.",
        status: "publicada",
        cover: carpentry,
        fotos: [carpentry, carpentry, carpentry],
        fecha: "Agosto 2024",
      },
    ],
  },
  {
    slug: "ines-vidal",
    nombre: "Inés Vidal",
    oficio: "Vidrio soplado",
    ubicacion: "Rosario, Santa Fe",
    bio: "Objetos en vidrio soplado a mano: vasos, copas, lámparas. Técnica veneciana adaptada al taller.",
    contacto: { email: "ines@manosdeoficio.test" },
    destacada: glass,
    colecciones: [
      {
        id: "v1",
        titulo: "Cristalería del taller",
        descripcion: "Serie de vasos y copas soplados, con burbujas controladas.",
        status: "publicada",
        cover: glass,
        fotos: [glass, glass, glass, glass],
        fecha: "Junio 2024",
      },
    ],
  },
];

export function getTallerista(slug: string) {
  return talleristas.find((t) => t.slug === slug);
}
