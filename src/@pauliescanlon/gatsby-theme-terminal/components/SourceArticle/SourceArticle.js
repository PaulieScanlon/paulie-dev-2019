import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import {
  Heading,
  Badge,
  Text,
  Flex,
  Box,
  Link,
  Image,
  // Button,
  Divider,
  Alert,
} from "theme-ui"
import { mix } from "@theme-ui/color"
import { format } from "date-fns"
import Img from "gatsby-image"

// import { SvgBubbleSlider } from "react-svg-bubble-slider"

import { Main } from "@pauliescanlon/gatsby-theme-terminal/src/components/Main"

const formatDate = (date) => format(new Date(date), "d-MMM-u")

export const SourceArticle = ({
  title,
  tags,
  date,
  dateModified,
  author,
  isPrivate,
  featuredImage,
  featuredImageUrl,
  embedded,
  body,
  timeToRead,
  wordCount,
}) => {
  return (
    <Main>
      {title ? (
        <Fragment>
          {isPrivate && (
            <Fragment>
              <Alert variant="error">This is a private post</Alert>
              <Divider />
            </Fragment>
          )}
          <Box sx={{ mb: 4 }}>
            {featuredImage && featuredImage.childImageSharp && (
              <Img
                fluid={featuredImage.childImageSharp.fluid}
                alt={featuredImage.childImageSharp.fluid.originalName}
              />
            )}
            {featuredImageUrl && <Image src={featuredImageUrl} />}
          </Box>
          <Heading as="h1" variant="styles.h1" sx={{ mb: 4 }}>
            {title}
          </Heading>
          <Flex sx={{ flexWrap: "wrap" }}>
            <Box
              sx={{
                width: ["100%", "50%"],
              }}
            >
              {date && (
                <Text sx={{ color: "muted" }}>
                  Date published: {formatDate(date)}
                </Text>
              )}
            </Box>
            <Box
              sx={{
                width: ["100%", "50%"],
              }}
            >
              {dateModified && (
                <Text
                  sx={{
                    color: "muted",
                    textAlign: ["left", "right"],
                  }}
                >
                  Date modified: {formatDate(dateModified)}
                </Text>
              )}
            </Box>
          </Flex>

          <Flex sx={{ flexWrap: "wrap" }}>
            <Box
              sx={{
                width: ["100%", "50%"],
              }}
            >
              <Text
                sx={{ color: "muted" }}
              >{`${timeToRead} min read / ${wordCount.words} words`}</Text>
            </Box>
            {author && (
              <Box
                sx={{
                  width: ["100%", "50%"],
                }}
              >
                <Text sx={{ color: "muted", textAlign: ["left", "right"] }}>
                  Author: {author}
                </Text>
              </Box>
            )}
          </Flex>

          <Divider />
        </Fragment>
      ) : null}

      {tags &&
        tags.map((tag, index) => (
          <Badge
            key={index}
            variant="primary"
            sx={{
              mb: 2,
              mr: 2,
              color: mix("muted", "primary", `${index / tags.length}`),
              borderColor: mix("muted", "primary", `${index / tags.length}`),
            }}
          >
            {tag}
          </Badge>
        ))}

      <Divider />
      <MDXProvider>
        <MDXRenderer embedded={embedded}>{body}</MDXRenderer>
      </MDXProvider>

      {title ? (
        <Fragment>
          <Divider />
          <Divider />
          <Text>
            If you've enjoyed this post I'd love to hear from you:{" "}
            <Link href="https://twitter.com/PaulieScanlon" target="_blank">
              @PaulieScanlon
            </Link>
          </Text>
          <Divider />
          <Link href="https://ko-fi.com/P5P31B7G8" target="_blank">
            <Image src="https://www.ko-fi.com/img/githubbutton_sm.svg" />
          </Link>
        </Fragment>
      ) : null}

      {/* <Box
        sx={{
          ".speech-bubble-stroke": {
            stroke: "primary",
          },
          ".speech-bubble-fill": {
            fill: "text",
          },
          ".speech-bubble-text": {
            fill: "primary",
            fontSize: "22px",
            fontWeight: "bold",
            textTransform: "capitalize",
          },
          ".speech-bubble-pop-line": {
            stroke: "primary",
          },
          ".reaction-icon": {
            fill: "text",
          },
          ".reaction-dot": {
            fill: "primary",
          },
          ".svg-bubble-action": {
            height: "36px",
            textAlign: "center",
          },
        }}
      >
        <SvgBubbleSlider>
          {({ reaction }) =>
            reaction && (
              <Button
                sx={{
                  cursor: "pointer",
                  fontFamily: "body",
                  textTransform: "capitalize",
                  backgroundColor: "primary",
                }}
              >
                {reaction}
              </Button>
            )
          }
        </SvgBubbleSlider>
      </Box> */}
    </Main>
  )
}

SourceArticle.propTypes = {
  /** Title frommatter" */
  title: PropTypes.string,
  /** Tags from frontmatter */
  tags: PropTypes.arrayOf(PropTypes.string),
  /** Date from frontmatter */
  date: PropTypes.string,
  /** DateModified from frontmatter */
  dateModified: PropTypes.string,
  /** Author from frontmatter */
  author: PropTypes.string,
  /** isPrivate from frontMatter */
  isPrivate: PropTypes.bool,
  /** FeaturedImage from frontmatter */
  featuredImage: PropTypes.any,
  /** FeaturedImageUrl from frontmatter */
  featuredImageUrl: PropTypes.string,
  /** embeddedImage array from SourceLayout */
  embedded: PropTypes.any,
  /** body from SourceLayout */
  body: PropTypes.any,
  /** timeToRead from SourceLayout */
  timeToRead: PropTypes.number,
  /** wordCount from SourceLayout */
  wordCount: PropTypes.shape({
    words: PropTypes.number,
  }),
}
