module.exports = async function () {
  try {
    const response = await fetch(
      `https://webmention.io/api/mentions.jf2?domain=paulie.dev&token=${process.env.WEBMENTION_API_KEY}`
    );

    if (!response.status === 200) {
      throw new Error();
    }

    const data = await response.json();

    return {
      message: 'Webmentions ok!',
      data: data.children
    };
  } catch (error) {
    return { message: 'Server Error', error: error };
  }
};
