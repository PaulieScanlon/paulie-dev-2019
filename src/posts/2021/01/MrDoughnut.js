import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const excluded = ["Dummy", "Tags"]

export const MrDoughnut = () => {
  const tagData = useStaticQuery(graphql`
    query TagsQuery {
      allMdx(filter: { frontmatter: { tags: { ne: null } } }) {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)
    .allMdx.edges.reduce((items, item) => {
      const { tags } = item.node.frontmatter
      tags.map((tag) => items.push(tag))
      return items
    }, [])
    .reduce((items, item) => {
      const existingItem = items.find((index) => index.tag === item)

      if (existingItem) {
        existingItem.count += 1
      } else {
        items.push({
          tag: item,
          count: 1,
        })
      }

      return items
    }, [])
    .filter((item) => !excluded.includes(item.tag))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((item, index, array) => {
      const { count } = item
      const countTotal = array.reduce((a, b) => a + b.count, 0)
      const percentage = (count / countTotal) * 100
      const remainder = 100 - percentage
      return {
        ...item,
        percentage: percentage,
        remainder: remainder,
      }
    })

  const colors = ["#ff6090", "#3f51b5", "#00bcd4", "#8bc34a", "#ffc107"]

  return (
    <div
      style={{
        margin: "0 auto",
        width: 300,
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 40 40">
          {tagData.map((tag, index) => {
            const { percentage, remainder } = tag

            return (
              <circle
                key={index}
                cx="20"
                cy="20"
                r="15.91549430918954"
                strokeDasharray={`${percentage} ${remainder}`}
                strokeDashoffset={
                  100 -
                  tagData
                    .slice(0, index)
                    .reduce((a, b) => a + b.percentage, 0) +
                  25
                }
                strokeWidth="6"
                fill="transparent"
                stroke={colors[index]}
              />
            )
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              lineHeight: "14px",
            }}
          >
            Top 5 tags
          </div>
          <a
            href="https://paulie.dev"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#ff6090" }}
          >
            paulie.dev
          </a>
        </div>
      </div>
      <div>
        {tagData.map((item, index) => {
          const { tag, percentage } = item
          return (
            <div
              key={index}
              style={{
                alignItems: "center",
                display: "grid",
                gridTemplateColumns: "1fr auto",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "grid",
                  gridGap: 8,
                  gridTemplateColumns: "12px auto",
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "100%",
                    backgroundColor: colors[index],
                  }}
                />
                <div>{tag}</div>
              </div>
              <div>{`${Math.abs(percentage).toFixed(2)}%`}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
