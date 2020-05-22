# Roll your own reactions with Netlify, Gatsby and FaunaDB

In this post you'll learn...

- How to add reactions to your Gatsby blog posts
- How to write an Apollo/GraphQL api
- How to deploy serverless functions to Netlify
- How to store data in a Fauna database

They'll be an intro about how comments on blog posts are cool but they require moderation to prevent naughty words posted by tinkers from appearing on your lovely blog posts.

Instead of allowing users to post "words" let's instead allow users to post "reactions". These don't require moderation because the we're not exposing an input field where users can type free text.

I'm currently re-building Chris Gannon's [SVG Bubble Slider](https://codepen.io/chrisgannon/pen/GZNgLw/) and plan to publish it as an npm module.

This is what i'll use to demo how to trigger multiple events that will post the relevant reaction to the database... i haven't figured all of this out yet but providing i don't run out of SVG talent those emojis will act as spinner/loaders while the "reaction" is being sent and the bubbles that contain the reaction name will probably also contain the reaction count

Here's where i'm at with the npm module.

- npm: https://www.npmjs.com/package/react-svg-bubble-slider
- github: https://github.com/PaulieScanlon/react-svg-bubble-slider
- demo: https://react-svg-bubble-slider.netlify.app/?path=/docs/intro--page

Chris is fine with this, his only request is that i don't attempt to monetize the module... which i don't... it'll be open source

In this post [https://css-tricks.com/roll-your-own-comments-with-gatsby-and-faunadb/](https://css-tricks.com/roll-your-own-comments-with-gatsby-and-faunadb/) i covered off quite a bit of the Fauna and Netlify stuff so i can _borrow_ some of that but perhaps i'll go in to more detail about Netlify functions rather than the FaunaDB operations.

I might as well include a link to a demo repo as i did with the above post so users can see the code for the final product.

That's pretty much the idea and i'd welcome feedback, any questions here's my email: [pauliescanlon@gmail.com](mailto:pauliescanlon@gmail.com)

Oh, and other bit's and pieces i've written can be found [here](https://paulie.dev/writing/)
and [here](https://paulie.dev/posts/)

Thanks

Paul
