const { google } = require('googleapis')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

const YOUTUBE = 'youTube'
const MAX_RESULTS = process.env.NODE_ENV === 'development' ? 5 : 50

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type youTube implements Node {
      image: File @link(from: "fields.image")
    }
  `)
}

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest }) => {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY_SERVER,
  })

  const playlistItemsResponse = await youtube.playlistItems.list({
    playlistId: 'PL9W-8hhRoLoN7axEFJQ17rJvk2KTiM2GP',
    part: 'snippet',
    maxResults: MAX_RESULTS,
    order: 'date',
    type: 'video',
  })

  const ids = playlistItemsResponse.data.items.map((video) => video.snippet.resourceId.videoId)

  const videosResponse = await youtube.videos.list({
    id: ids.join(','),
    part: 'snippet,liveStreamingDetails',
  })

  videosResponse.data.items.forEach((video) => {
    createNode({
      ...video,
      id: video.id,
      internal: {
        type: YOUTUBE,
        contentDigest: createContentDigest(video),
      },
    })
  })
}

exports.onCreateNode = async ({
  node,
  actions: { createNodeField, createNode },
  createContentDigest,
  createNodeId,
  cache,
  store,
  reporter,
}) => {
  if (node.internal.type === YOUTUBE) {
    const imageNode = await createRemoteFileNode({
      url: node.snippet.thumbnails.maxres.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
      reporter,
    })

    if (imageNode) {
      createNodeField({ node, name: 'image', value: imageNode.id })
    }
  }
}
