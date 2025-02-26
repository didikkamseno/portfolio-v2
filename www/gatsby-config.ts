import { GatsbyConfig } from "gatsby"
import path from "path"
import { slugifyOptions } from "../packages/utils"
import { site } from "./src/constants/meta"

require(`dotenv`).config()

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const gatsbyConfig: GatsbyConfig = {
  siteMetadata: {
    siteTitle: site.title,
    siteTitleDefault: site.titleDefault,
    siteUrl: site.url,
    siteDescription: site.description,
    siteImage: site.image,
    twitter: site.twitter,
  },
  trailingSlash: `never`,
  plugins: [
    `gatsby-theme-core`,
    `gatsby-plugin-vanilla-extract`,
    `gatsby-plugin-image`,
    // Overwrite the default "slugify" option
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.resolve(`src/pages`),
        slugify: slugifyOptions,
        ignore: {
          patterns: [`**/*.css.ts`],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: site.titleDefault,
        short_name: site.title,
        description: site.description,
        start_url: `/`,
        background_color: `#0f172a`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
        excludes: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
          `/privacy-policy`,
          `/legal-notice`,
        ],
        query: `#graphql
        {
          posts: allPost(filter: { published: { eq: true } } ) {
            nodes {
              path: slug
              lastmod: lastUpdated
            }
          }
          garden: allGarden {
            nodes {
              lastmod: lastUpdated
              path: slug
            }
          }
          other: allSitePage(filter: { pluginCreator: { name: { ne: "default-site-plugin" } } } ) {
            nodes {
              path
            }
          }
        }
        `,
        resolveSiteUrl: () => site.url,
        resolvePages: ({ posts, garden, other }) => [].concat(posts.nodes, garden.nodes, other.nodes),
        serialize: ({ path: pagePath, lastmod }) => ({
          url: pagePath,
          lastmod,
        }),
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `#graphql
        {
          site {
            siteMetadata {
              title: siteTitleDefault
              description: siteDescription
              siteUrl
              site_url: siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            query: `#graphql
            {
              allPost(filter: { published: { eq: true } }, sort: { fields: date, order: DESC } ) {
                nodes {
                  title
                  date
                  description
                  slug
                }
              }
            }
            `,
            serialize: ({ query: { site: s, allPost } }) =>
              allPost.nodes.map((node) => {
                const url = `${s.siteMetadata.siteUrl}${node.slug}`
                const content = `<p>${node.description}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`

                return {
                  title: node.title,
                  url,
                  guid: url,
                  date: node.date,
                  description: node.description,
                  custom_elements: [{ "content:encoded": content }],
                }
              }),
            output: `/rss.xml`,
            title: site.titleDefault,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {},
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-perf-budgets`,
      options: {},
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {},
    },
  ].filter(Boolean),
}

export default gatsbyConfig
