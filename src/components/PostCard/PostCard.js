import React from "react"
import { format } from "date-fns"
import { Box, Badge, Link, Card, Heading, Text } from "@theme-ui/components"
import { mix } from "@theme-ui/color"
import Img from "gatsby-image"

export const PostCard = ({
  title,
  featuredImage,
  tags,
  date,
  excerpt,
  slug,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        mb: 3,
        maxWidth: ["100%", "100%", "50%", "50%"],
        width: ["100%", "100%", "50%", "50%"],
      }}
    >
      <Link
        href={slug}
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          m: (theme) => `0px ${theme.space[2]}px`,
          minHeight: "1px",
          textDecoration: "none",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            minHeight: "1px",
          }}
        >
          {featuredImage && featuredImage.childImageSharp && (
            <Box sx={{ minHeight: "1px" }}>
              <Img
                fluid={featuredImage.childImageSharp.fluid}
                alt={featuredImage.childImageSharp.fluid.originalName}
              />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              p: 3,
            }}
          >
            <Heading as="h3" variant="styles.h3" sx={{ color: "text", mt: 3 }}>
              {title}
            </Heading>
            <Text sx={{ mb: 1, color: "success" }}>
              {format(new Date(date), "d-MMM-u")}
            </Text>
            <Text sx={{ mb: 1, color: "text", wordBreak: "break-word" }}>
              {excerpt}
            </Text>
          </Box>
          <Box
            sx={{
              p: 3,
            }}
          >
            {tags.map((tag, index) => {
              return (
                <Badge
                  key={index}
                  variant="primary"
                  sx={{
                    mr: 2,
                    mb: 2,
                    color: mix("muted", "primary", `${index / tags.length}`),
                    borderColor: mix(
                      "muted",
                      "primary",
                      `${index / tags.length}`
                    ),
                  }}
                >
                  {tag}
                </Badge>
              )
            })}
          </Box>
          <Box sx={{ p: 3 }}>
            <Text sx={{ color: "secondary", textAlign: "right" }}>
              View Post
            </Text>
          </Box>
        </Card>
      </Link>
    </Box>
  )
}
