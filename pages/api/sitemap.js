import { SitemapStream, streamToPromise } from "sitemap";

export default async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://www.hosarne.no`,
      cacheTime: 600000,
    });

    // List of posts

    const post_slugs = [
      {
        url: "program",
        changefreq: "daily",
        priority: 0.9,
      },
      {
        url: "leiligheten",
        changefreq: "weekly",
        priority: 0.5,
      },
      {
        url: "galleriet",
        changefreq: "weekly",
        priority: 0.5,
      },
      {
        url: "in-house",
        changefreq: "weekly",
        priority: 0.5,
      },
      {
        url: "team",
        changefreq: "weekly",
        priority: 0.5,
      },
    ];

    // Create each URL row
    post_slugs.forEach((post) => {
      smStream.write(post);
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
};
