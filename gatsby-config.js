module.exports = {
  siteMetadata: {
    title: "Paul Scanlon",
    description:
      "I'm a React UI developer / UX Engineer (contract) based in Essex. React, GatsbyJs, JavaScript, TypeScript/Flow, StyledComponents, Storybook, TDD (Jest/Enzyme) and a tiny bit of Node.js.",
    keywords: [
      "React",
      "GatsbyJs",
      "JavaScript",
      "TypeScript",
      "Flow",
      "StyledComponents",
      "Jest",
      "Enzyme",
      "Node.js",
    ],
    config: {
      headerHeight: 64,
      sideBarWidth: 240,
      twitter: "pauliescanlon",
      github: "pauliescanlon",
    },
  },
  plugins: [
    {
      resolve: `@pauliescanlon/gatsby-theme-gatstats`,
    },
  ],
}
