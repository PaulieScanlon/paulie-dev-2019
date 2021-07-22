import React, { useState } from 'react'
import { Box, Grid, Input } from 'theme-ui'

import { SourceList } from '@pauliescanlon/gatsby-theme-terminal'
import { PostCard } from '../post-card'

import Fuse from 'fuse.js'
import { Fragment } from 'react'

export const PostsPage = () => {
  const [query, updateQuery] = useState('')

  const onSearch = (event) => {
    updateQuery(event.currentTarget.value)
  }

  return (
    <Box>
      <SourceList filter="posts">
        {(posts) => {
          const fuse = new Fuse(posts, {
            includeScore: true,
            keys: ['node.frontmatter.title', 'node.frontmatter.tags'],
            includeMatches: true,
            threshold: 0.4,
          })

          const results = fuse.search(query)

          const searchResults = query ? results.map((result) => result.item) : posts

          return (
            <Fragment>
              <Box
                sx={{
                  mb: 4,
                }}
              >
                <Input value={query} placeholder="Search" onChange={onSearch} />
              </Box>

              <Grid
                sx={{
                  gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
                }}
              >
                {searchResults
                  .filter((edge) => !edge.node.frontmatter.isPrivate)
                  .reduce((posts, post) => {
                    return post.node.frontmatter.pinned ? [post, ...posts] : [...posts, post]
                  }, [])
                  .map(({ node }, index) => {
                    const {
                      featuredImageUrl,
                      frontmatter: { title, tags, date, dateModified, pinned },
                      excerpt,
                      fields: { slug },
                    } = node

                    return (
                      <PostCard
                        key={index}
                        title={title}
                        featuredImageUrl={featuredImageUrl}
                        tags={tags}
                        date={date}
                        dateModified={dateModified}
                        excerpt={excerpt}
                        slug={slug}
                        pinned={pinned}
                      />
                    )
                  })}
              </Grid>
            </Fragment>
          )
        }}
      </SourceList>
    </Box>
  )
}
