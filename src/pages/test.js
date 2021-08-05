import React from 'react'

export const Test = () => {
  const data = [
    {
      ref: '305733349951930948',
      slug: '/posts/2020/10/storybook-an-alternative-approach/',
      reaction: 'cool',
      date: '2021-08-01T11:40:51.666Z',
    },
    {
      ref: '305734707902939717',
      slug: '/posts/2021/07/gatsby-slow-local-build-times/',
      reaction: 'happy',
      date: '2021-08-01T11:40:51.666Z',
    },
    {
      ref: '305735809611334211',
      slug: '/posts/2021/07/gatsby-source-nodes/',
      reaction: 'cool',
      date: '2021-08-01T11:40:51.666Z',
    },
    {
      ref: '305801784981455428',
      slug: '/posts/2021/best-bits-2021/',
      reaction: 'cool',
      date: '2021-08-01T11:40:51.666Z',
    },
    {
      ref: '305812890945847875',
      slug: '/posts/2021/best-bits-2021/',
      reaction: 'tongue',
      date: '2021-08-02T11:45:49.177Z',
    },
    {
      ref: '305812943375696451',
      slug: '/posts/2021/07/gatsby-create-schema-customization/',
      reaction: 'happy',
      date: '2021-08-02T11:46:39.593Z',
    },
    {
      ref: '305812955514012227',
      slug: '/posts/2021/07/gatsby-source-nodes/',
      reaction: 'cool',
      date: '2021-08-02T11:46:50.990Z',
    },
    {
      ref: '305812976937468483',
      slug: '/posts/2020/08/react-hooks-and-matter-js/',
      reaction: 'cool',
      date: '2021-08-02T11:47:11.330Z',
    },
    {
      ref: '305813189073830468',
      slug: '/posts/2020/08/react-hooks-and-matter-js/',
      reaction: 'cool',
      date: '2021-08-02T11:50:33.907Z',
    },
    {
      ref: '305813446914474565',
      slug: '/posts/2020/08/react-hooks-and-matter-js/',
      reaction: 'happy',
      date: '2021-08-02T11:54:39.767Z',
    },
    {
      ref: '305813485215810115',
      slug: '/posts/2021/07/gatsby-slow-local-build-times/',
      reaction: 'happy',
      date: '2021-08-02T11:55:16.127Z',
    },
    {
      ref: '305815857586504260',
      slug: '/posts/2021/02/theme-ui-alpha-6/',
      reaction: 'happy',
      date: '2021-08-02T12:32:58.419Z',
    },
    {
      ref: '305832094013063749',
      slug: '/posts/2020/08/styled-components-style-objects/',
      reaction: 'happy',
      date: '2021-08-02T16:51:02.722Z',
    },
    {
      ref: '305928715327504965',
      slug: '/posts/2021/best-bits-2021/',
      reaction: 'happy',
      date: '2021-08-03T18:26:47.735Z',
    },
    {
      ref: '305928849700422211',
      slug: '/posts/2021/best-bits-2021/',
      reaction: 'happy',
      date: '2021-08-03T18:28:55.795Z',
    },
    {
      ref: '305928914938626627',
      slug: '/posts/2021/best-bits-2021/',
      reaction: 'cool',
      date: '2021-08-03T18:29:56.865Z',
    },
    {
      ref: '305976256451576388',
      slug: '/posts/2021/07/gatsby-slow-local-build-times/',
      reaction: 'happy',
      date: '2021-08-04T07:02:26.920Z',
    },
  ].reduce((items, item) => {
    const { slug, reaction } = item

    // const includes = items.map((data) => data.slug).includes(slug)

    if (items.map((data) => data.slug).includes(slug)) {
    } else {
      items.push({ slug, reaction })
    }

    return items
  }, [])

  console.log(data)

  //   const out = [
  //     {
  //       slug: '/posts/slug-name',
  //       reactions: [
  //         {
  //           name: 'cool',
  //           count: 10,
  //         },
  //         {
  //           name: 'happy',
  //           count: 2,
  //         },
  //         {
  //           name: 'tounge',
  //           count: 4,
  //         },
  //       ],
  //     },
  //   ]

  return <div>Test</div>
}
