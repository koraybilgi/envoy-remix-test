import {
  TextField,
  ResourceList,
  ResourceItem,
  Text,
  Page,
  Box,
  ChoiceList,
  InlineStack,
  Image,
  InlineGrid,
  BlockStack,
  Card,
  Button,
  Badge,
  LegacyFilters,
  Sticky,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';

import {EditIcon} from '@shopify/polaris-icons';

type Tone =
  | 'base'
  | 'disabled'
  | 'inherit'
  | 'success'
  | 'critical'
  | 'caution'
  | 'subdued'
  | 'text-inverse'
  | 'text-inverse-secondary'
  | 'magic'
  | 'magic-subdued';


export const ActivityType = {
  INVOICE_CREATED: {
    label: "Invoice Created",
    slug: "invoice::created",
    image: "https://cdn-icons-png.freepik.com/256/7753/7753040.png",
    tone: 'base',
  },
  INVOICE_EDITED: {
    label: "Invoice Edited",
    slug: "invoice::edited",
    image: "https://cdn-icons-png.freepik.com/256/10474/10474397.png",
    tone: 'base',
  },
  INVOICE_DOWNLOADED: {
    label: "Invoice Downloaded",
    slug: "invoice::downloaded",
    image: "https://cdn-icons-png.freepik.com/256/9874/9874455.png",
    tone: 'base',
  },
  MAIL_SENT: {
    label: "Invoice Sent",
    slug: "mail::sent",
    image: "https://cdn-icons-png.freepik.com/256/9852/9852806.png",
    tone: 'base',
  },
  MAIL_ERROR: {
    label: "Sending Error",
    slug: "mail::error",
    image: "https://cdn-icons-png.freepik.com/256/9858/9858795.png",
    tone: 'critical',
  },
  WEBHOOK_RECEIVED: {
    label: "Order Data Received",
    slug: "webhook::received",
    image: "https://cdn-icons-png.freepik.com/256/10322/10322513.png",
    tone: 'base',
  }
};

const activitySlugMap = Object.fromEntries(
  Object.values(ActivityType).map((activity) => [activity.slug, activity])
);

export default function Activities() {
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [orderId, setOrderId] = useState<string | undefined>();
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [queryValue, setQueryValue] = useState<string | undefined>(undefined);

  const handleOrderIdChange = useCallback(
    (value: string) => setOrderId(value),
    [],
  );
  const handleOrderIdRemove = useCallback(
    () => setOrderId(undefined),
    [],
  );
  const handleCustomerIdChange = useCallback(
    (value: string) => setCustomerId(value),
    [],
  );
  const handleCustomerIdRemove = useCallback(
    () => setCustomerId(undefined),
    [],
  );
  const handleQueryValueChange = useCallback(
    (value: string) => setQueryValue(value),
    [],
  );
  const handleQueryValueRemove = useCallback(
    () => setQueryValue(undefined),
    [],
  );
  const handleClearAll = useCallback(() => {
    handleOrderIdRemove();
    handleCustomerIdRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleOrderIdRemove, handleCustomerIdRemove]);

  const resourceName = {
    singular: 'activity',
    plural: 'activities',
  };

  const activities = [
    {
      id: '512',
      url: 'javascript:void(0)',
      type: ActivityType.WEBHOOK_RECEIVED.slug,
      createdAt: 'Just Now',
      meta: {
        orderId: '123123',
        orderUrl: '/orders/123123',
        invoiceId: '123123',
        invoiceUrl: '/invoices/123123',
      },
    },
    {
      id: '112',
      url: 'javascript:void(0)',
      type: ActivityType.INVOICE_CREATED.slug,
      createdAt: 'Just Now',
      meta: {
        invoiceId: '123123',
        invoiceUrl: '/invoices/123123',
        orderId: '123123',
        orderUrl: '/orders/123123',
      },
    },
    {
      id: '212',
      url: 'javascript:void(0)',
      type: ActivityType.INVOICE_EDITED.slug,
      createdAt: 'Today, 19:55',
      meta: {
        orderId: '123123',
        orderUrl: '/orders/123123',
        invoiceId: '123123',
        invoiceUrl: '/invoices/123123',
        previousInvoiceId: '123122',
        previousInvoiceUrl: '/invoices/123122'
      },
    },
    {
      id: '312',
      url: 'javascript:void(0)',
      type: ActivityType.MAIL_SENT.slug,
      createdAt: 'Today, 18:55',
      meta: {
        orderId: '123123',
        orderUrl: '/orders/123123',
        invoiceId: '123123',
        invoiceUrl: '/invoices/123123',
        mailTo: ['emrah@envoy.com', 'gokhan@envoy.com']
      },
    },
    {
      id: '313',
      url: 'javascript:void(0)',
      type: ActivityType.INVOICE_DOWNLOADED.slug,
      createdAt: 'Today, 18:25',
      meta: {
        orderId: '123123',
        orderUrl: '/orders/123123',
        invoiceId: '123123',
        invoiceUrl: '/invoices/123123',
      },
    },
    {
      id: '412',
      url: 'javascript:void(0)',
      type: ActivityType.MAIL_ERROR.slug,
      createdAt: 'Wed 21, 18:55',
      meta: {
        orderId: '123123',
        orderUrl: '/orders/123123',
        invoiceId: '123123',
        invoiceUrl: '/invoices/123123',
        mailTo: ['emrah@envoy.com', 'gokhan@envoy.com'],
        failedMails: ['gokhan@envoy.com'],
        errorMesage: "Sik sok oldu",
      },
    },
  ];


  const filters = [
    {
      key: 'eventType',
      label: 'Event Type',
      filter: (
        <ChoiceList
          title="Event Types"
          onChange={handleClearAll}
          choices={
            Object.values(ActivityType).map((activity) => ({
              value: activity.slug,
              label: activity.label.replace(" ", ": "),
            }))
          }
          selected={[]}
          allowMultiple
          titleHidden
        />
        
      ),
      shortcut: true,
    },
    {
      key: 'orderId',
      label: 'Order',
      filter: (
        <TextField
          label="Order"
          value={orderId}
          onChange={handleOrderIdChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: 'customerId',
      label: 'Customer',
      filter: (
        <TextField
          label="Customer"
          value={customerId}
          onChange={handleCustomerIdChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [
    orderId && !isEmpty(orderId)
      ? {
          key: 'orderId',
          label: disambiguateLabel('orderId', orderId),
          onRemove: handleOrderIdRemove,
        }
      : null,
    customerId && !isEmpty(customerId)
      ? {
          key: 'customerId',
          label: disambiguateLabel('customerId', customerId),
          onRemove: handleCustomerIdRemove,
        }
      : null,
  ].filter(Boolean);

  const filterControl = (
    <Box padding={'300'}>
    <LegacyFilters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    >
    </LegacyFilters>
    </Box>
  );

  return (
    <Page
      title='Event Timeline'
      subtitle='List, filter and inspect the complete timeline of events.'
      >
      <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="400">
        <BlockStack gap="400">
          <Card padding={'0'}>
            <ResourceList
              resourceName={resourceName}
              items={activities}
              renderItem={renderActivity}
              showHeader
              sortValue={sortValue}
              sortOptions={[
                {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
                {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
              ]}
              onSortChange={(selected) => {
                setSortValue(selected);
                alert(`Sort option changed to ${selected}.`);
              }}
              filterControl={filterControl}
              emptyState={
                <Box padding={'200'} paddingBlockEnd={'400'}>
                  <Text as="h1" alignment='center'>No events found.</Text>
                </Box>
              }
              pagination={{
                hasNext: true,
                onNext: () => {},
              }}
            />
          </Card>
        </BlockStack>
        <Sticky>
        <BlockStack gap={{ xs: "400", md: "200" }}>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <BlockStack gap="200">
                <Text as="h2" variant="headingSm">
                  Event Detail
                </Text>
                <Text as="p" variant="bodyMd">
                  John Smiths
                </Text>
              </BlockStack>
              <BlockStack gap="200">
                <InlineGrid columns="1fr auto">
                  <Text as="h3" variant="headingSm" fontWeight="medium">
                    Contact Information
                  </Text>
                  <Button
                    icon={EditIcon}
                    variant="tertiary"
                    onClick={() => {}}
                    accessibilityLabel="Edit"
                  />
                </InlineGrid>
                <Text as="p" variant="bodyMd">
                  john.smith@example.com
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </BlockStack>
        </Sticky>
      </InlineGrid>
    </Page>
  );

  function buildShortcutActions(activity: typeof activities[number]) {
    const {type, meta} = activity;
    const shortcutActions = [];

    switch (type) {
      case ActivityType.INVOICE_CREATED.slug:
        shortcutActions.push({content: 'Show invoice', url: `/app${meta.invoiceUrl}`});
        shortcutActions.push({content: 'Show order', url: `/app${meta.orderUrl}`});
        break;
      case ActivityType.INVOICE_EDITED.slug:
        shortcutActions.push({content: 'Show changes', url: `/app${meta.invoiceUrl}`});
        shortcutActions.push({content: 'Show order', url: `/app${meta.orderUrl}`});
        break;
      case ActivityType.INVOICE_DOWNLOADED.slug:
        shortcutActions.push({content: 'Show downloaded version', url: `/app${meta.invoiceUrl}`});
        break;
      case ActivityType.MAIL_SENT.slug:
      case ActivityType.MAIL_ERROR.slug:
        shortcutActions.push({content: 'Show customer', url: `/app${meta.invoiceUrl}`});
        shortcutActions.push({content: 'Show order', url: `/app${meta.orderUrl}`});
        break;
      case ActivityType.WEBHOOK_RECEIVED.slug:
        shortcutActions.push({content: 'Show data', url: `/app${meta.invoiceUrl}`});
        break;
      default:
        break;
    }
    return shortcutActions;
  }

  function showDetails(id) {
    alert(`Show details for: ${id}`);
  }

  function renderActivity(activity: typeof activities[number]) {
    const {id, url, type, meta, createdAt} = activity;
    const activityLabel = activitySlugMap[type].label;
    const illustration = activitySlugMap[type].image;
    const tone: Tone = (activitySlugMap[type]?.tone as Tone) || 'base';
    const shortcutActions = buildShortcutActions(activity);

    return (
      <ResourceItem
        id={id}
        url={url}
        accessibilityLabel={`View details`}
        shortcutActions={shortcutActions}
        verticalAlignment='leading'
        onClick={showDetails}
      >
        <InlineStack gap={'150'}>
        <Text as="h3" variant="bodyMd" tone={tone == 'critical' ? 'critical' : 'subdued'}>
          {createdAt}
        </Text>
        {tone == 'critical' ? <Badge size='small' tone='critical'>problem</Badge> : ''}
        </InlineStack>
        <Box paddingBlockStart='200' paddingInlineStart='600'>
          <Box borderInlineStartWidth='025' borderStyle='dashed' paddingInlineStart='600'>
            <InlineStack wrap={false} gap={'300'}>
                <Image height="35px" source={illustration} alt="" style={{opacity: 0.7, filter: tone == 'critical' ? 'hue-rotate(70deg)' : ''}}></Image>
              <Box>
                <Text as="h2" variant="headingSm" tone={tone}>
                  {activityLabel} <Badge tone='enabled'>{'OrderId: ' + meta.orderId}</Badge>
                </Text>
                <p>Some details some bidi bidi.</p>
              </Box>
            </InlineStack>
          </Box>
        </Box>
      </ResourceItem>
    );
  }

  function disambiguateLabel(key: string, value: string): string {
    switch (key) {
      case 'orderId':
        return `Order: ${value}`;
      case 'customerId':
        return `Customer: ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value: string): boolean {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}