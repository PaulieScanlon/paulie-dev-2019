import React from "react"
import { format } from "date-fns"
import { Box, Badge, Link, Card, Image, Heading, Text } from "theme-ui"
import { mix } from "@theme-ui/color"

export const PostCard = ({
  title,
  featuredImageUrl,
  tags,
  date,
  dateModified,
  excerpt,
  slug,
  pinned,
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
          <Box sx={{ minHeight: "1px" }}>
            {featuredImageUrl && <Image src={featuredImageUrl} />}
          </Box>
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              p: 3,
            }}
          >
            <Heading
              as="h3"
              variant="styles.h3"
              sx={{ color: "text", mt: 3, span: { mr: 2 } }}
            >
              {pinned ? (
                <span role="img" aria-labelledby="A silver paper clip">
                  📎
                </span>
              ) : null}
              {title}
            </Heading>
            <Text sx={{ mb: 1, color: "success" }}>
              {format(new Date(dateModified ? dateModified : date), "d-MMM-u")}
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
              View post
            </Text>
          </Box>
        </Card>
      </Link>
    </Box>
  )
}
