module.exports = {
  siteMetadata: {
    title: "Gat Stats",
    description: "Data viz for blogs",
    keywords: ["GatsbyJs", "React", "theme-ui"],
    config: {
      sideBarWidth: 244,
    },
  },
  plugins: [
    {
      resolve: `@pauliescanlon/gatsby-theme-gatstats`,
    },
  ],
}
