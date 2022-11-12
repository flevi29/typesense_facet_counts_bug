import { Client } from "typesense";

const client = new Client({
  nodes: [
    {
      host: "localhost",
      port: 8109,
      protocol: "http",
    },
  ],
  apiKey: "LgpWxVQUPctPHW9VScyTjPae8s94UB82",
});

const COLL_NAME = "coll";

await client
  .collections()
  .create({
    name: COLL_NAME,
    fields: [{
      name: "authors",
      type: "string[]",
      optional: false,
      facet: true,
    }],
  });

await client.collections(COLL_NAME).documents().create({
  authors: ["Szabó"],
});

const res = await client.collections(COLL_NAME).documents().search({
    q: "*",
    query_by: "authors",
    facet_by: "authors",
    facet_query: "authors:=Szabó",
});

console.log(res.facet_counts[0].counts[0]);
