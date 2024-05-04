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
    product1: insert_products_one(object: {name: "The Singel Bridge at the Paleisstraat in Amsterdam",  price: 19.99, image: "https://lh3.googleusercontent.com/Bawo7r1nPZV6sJ4OHZJHdKV_4Ky59vquAR7KoUXcNZgx9fqTaOW-QaOM9qoyYhOTAopzjt9OIfW06RMwa-9eJW9KjQw=s0", description: "The Singel Bridge at the Paleisstraat in Amsterdam, George Hendrik Breitner, 1898"}) {
    id
    }
    product2: insert_products_one(object: {name: "Winter Landscape with Ice Skaters",  price: 19.99, image: "https://lh3.googleusercontent.com/1pTfYJlLwVTifKj4PlsWPyAg4PcIVBAiVvB8sameSnmm7HRd056abNUIRq33rgry7u9t-ju-eHOnbfqQpK4q_8IwzIXZ4WgrqZW9l7U=s0", description: "Winter Landscape with Ice Skaters, Hendrick Avercamp, c. 1608"}) {
    id
    }
    product3: insert_products_one(object: {name: "The Threatened Swan",  price: 19.99, image: "https://lh3.googleusercontent.com/tm1DbZrAP0uBM-OJhLwvKir1Le5LglRF_bvbaNi6m-F_pIyttsWQz040soRY9pWA9PgNEYFA_fBkg_keYixRXCAjz9Q=s0", description: "The Threatened Swan, Jan Asselijn, c. 1650"}) {
    id
    }
    product4: insert_products_one(object: {name: "Girl in a White Kimono",  price: 19.99, image: "https://lh3.googleusercontent.com/0bgOiMrBM2GuhW_pNeQW711GuB3kD7Gq7AILGHaJGeWKa1Fu1hUJGpOjvSpiP_XpgRlC4jVmH0Z1233PEPMJTfNRR7Q=s0", description: "Girl in a White Kimono, George Hendrik Breitner, 1894"}) {
    id
    }
    product5: insert_products_one(object: {name: "Gallant Conversation, Known as ‘The Paternal Admonition’",  price: 19.99, image: "https://lh3.googleusercontent.com/FNNTrTASiUR0f49UVUY5bisIM-3RlAbf_AmktgnU_4ou1ZG0juh3pMT1-xpQmtN1R8At4Gq9B4ioSSi4TVrgbCZsmtY=s0", description: "Gallant Conversation, Known as ‘The Paternal Admonition’, Gerard ter Borch (II), c. 1654"}) {
    id
    }
    product6: insert_products_one(object: {name: "The Battle of Terheide",  price: 19.99, image: "https://lh5.ggpht.com/NNwpBd1GteTy1QVYsJH64dJh_eb8pORRD5AtB2tfrYRvvFlM5-07MakQOYmYo3h6-09spXyHfJZbjv6ODhPJiStHjQ=s0", description: "The Battle of Terheide, Willem van de Velde (I), 1657"}) {
    id
    }
    product7: insert_products_one(object: {name: "Portrait of a Girl Dressed in Blue",  price: 19.99, image: "https://lh3.googleusercontent.com/XOEEpiJxvnbvetJvG7wbpPL9trO3nAAJuPztTOFxS2jtpHgqIkRGFfFJgkkS00bLCs6Ezkg0qRMOMZUMnBP3mbmQ-rJh_gFiffSIhyWX=s0", description: "Portrait of a Girl Dressed in Blue, Johannes Cornelisz. Verspronck, 1641"}) {
    id
    }
    product8: insert_products_one(object: {name: "View of Houses in Delft, Known as ‘The Little Street’",  price: 19.99, image: "https://lh3.googleusercontent.com/N-coqwrkCI2zYd6nTtGEpLPwB4nOKJVxcXmCCKg0WrcEp4gDj44NdWZy_DoI5yPrWzTX7qZQrc9I1UlB-zBdMNrZWLYh4A1FtX1eimZ5=s0", description: "View of Houses in Delft, Known as ‘The Little Street’, Johannes Vermeer, c. 1658"}) {
    id
    }
    product9: insert_products_one(object: {name: "Italian Landscape with a Draughtsman",  price: 19.99, image: "https://lh3.googleusercontent.com/KA2hIo0BlMDmyQDEC3ixvp9WHgcyJnlAvWtVcZmExh9ocPoZdQGRJh7bZjE2Mx2OGC0Zi3QGHGP0LlmuFgRlIYs36Sgn5G2OD-0MaTo=s0", description: "Italian Landscape with a Draughtsman, Jan Both, c. 1650 - 1652"}) {
    id
    }
    product10: insert_products_one(object: {name: "The Milkmaid",  price: 19.99, image: "https://lh3.googleusercontent.com/cRtF3WdYfRQEraAcQz8dWDJOq3XsRX-h244rOw6zwkHtxy7NHjJOany7u4I2EG_uMAfNwBLHkFyLMENzpmfBTSYXIH_F=s0", description: "The Milkmaid, Johannes Vermeer, c. 1660"}) {
    id
    }
    product11: insert_products_one(object: {name: "Floral Still Life",  price: 19.99, image: "https://lh3.googleusercontent.com/nAGClUPzsX6AlHMMhWo0Wa3vEN7OlG6T4TmdlsHzeZigky3Gv6_TLhF4GakOfGYtW_GCHBQOwc92hpmaS_MrtK4FTeRYOnpib05HnvQENA=s0", description: "Floral Still Life, Hans Bollongier, 1639"}) {
    id
    }
    product12: insert_products_one(object: {name: "Woman Reading a Letter",  price: 19.99, image: "https://lh3.googleusercontent.com/cgJpNZ47yAU-Ttf6SF4vdBBxAiiZW_w_-DsA1Xchet3eDJN-8EyoA24xgNR9Wl1fTLwGAhENkTkMZu1qULcXOQdgF2K1qDbdWSwic1POVg=s0", description: "Woman Reading a Letter, Johannes Vermeer, c. 1663"}) {
    id
    }
    product13: insert_products_one(object: {name: "The Merry Family",  price: 19.99, image: "https://lh3.googleusercontent.com/7JF0tll1eAfY8XgFHJ6Iq_e1xux4xgcT8_LxMfVbZdRMC5CX5KsXLH1DLlMEfuTfKX8kehtmhJyzJSBFEBDPFmeB6Y8=s0", description: "The Merry Family, Jan Havicksz. Steen, 1668"}) {
    id
    }
    product14: insert_products_one(object: {name: "A Mother Delousing her Child’s Hair, Known as ‘A Mother’s Duty’",  price: 19.99, image: "https://lh3.googleusercontent.com/6Vm9nYrTeeYe5wl7lOafEHUnbzNF8KJw3ZbV_cNBr_wQTyHyp1DJxEWEEK3OSuji9XGYx04r15HTVPu850WeFcOd0ZVv=s0", description: "A Mother Delousing her Child’s Hair, Known as ‘A Mother’s Duty’, Pieter de Hooch, c. 1660 - c. 1661"}) {
    id
    }
    product15: insert_products_one(object: {name: "The Sampling Officials of the Amsterdam Drapers’ Guild, Known as ‘The Syndics’",  price: 19.99, image: "https://lh3.googleusercontent.com/gShVRyvLLbwVB8jeIPghCXgr96wxTHaM4zqfmxIWRsUpMhMn38PwuUU13o1mXQzLMt5HFqX761u8Tgo4L_JG1XLATvw=s0", description: "The Sampling Officials of the Amsterdam Drapers’ Guild, Known as ‘The Syndics’, Rembrandt van Rijn, 1662"}) {
    id
    }
    product16: insert_products_one(object: {name: "A Pelican and other Birds near a Pool, Known as ‘The Floating Feather’",  price: 19.99, image: "https://lh3.googleusercontent.com/3UIOtn2DLhEC4W92V0_pIdChloiYyzpXvehK0BYaM3NHJR5zWhcA7uXlcNX_mCAt9xBh3gaHo3pDuriYzYm3uEDbeUEr=s0", description: "A Pelican and other Birds near a Pool, Known as ‘The Floating Feather’, Melchior d'Hondecoeter, c. 1680"}) {
    id
    }
    product17: insert_products_one(object: {name: "Self-portrait",  price: 19.99, image: "https://lh3.googleusercontent.com/7qzT0pbclLB7y3fdS1GxzMnV7m3gD3gWnhlquhFaJSn6gNOvMmTUAX3wVlTzhMXIs8kM9IH8AsjHNVTs8em3XQI6uMY=s0", description: "Self-portrait, Rembrandt van Rijn, c. 1628"}) {
    id
    }
    product18: insert_products_one(object: {name: "The Sick Child",  price: 19.99, image: "https://lh3.googleusercontent.com/SCp0xV3Rwxh3ipnuSnbEQR_uGrHlsvHXlLD-5kVSjAE7WPWiribDB77_LcJETu4EydCC_jMuhsgjz4maHzY_t-xeiw=s0", description: "The Sick Child, Gabriël Metsu, c. 1664 - c. 1666"}) {
    id
    }
    product19: insert_products_one(object: {name: "Portrait of a Member of the Van der Mersch Family",  price: 19.99, image: "https://lh5.ggpht.com/5cC5A43gL66dAluLm3_Mp0NiZ7v6BZxwnD--37cz3fvjV087nF1NvkOjnlWs5KqnvgVtd1pcR-JcqkTCk8YKhWr_W3j8=s0", description: "Portrait of a Member of the Van der Mersch Family, Cornelis Troost, 1736"}) {
    id
    }
    product20: insert_products_one(object: {name: "Still Life with Cheese",  price: 19.99, image: "https://lh3.googleusercontent.com/O6IfrxhVOGXdcw9-nOkenQqx3svNJtgJFjF_tON1HG_ASu1Uy6IAwOzH7MIOJ3jVBnAZhqyTlw0N1CIILKjtuv0aLLGwvZH3XbSD9pk4=s0", description: "Still Life with Cheese, Floris Claesz van Dijck, c. 1615"}) {
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
