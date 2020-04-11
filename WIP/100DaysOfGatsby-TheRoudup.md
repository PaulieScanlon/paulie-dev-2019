### Intro

Well hey there! 👋 i'm Paul, i'm a React UI Developer / UX Engineer and a long long time ago i was a designer but after a few years of pixel pushing i realized code is just better!

### A little context

I first found Gatsby because of my requirement to create a new, public and **S**earch **E**ngine **O**ptimized web presence and i needed a [commercial portfolio](https://www.pauliescanlon.io/) and a [blog](https://paulie.dev/) which i wanted to look and feel the same. I also wanted a way to easily update both entities separately and didn't want to forgo poor SEO in favor of "content managed" third party fetched data and as a developer writing in markdown, committing and pushing updates is no big deal. Ideally i wanted to build these sites using React but always disliked the poor SEO performance using a framework like React produces.

After a little research i discovered that Gatsby is just React BUT it still maintains effective Search Engine Optimization by creating static HTML pages with real and actual Google indexable metadata and Open Graph images for each and every page or post!

**When the penny dropped it was an absolute hammer blow!**

With Gatsby you get back all that good stuff we kind of lost when "Websites" became "Single Page Applications" built with React.

When the [#100DaysOfGatsby](https://www.gatsbyjs.org/blog/tags/100-days-of-gatsby/) challenge was first announced i thought _"yes please"_ i'm totally up for getting involved, but it soon transpired that pretty much every challenge was something i'd already learnt myself. _"no matter"_ i thought, i can still continue to develop my React, JavaScript and Gatsby skills and by using the [hashtag](https://www.gatsbyjs.org/blog/tags/100-days-of-gatsby/) i hoped to share what i'd learnt and to find other folks out there doing the same.

For the past **100** days i've posted **every day** about the work i've been doing in and around the Gatsby eco-system and if you have a spare 103 minutes you can read about the full 100 days [here](https://paulie.dev/posts/2020/01/100DaysOfGatsby/).

For part of the last 100 days i was on a learning sabbatical and for 30 of those days i self drove a Tuk Tuk around Sri Lanka. The rest of the time i've been in the UK and for only some of that time was i working on commercial projects.

At the start of the challenge i thought i could just update the blog every once in a while but then i thought,

_No Paul, that's not good enough, write your entire life story!_

...and so here we go, here's everything i did over the 100 days but summarized because i know you're all busy busy people.

### Special mentions 💜

Before we dive in, special mentions have _got_ to go out to the following people.

[Scott Spence](https://twitter.com/spences10)
[Richard Haines](https://twitter.com/studio_hungry)
[Eric Howey](https://twitter.com/erchwy)
[Tom Hermans](https://twitter.com/tomhermans)
[Alex Luong](https://twitter.com/alex__luong)

These guys have regularly liked and re-tweeted my post(s) and i'm very thankful we've met through this challenge and i look forward to seeing what you build next!

...and finally here's a roundup of _everything_ i've done for the [#100DaysOfGatsby](https://www.gatsbyjs.org/blog/tags/100-days-of-gatsby/) challenge

<hr />
<hr />

skin-ui.jpg

<hr />

## 1. Skin UI

This is proof that Gatsby can be more than just blogs. Skin UI is a full stack Gatsby App with client only routes, Netlify Identity, an Apollo/GraphQL serverless function api and Fauna for database storage.

Using the Skin UI editor and live preview you can tinker with Theme UI's theme object and see the styles update the markdown and Theme UI Components right in your browser. You can also save, share, edit and download your theme.

I believe this project has legs, but i do need to do a bit more work on it before it's all singing and all dancing. I have it on good authority that something similar will make it's way in to [Blocks UI](https://blocks-ui.com/)... i just hope Gatsby hire me to help build it 😊

<hr />

[Visit Site](https://www.skin-ui.com/) |
[GitHub](https://github.com/PaulieScanlon/skin-ui) |
[Blog post](https://paulie.dev/posts/2020/04/skin-ui/)

<hr />

gatsby-theme-terminal.jpg

<hr />

## 2. gatsby-theme-terminal

This was my second attempt at developing a theme and after making a bit of a mess of my first one [gatsby-theme-gatstats](https://gatsby-theme-gatstats.netlify.com/) i went back to the drawing board and decided to see if it was possible to write a theme with **zero components**. This is an odd concept if you're coming form WordPress but with this theme all i'm providing are some neat little data components that help you query the nodes from GraphQL and a very light skin that styles all markdown and all components provided by Theme UI Components. If you've read above about Skin UI this theme is essentially Skin UI but with some extra bits thrown in.

Having worked on themes for about a year now i think this approach to themes can be really powerful. Component Shadowing is awesome don't get me wrong but if you decouple the "components" from a theme and just provide _data_ and _styles_ the user then has full control over their UI. No more hacking over the top of CSS and no real need to shadow a "component" to change the way it looks or functions. This approach means you can just build anything you want using the components from Theme UI and boom, 💥 you've got yourself a very custom blog, site or application.

<hr />

[View Demo](https://gatsby-theme-terminal.netlify.com/) |
[GitHub](https://github.com/PaulieScanlon/gatsby-theme-terminal) |
[Blog post](https://paulie.dev/posts/2020/02/gatsby-theme-terminal/)

<hr />

gatsby-starter-terminal.jpg

<hr />

## 3. gatsby-starter-terminal

It seems fitting that if i want folks to use my theme: [gatsby-theme-terminal](https://gatsby-theme-terminal.netlify.com/) i should give them a helping hand. So here's a starter to... er... get you started 🤗

It's a pretty bare bones example of how to use the theme but it does demonstrate how to use Component Shadowing for the Logo and how to provide a custom Theme UI object to style the theme your way. _I believe the 2 stars it has on GitHub speak for themselves_ 🤣

[GitHub](https://github.com/PaulieScanlon/gatsby-starter-terminal)

<hr />

gatsby-plugin-prop-shop.jpg

<hr />

## 4. gatsby-plugin-prop-shop

I think perhaps this a unique concept that the masses just aren't ready for yet 🤔. With this plugin you can get an overview of all _PropTypes_ in your components, turns out that most developers building Gatsby sites don't use _PropTypes_ in fact i've been working on a much larger project where _PropTypes_ haven't be used at all... if you're doing this... then just stop it!

I'm a massive TypeScript fan but when not using TypeScript, _PropTypes_ are the next best thing and when building Component Libraries which i've done a lot of i have found it crucially important to provide a consistent api for props.

PropShop aims to help you with this by providing an holistic view of all defined _PropTypes_ in you project, all in one place.

I've created a [PR](https://github.com/system-ui/theme-ui/pull/669) for Theme UI but as the library is undergoing some vital TypeScript work it has yet to be merged. The feedback from the Gatsby team was promising though and to quote [Brent Jackson](https://twitter.com/jxnblk)

> Thanks! This is a really cool idea!

I do wonder if something similar will make it's way in to Gatsby Admin and if it does hopefully Gatsby will hire me to help build it. 🤞

<hr />

[View Demo](https://gatsby-plugin-prop-shop.netlify.com/prop-shop/) |
[GitHub](https://github.com/PaulieScanlon/gatsby-plugin-prop-shop) |
[Blog post](https://paulie.dev/posts/2020/02/prop-shop/)

<hr />

theme-ui-components.jpg

<hr />

## 5. @theme-ui/components

In the spirit of open-source i found myself wanting to contribute to the libraries i use and love. I noticed a request for collaboration on Theme UI Components by the Gatsby team who were switching _everything_ over to TypeScript. This kind of work is right in my wheel house so i set about converting the package to TypeScript, unfortunately i ran out of talent and the [PR](https://github.com/system-ui/theme-ui/pull/692) remains open. I believe there are bigger pieces of work that first need to be completed before this will be looked at again. However, if i suddenly become a TypeScript guru i'll be sure to pick this back up.

[PR](https://github.com/system-ui/theme-ui/pull/692)

<hr />

gatsby-mdx-embed.jpg

<hr />

## 6. gatsby-mdx-embed

Continuing with my interest in Gatsby plugins i was inspired by [gatsby-remark-oembed](https://github.com/raae/gatsby-remark-oembed). This is great plugin and allows you to use all sorts of media embed codes in your markdown blog.

Yeah... markdown... what about MDX?

Spotting a gap in the market i developed this plugin to bring all the same embedded-able joy to MDX. Since MDX is a super power much more can be achieved when combining it with `<Flex>` and `<Box>` from Theme UI Components. Imagine doing a full screen YouTube video wall on one of your blog posts, or displaying an entire Twitter timeline next to your content!

That's all possible with this plugin. There are few shortcomings with the way the props are required for each of the components and i do hope to develop this further so it's easier to use but for now if you want to embed Twitter, YouTube Instagram and many more in to your `.mdx` without imports, this is the plugin for you!

<hr />

[View Demo](https://gatsby-mdx-embed.netlify.com/) |
[GitHub](https://github.com/PaulieScanlon/gatsby-mdx-embed) |
[Blog post](https://paulie.dev/posts/2020/01/gatsby-mdx-embed/)

<hr />

gatsby-remark-grid-system.jpg

<hr />

## 7. gatsby-remark-grid-system

Officially speaking i started this plugin before the challenge came about and before i'd truly discovered MDX and Theme UI Components but i was wondering why people didn't need Bootstrap style containers, rows and columns in markdown, for the record i still don't know the answer to that question 🤷‍♂️

That said this plugin was a head first dive into the [Markdown Abstract Syntax Tree](https://github.com/syntax-tree/mdast) and allowed me to understand what markdown and MDX do under the hood. Using visitor patterns i was able to bring responsive mobile first layouts to tired old single column markdown files.

[View Demo](https://gatsby-remark-grid-system.netlify.com/) |
[GitHub](https://github.com/PaulieScanlon/gatsby-remark-grid-system) |
[Blog post](https://paulie.dev/posts/2019/12/26/gatsby-remark-grid-system/)

<hr />

gatsby-mdx-routes.jpg

<hr />

## 8. gatsby-mdx-routes

Again officially speaking i started this plugin before the challenge started but i did continue to develop it over the course of the 100 days and released multiple updates as new requirements became clear. I've also used this plugin in both my theme [gatsby-theme-terminal](https://gatsby-theme-terminal.netlify.com/).

Extracting navigation routes for locally sourced `.mdx` files using GraphQL in your project isn't a huge task in itself but this plugin aims to separate the business logic of _finding_, _sorting_ and _listing_ routes from _styling_ those routes as links or lists. It was the start of my thinking process about separation of concerns which i then used more effectively in [gatsby-theme-terminal](https://gatsby-theme-terminal.netlify.com/)

There are a few areas where it doesn't quite perform, namely in the recursive pattern but developing this plugin really enhanced my JavaScript knowledge and dare i say it but i think i finally understand [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) 🕺

<hr />

[View Demo](https://gatsby-mdx-routes.netlify.com/) |
[GitHub](https://github.com/PaulieScanlon/gatsby-mdx-routes) |
[Blog post](https://paulie.dev/posts/2019/12/12/gatsby-mdx-routes/)

<hr />

gatsby-remark-sticky-table.jpg

<hr />

## 9. gatsby-remark-sticky-table

I love this plugin! Why wouldn't you want sticky header tables in your markdown!

I developed this plugin back in December 2019 and as my following grew so to did the GitHub issues. I always tried to resolve these quickly and it was a gentle introduction to life as an open-source developer which i really rather enjoy. I've found that helping people use software i've written is actually very rewarding!

So if you want big tables in your blog but don't want never ending page scrolls then keep it sticky with [gatsby-remark-sticky-table](https://github.com/PaulieScanlon/gatsby-remark-sticky-table)

<hr />

[View Demo](https://gatsby-remark-sticky-table.netlify.com/) |
[GitHub](https://github.com/PaulieScanlon/gatsby-remark-sticky-table) |
[Blog post](https://paulie.dev/posts/2019/11/24/gatsby-remark-sticky-table/)

<hr />

gatsby-theme-gatstats.jpg

<hr />

## 10. gatsby-theme-gatstats

... and finally, GatStats.

This was the whole reason i got in to Gatsby and in early December 2019 i released [GatStats](https://twitter.com/PaulieScanlon/status/1201514996838141952)

As mentioned above, this too was developed before the challenge started but due to the new exposure more and more issues were raised on GitHub so i continued to support this over the course of the challenge.

Knowing what i know now i think it's time to retire this theme, i do plan to re-build it but using all my learnings from other Gatsby work and i still want to create a dashboard theme but i think there's a much better way to approach it.

Apologies in advance if you're using this theme. They'll be an update soon about how to migrate.

<hr />

[View Demo](https://gatsby-theme-gatstats.netlify.com/) |
[Storybook](https://gatsby-theme-gatstats.netlify.com/storybook/)
[GitHub](https://github.com/PaulieScanlon/gatsby-theme-gatstats) |
[Blog post](https://paulie.dev/posts/2019/11/12/gatsby-theme-gatstats/)

<hr />

... and that's it 💥

Big shout out to the Gatsby team, the folks who use the technology plus everyone i've interacted with on [Twitter](https://twitter.com/PaulieScanlon) over the past three months, it's been an absolute pleasure.

Cheerio!

Paul
