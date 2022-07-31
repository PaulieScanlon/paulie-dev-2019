const path = require('path');
const { createFilePath, createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createSchemaCustomization = async ({ actions: { createTypes } }) => {
  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
      featuredImage: File @link(from: "fields.featuredImage")
      embeddedImages: [File] @link(from: "fields.embeddedImages")
      logo: File @link(from: "fields.logo")
    }
    type Frontmatter @dontInfer {
      type: String
        title: String
        name: String
        icon: String
        tags: [String]
        url: String
        date: String
        dateModified: String
        author: String
        show: String
        role: String
        publication: String
        status: String
        isPrivate: Boolean
        pinned: Boolean
        logo: String
        featuredImage: String
        embeddedImages: [String]
    }
  `);

  // Logs out all typeDefs
  // actions.printTypeDefinitions({ path: './typeDefs.txt' })
};

exports.sourceNodes = ({ actions: { createNode }, createNodeId, createContentDigest }) => {
  const packageJson = require('./package.json');

  createNode({
    ...packageJson,
    id: createNodeId(packageJson.version),
    internal: {
      type: 'packageJson',
      contentDigest: createContentDigest(packageJson)
    }
  });
};

exports.onCreateNode = async ({
  node,
  actions: { createNodeField, createNode },
  getNode,
  store,
  cache,
  createNodeId
}) => {
  if (node.internal.type === 'Mdx' || node.internal.type === 'PagesJson') {
    const path = createFilePath({ node, getNode });

    await createNodeField({
      node,
      name: 'slug',
      value: node.frontmatter.type === 'page' ? path : `/${node.frontmatter.type}s${path}`
    });
  }

  if (node.internal.type === 'Mdx') {
    if (node.frontmatter.featuredImage) {
      let featuredImage = await createRemoteFileNode({
        url: node.frontmatter.featuredImage,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        store
      });
      if (featuredImage) {
        createNodeField({ node, name: 'featuredImage', value: featuredImage.id });
      }
    }

    if (node.frontmatter.embeddedImages) {
      let embeddedImages = await Promise.all(
        node.frontmatter.embeddedImages.map((url) => {
          return createRemoteFileNode({
            url,
            parentNodeId: node.id,
            createNode,
            createNodeId,
            cache,
            store
          });
        })
      );
      if (embeddedImages) {
        createNodeField({
          node,
          name: 'embeddedImages',
          value: embeddedImages.map((embeddedImage) => {
            return embeddedImage.id;
          })
        });
      }
    }

    if (node.frontmatter.logo) {
      let logo = await createRemoteFileNode({
        url: node.frontmatter.logo,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        store
      });
      if (logo) {
        createNodeField({ node, name: 'logo', value: logo.id });
      }
    }
  }
};

exports.createPages = async ({ graphql, actions: { createPage, createRedirect } }) => {
  const {
    data: { allMdx }
  } = await graphql(`
    query {
      allMdx(filter: { frontmatter: { status: { ne: "draft" } } }) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            type
          }
        }
      }
    }
  `);

  allMdx.nodes.forEach((node) => {
    const {
      id,
      fields: { slug },
      frontmatter: { type }
    } = node;

    createPage({
      path: slug,
      component: path.join(__dirname, `src/templates/${type}.js`),
      context: {
        id: id
      },
      defer: type !== 'post' ? true : false
    });
  });

  createRedirect({
    fromPath: '/writing/*',
    toPath: '/articles/*'
  });
};
