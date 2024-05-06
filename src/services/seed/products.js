require("dotenv").config();

const HASURA_ENDPOINT = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET;

const execute = async (query, variables = {}) => {
  const response = await fetch(HASURA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Error executing query");
  }

  return data;
};

const seed = async () => {
  const CREATE_PRODUCTS = `
  mutation CreateProducts {
    product1: insert_products_one(object: {name: "George Hendrik Breitner",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/tue9jbk3tnfrrpbnbhpl.webp", reviews: "4", description: "The Singel Bridge at the Paleisstraat in Amsterdam"}) {
    id
    }
    product2: insert_products_one(object: {name: "Hendrick Avercamp",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/o27yiv0bwmmyipha9yhq.webp", reviews: "4", description: "Winter Landscape with Ice Skaters"}) {
    id
    }
    product3: insert_products_one(object: {name: "Jan Asselijn",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/bl1rmzaisc0qg1dvwzyr.webp", reviews: "4", description: "The Threatened Swan"}) {
    id
    }
    product4: insert_products_one(object: {name: "George Hendrik Breitner",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/acnzqgrqy8fw5ezup2mp.webp", reviews: "4", description: "Girl in a White Kimono"}) {
    id
    }
    product5: insert_products_one(object: {name: "Gerard ter Borch (II)",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/rjt33sfhbxf28lausn4a.webp", reviews: "4", description: "Gallant Conversation, Known as ‘The Paternal Admonition’"}) {
    id
    }
    product6: insert_products_one(object: {name: "Willem van de Velde (I)",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/bmppkqjkkphyqqvqi5hy.webp", reviews: "4", description: "The Battle of Terheide"}) {
    id
    }
    product7: insert_products_one(object: {name: "Johannes Cornelisz. Verspronck",  price: 19.99, image: "undefined", reviews: "4", description: "Portrait of a Girl Dressed in Blue"}) {
    id
    }
    product8: insert_products_one(object: {name: "Johannes Vermeer",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996045/art-store/esxsgufq2tzoajn7ie7z.webp", reviews: "4", description: "View of Houses in Delft, Known as ‘The Little Street’"}) {
    id
    }
    product9: insert_products_one(object: {name: "Jan Both",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/wpqusx6rkmetpkp242fg.webp", reviews: "4", description: "Italian Landscape with a Draughtsman"}) {
    id
    }
    product10: insert_products_one(object: {name: "Johannes Vermeer",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/hegvfqa3xv9xxcl7tmr0.webp", reviews: "4", description: "The Milkmaid"}) {
    id
    }
    product11: insert_products_one(object: {name: "Hans Bollongier",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/zq4vybdebpttlvp8hjbb.webp", reviews: "4", description: "Floral Still Life"}) {
    id
    }
    product12: insert_products_one(object: {name: "Johannes Vermeer",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/v02jb4stczkhdacrfrq2.webp", reviews: "4", description: "Woman Reading a Letter"}) {
    id
    }
    product13: insert_products_one(object: {name: "Jan Havicksz. Steen",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996045/art-store/fuwsbfbhc9jt3owaok2m.webp", reviews: "4", description: "The Merry Family"}) {
    id
    }
    product14: insert_products_one(object: {name: "Pieter de Hooch",  price: 19.99, image: "undefined", reviews: "4", description: "A Mother Delousing her Child’s Hair, Known as ‘A Mother’s Duty’"}) {
    id
    }
    product15: insert_products_one(object: {name: "Rembrandt van Rijn",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/jt3yyj8zbu63qdyheih6.webp", reviews: "4", description: "The Sampling Officials of the Amsterdam Drapers’ Guild, Known as ‘The Syndics’"}) {
    id
    }
    product16: insert_products_one(object: {name: "Melchior d'Hondecoeter",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/fz0n6lyvdzfh7mul64vg.webp", reviews: "4", description: "A Pelican and other Birds near a Pool, Known as ‘The Floating Feather’"}) {
    id
    }
    product17: insert_products_one(object: {name: "Rembrandt van Rijn",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/kv7sqxrkklgklavlktti.webp", reviews: "4", description: "Self-portrait"}) {
    id
    }
    product18: insert_products_one(object: {name: "Gabriël Metsu",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/t6t85qpkwwkaglw4uxrf.webp", reviews: "4", description: "The Sick Child"}) {
    id
    }
    product19: insert_products_one(object: {name: "Cornelis Troost",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/myrpcswwkhfcr2spyz4k.webp", reviews: "4", description: "Portrait of a Member of the Van der Mersch Family"}) {
    id
    }
    product20: insert_products_one(object: {name: "Floris Claesz van Dijck",  price: 19.99, image: "https://res.cloudinary.com/dgcfd6vjx/image/upload/v1714996044/art-store/cplctunmo3xeqrameq7u.webp", reviews: "4", description: "Still Life with Cheese"}) {
    id
    }
    }
  `;

  const result = await execute(CREATE_PRODUCTS);

  console.log(`Seeded products: ${JSON.stringify(result)}`);
};

(async () => {
  const fetch = await import("node-fetch").then((module) => module.default);
  seed(fetch).catch(`Error seeding products: ${console.error}`);
})();
