import { Layout, Page, Grid, Text, BlockStack, Box } from '@shopify/polaris';
import { SparkLineChartBox, BarChartBox } from '../components/chartboxes';

export default function Reports() {
  // Each array represents the values for the past 7 days including today
  const stats = {
    orders: [13, 20, 18, 5, 8, 15, 23],
    reviews: [3, 3, 5, 6, 5, 2, 8],
    returns: [5, 6, 5, 8, 4, 3, 1]
  };

  return (
    <Page title='Reports'>
      <Layout>
        <Layout.Section>
          <Box padding='200'>
            <BlockStack gap='100'>
              <Text as="span" variant='headingMd'>Daily Stats Example</Text>
              <Text as="span" variant='bodySm' tone='subdued'>
                Shows rate of change from first entry of chart data to today
              </Text>
            </BlockStack>
          </Box>
        </Layout.Section>
        <Layout.Section>
          <Grid columns={{xs: 3}}>
            <Grid.Cell columnSpan={{ xs: 6, lg: 4 }}>
              <SparkLineChartBox title='Orders' value={stats.orders.at(-1)} data={stats.orders} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, lg: 4 }}>
              <SparkLineChartBox title='Reviews' value={stats.reviews.at(-1)} data={stats.reviews} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, lg: 4 }}>
              <SparkLineChartBox title='Returns' value={stats.returns.at(-1)} data={stats.returns} />
            </Grid.Cell>
          </Grid>
          <Grid columns={{xs: 3}}>
            <Grid.Cell columnSpan={{ xs: 6, lg: 4 }}>
              <BarChartBox title='Orders' value={stats.orders.at(-1)} data={stats.orders} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, lg: 4 }}>
              <BarChartBox title='Reviews' value={stats.reviews.at(-1)} data={stats.reviews} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, lg: 4 }}>
              <BarChartBox title='Returns' value={stats.returns.at(-1)} data={stats.returns} />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
