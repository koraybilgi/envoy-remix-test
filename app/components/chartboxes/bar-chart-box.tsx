// IMPORTANT: If using this component in Remix, you must wrap it in the <ClientOnly> component from the remix-utils package

import { Card, Text, Box } from '@shopify/polaris';
import { ArrowUpIcon, ArrowDownIcon } from '@shopify/polaris-icons';
import { BarChart } from '@shopify/polaris-viz';
import '@shopify/polaris-viz/build/esm/styles.css';

export const BarChartBox = ({ title = '', value = 0, data = [] }) => {
  const hasData = data && data.length;
  const percentageChange = hasData ?? 0
    ? getPercentageChange(Number(data[0]), Number(data.at(-1)))
    : 0;

  return (
    <Card padding='0'>
      <Box paddingBlock='400' paddingInlineStart='400'>
        <div
          style={{
            height: 160,
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'end',
              minWidth: 30
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -8,
                left: -2,
                zIndex: 20
              }}
            >
              <Text as='p' variant='headingSm'>
                {title}
              </Text>
            </div>
            <Text as='h2' variant='headingLg' fontWeight='bold'>
              {value}
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: -4 }}>
              {percentageChange ? (
                percentageChange > 0 ? (
                  <ArrowUpIcon style={{ height: 12, width: 12 }} fill={'green'} />
                ) : (
                  <ArrowDownIcon style={{ height: 12, width: 12 }} fill={'red'} />
                )
              ) : null}
              <Text as="span" variant='bodySm' tone='subdued'>
                <span
                  style={
                    percentageChange
                      ? {
                          color: percentageChange > 0 ? 'green' : 'red'
                        }
                      : undefined
                  }
                >
                  {Math.abs(percentageChange ?? 0) || '-'}%
                </span>
              </Text>
            </div>
          </div>
          {hasData ? (
            <div style={{ flex: 1, width: '50%', height: '100%', alignSelf: 'end' }}>
              <BarChart data={formatChartData(data)} />
            </div>
          ) : null}
        </div>
      </Box>
    </Card>
  );
};

// Formats number array to expected format from polaris-viz chart
const formatChartData = (values = []) => {
  return [{ data: values?.map((stat, idx) => ({ key: idx, value: stat })) }];
};

// Gets rate of change based on first + last entry in chart data
const getPercentageChange = (start = 0, end = 0) => {
  if (isNaN(start) || isNaN(end)) return null;

  const percentage = parseInt((((end - start) / start) * 100).toFixed(0));

  if (percentage > 999) {
    return 999;
  }

  if (percentage < -999) {
    return -999;
  }

  return percentage;
};
