module.exports = async function () {
  try {
    const response = await fetch(`https://webmention.io/api/mentions?token=${process.env.WEBMENTION_API_KEY}`);

    if (!response.status === 200) {
      throw new Error();
    }

    const data = await response.json();

    return {
      message: 'Webmentions ok!',
      data: data.links
    };
  } catch (error) {
    return { message: 'Server Error', error: error };
  }
};
