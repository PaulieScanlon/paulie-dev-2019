const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient({
  projectId: 'worldwilwdweb-dev',
  credentials: {
    client_email: 'google-analytics@worldwilwdweb-dev.iam.gserviceaccount.com',
    private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS.replace(/\\n/gm, '\n')
  }
});

function formatDate(string) {
  const year = string.toString().substring(0, 4);
  const month = string.toString().substring(4, 6);
  const day = string.toString().substring(6, 8);

  return `${year}/${month}/${day}`;
}

module.exports = async function () {
  try {
    // https://ga-dev-tools.web.app/ga4/dimensions-metrics-explorer/
    const [totalUsers] = await analyticsDataClient.runReport({
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

    const [pageViews] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GOOGLE_GA4_PROPERTY_ID}`,
      orderBys: [
        {
          dimension: {
            orderType: 'NUMERIC',
            dimensionName: 'date'
          }
        }
      ],
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today'
        }
      ],
      dimensions: [
        {
          name: 'date'
        }
      ],
      metrics: [
        {
          name: 'screenPageViews'
        }
      ],
      keepEmptyRows: false
    });

    const top10Countries = totalUsers.rows
      .map((row) => {
        return {
          totalUsers: row.metricValues[0].value,
          country: row.dimensionValues[0].value,
          flag: row.dimensionValues[1].value
        };
      })
      .slice(0, 10);

    const latestPageViews = pageViews.rows.map((row) => {
      const date = formatDate(row.dimensionValues[0].value);
      return {
        date: String(date),
        tooltip_date: String(
          new Date(date).toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short'
          })
        ),
        tick_date: String(
          new Date(date).toLocaleDateString(undefined, {
            year: undefined,
            month: 'short',
            day: '2-digit'
          })
        ),
        value: row.metricValues[0].value
      };
    });

    return {
      message: 'GA Analytics ok!',
      data: {
        top10Countries,
        latestPageViews
      }
    };
  } catch (error) {
    return { message: error.message };
  }
};
