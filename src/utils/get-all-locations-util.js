const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient({
  projectId: 'paulie-dev',
  credentials: {
    client_email: 'google-analytics@paulie-dev.iam.gserviceaccount.com',
    private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS.replace(/\\n/gm, '\n')
  }
});

module.exports.get = async function () {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GOOGLE_GA4_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today'
        }
      ],
      dimensions: [
        {
          name: 'country'
        },
        {
          name: 'countryId'
        }
      ],
      metrics: [
        {
          name: 'totalUsers'
        }
      ]
    });

    const sliced = response.rows
      .map((row) => {
        return {
          flag: row.dimensionValues[1].value,
          name: row.dimensionValues[0].value,
          amount: row.metricValues[0].value
        };
      })
      .slice(0, 10);

    return {
      message: 'all locations',
      data: sliced
    };
  } catch (error) {
    return { message: error.message };
  }
};
