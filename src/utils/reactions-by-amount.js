export const reactionsByAmount = (array) => {
  const result = array
    .map((item) => {
      const { slug, reaction } = item

      return {
        reaction: reaction,
        slug: slug,
        count: 1,
      }
    })
    .reduce((items, item) => {
      const { slug, reaction } = item

      items[reaction] = items[reaction] || { icon: reaction, posts: [] }
      if (item.reaction === reaction) {
        items[reaction].posts.push(item)
      }
      return items
    }, {})

  return Object.values(result)
    .map((post) => {
      const { icon, posts } = post

      return {
        icon: icon,
        posts: posts
          .reduce((items, item) => {
            const { slug, reactions } = item

            const existingItem = items.find((index) => index.slug === slug)

            if (existingItem) {
              existingItem.count += 1
            } else {
              items.push(item)
            }

            return items
          }, [])
          .sort((a, b) => b.count - a.count),
      }
    })
    .reduce((items, item) => {
      const { icon } = item

      items[icon] = items[icon] || []
      items[icon].push(...item.posts)

      return items
    }, {})
}
