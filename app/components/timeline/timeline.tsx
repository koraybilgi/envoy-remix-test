import { BlockStack, Box, Icon, InlineGrid, InlineStack, Link, Text } from '@shopify/polaris';
import { Fragment } from 'react';
import {
  AlertCircleIcon,
  BulletIcon,
  CheckCircleIcon,
  ChevronRightIcon
} from '@shopify/polaris-icons';
import styles from './timeline.module.css';

export default function Timeline({ items }) {
  function getBulletIconFromTone(tone: string) {
    switch (tone) {
      case 'critical':
      case 'caution':
        return AlertCircleIcon;
      case 'success':
        return CheckCircleIcon;
      case 'base':
      default:
        return BulletIcon;
    }
  }

  let lastDate: null = null;

  return (
    <Box paddingInline={{ xs: '300', md: '0' }}>
      <BlockStack gap='300'>
        {items?.length ? (
          items.map((item: any, index: string) => {
            const currentDate = item.timestamp.toLocaleDateString([], {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
            const showDate = currentDate !== lastDate;
            lastDate = currentDate;
            const bulletIcon = getBulletIconFromTone(item.tone);

            return (
              <Fragment key={index}>
                {showDate && (
                  <InlineGrid gap='200' columns='auto'>                    
                    <BlockStack gap='0'>
                      <Box paddingBlockStart='600'>
                        <Text alignment='start' as='h2' variant='bodySm' tone='subdued' fontWeight='bold'>
                          {currentDate}
                        </Text>
                      </Box>
                    </BlockStack>
                  </InlineGrid>
                )}

                <InlineGrid gap='200' columns='30px 20px auto' alignItems='center'>
                <Text as='p' alignment='end' tone='disabled' variant='bodySm'>
                    {item.timestamp.toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </Text>
                  <div className={styles['timeline-icon']}>                    
                    <span className={styles['timeline-icon-polaris-icon']}>
                      <Icon source={bulletIcon} tone={item.tone} />
                    </span>
                  </div>
                  <Box className={styles['timeline-event-description']}>
                    <InlineStack gap='200' wrap={false} blockAlign='start'>
                      {item.url ? (
                        <Link url={item.url} monochrome removeUnderline>
                          <InlineStack gap='0' wrap={false} blockAlign='start'>
                            <Box className={styles['timeline-event-link-main']}>
                              {item.timelineEvent}
                            </Box>
                            <Icon source={ChevronRightIcon} />
                          </InlineStack>
                        </Link>
                      ) : (
                        <Box>{item.timelineEvent}</Box>
                      )}
                    </InlineStack>
                  </Box>
                </InlineGrid>
              </Fragment>
            );
          })
        ) : (
          <Text as='p'>No timeline events available.</Text>
        )}
      </BlockStack>
    </Box>
  );
}
