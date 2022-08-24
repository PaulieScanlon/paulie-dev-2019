const { google } = require('googleapis');

const jwt = new google.auth.JWT(
  process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_ANALYTICS_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  'https://www.googleapis.com/auth/analytics.readonly'
);

module.exports.get = async function () {
  try {
    await jwt.authorize();
    const response = await google.analytics('v3').data.ga.get({
      auth: jwt,
      ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
      'start-date': '2019-10-01',
      'end-date': '2022-07-01',
      // 'start-date': '2020-02-01',
      // 'end-date': '2020-02-20',
      metrics: 'ga:pageviews',
      dimensions: 'ga:city,ga:latitude,ga:longitude,ga:country,ga:countryIsoCode'
    });

    return {
      message: 'A ok!',
      data: response.data.rows
        .map(([city, lat, lng, country, countryIsoCode, count]) => {
          return {
            city: city,
            lat: lat,
            lng: lng,
            country: country,
            country_code: countryIsoCode,
            count: count
          };
        })
        .sort((a, b) => a.country.localeCompare(b.country))
        .filter((item) => {
          if (item.country === '(not set)' || item.city === '(not set)') {
            return null;
          } else {
            return item;
          }
        })
    };
  } catch (error) {
    return { message: error.message };
  }
};
