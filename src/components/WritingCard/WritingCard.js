import React from "react"
import { format } from "date-fns"
import {
  Box,
  Badge,
  Link,
  Card,
  Heading,
  Text,
  Divider,
} from "@theme-ui/components"
import { mix } from "@theme-ui/color"

export const WritingCard = ({ title, tags, date, excerpt, link }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        mb: 3,
        width: "100%",
      }}
    >
      <Link
        href={link}
        target="_blank"
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
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              p: 3,
            }}
          >
            <Text sx={{ mb: 1, color: "success" }}>
              {format(new Date(date), "d-MMM-u")}
            </Text>
            <Heading as="h3" variant="styles.h3" sx={{ color: "text" }}>
              {title}
            </Heading>
            <Text sx={{ color: "text", wordBreak: "break-word" }}>
              {excerpt}
            </Text>
            <Divider />
            <Text sx={{ color: "secondary" }}>{link}</Text>
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
        </Card>
      </Link>
    </Box>
  )
}
