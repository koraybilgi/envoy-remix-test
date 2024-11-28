import {
  TextField,
  IndexTable,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  ChoiceList,
  RangeSlider,
  Badge,
  useBreakpoints,
  Page,
  Card,
  Link,
  Button,
  InlineGrid,
} from '@shopify/polaris';
import {ArrowDownIcon, EmailFollowUpIcon, ImportIcon, PrintIcon, SendIcon} from '@shopify/polaris-icons';
import { initShopify } from "../shopify.server";

import { json, LoaderFunctionArgs } from "@remix-run/node";
import type {IndexFiltersProps, TabProps} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { useLoaderData } from '@remix-run/react';
import { capitalize } from 'app/helpers/string-helpers';



export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const { admin } = await initShopify(context).authenticate.admin(request);
  const response = await admin.graphql(
    `#graphql
    query {
      orders(first: 10) {
        nodes {
          id,
          legacyResourceId,
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          displayFinancialStatus
          returnStatus
          displayFulfillmentStatus
          customer {
            displayName
            locale
          }
          createdAt
        }
      }
    }`,
  );
  
  const parsedResponse = await response.json();
 
  return json({
    orders: parsedResponse.data.orders.nodes,
  });
};

export default function Orders() {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const [itemStrings, setItemStrings] = useState([
    'All',
    'Sent',
    'Printed',
    'Waiting',
    'Failed',
    'Unattended',
  ]);

  
  const deleteView = (index: number) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };

  const duplicateView = async (name: string) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  };

  const tabs: TabProps[] = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename',
              onAction: () => {},
              onPrimaryAction: async (value: string): Promise<boolean> => {
                const newItemsStrings = tabs.map((item, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return item.content;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: 'duplicate',
              onPrimaryAction: async (value: string): Promise<boolean> => {
                await sleep(1);
                duplicateView(value);
                return true;
              },
            },
            {
              type: 'edit',
            },
            {
              type: 'delete',
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));
  const [selected, setSelected] = useState(0);

  const onCreateNewView = async (value: string) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };

  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {label: 'Order', value: 'order asc', directionLabel: 'Ascending'},
    {label: 'Order', value: 'order desc', directionLabel: 'Descending'},
    {label: 'Customer', value: 'customer asc', directionLabel: 'A-Z'},
    {label: 'Customer', value: 'customer desc', directionLabel: 'Z-A'},
    {label: 'Date', value: 'date asc', directionLabel: 'A-Z'},
    {label: 'Date', value: 'date desc', directionLabel: 'Z-A'},
    {label: 'Total', value: 'total asc', directionLabel: 'Ascending'},
    {label: 'Total', value: 'total desc', directionLabel: 'Descending'},
  ];

  const [sortSelected, setSortSelected] = useState(['order asc']);
  const {mode, setMode} = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };

  const primaryAction: IndexFiltersProps['primaryAction'] =
    selected === 0
      ? {
          type: 'save-as',
          onAction: onCreateNewView,
          disabled: false,
          loading: false,
        }
      : {
          type: 'save',
          onAction: onHandleSave,
          disabled: false,
          loading: false,
        };

  const [accountStatus, setAccountStatus] = useState<string[]>([]);
  const [moneySpent, setMoneySpent] = useState<[number, number] | undefined>(
    undefined,
  );
  const [taggedWith, setTaggedWith] = useState<string | undefined>('');
  const [queryValue, setQueryValue] = useState<string | undefined>(undefined);

  const handleAccountStatusChange = useCallback(
    (value: string[]) => setAccountStatus(value),
    [],
  );
  const handleMoneySpentChange = useCallback(
    (value: [number, number]) => setMoneySpent(value),
    [],
  );
  const handleTaggedWithChange = useCallback(
    (value: string) => setTaggedWith(value),
    [],
  );
  const handleQueryValueChange = useCallback(
    (value: string) => setQueryValue(value),
    [],
  );
  const handleAccountStatusRemove = useCallback(() => setAccountStatus([]), []);
  const handleMoneySpentRemove = useCallback(
    () => setMoneySpent(undefined),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleQueryValueRemove,
    handleTaggedWithRemove,
    handleMoneySpentRemove,
    handleAccountStatusRemove,
  ]);

  const filters = [
    {
      key: 'accountStatus',
      label: 'Account status',
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            {label: 'Enabled', value: 'enabled'},
            {label: 'Not invited', value: 'not invited'},
            {label: 'Invited', value: 'invited'},
            {label: 'Declined', value: 'declined'},
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: 'moneySpent',
      label: 'Money spent',
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  const appliedFilters =
    taggedWith && !isEmpty(taggedWith)
      ? [
          {
            key: 'taggedWith',
            label: disambiguateLabel('taggedWith', taggedWith),
            onRemove: handleTaggedWithRemove,
          },
        ]
      : [];

  const { orders } = useLoaderData<typeof loader>();
  console.log("-----------------------------------");
  console.log(orders);
  //const orders = data;
/*
  const orders = [
    {
      id: '1020',
      invoiceNo: '100020',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      url: 'https://admin.shopify.com/store/devbilgi/orders/1020',
      paymentStatus: <Badge progress="complete" tone='success'>Paid</Badge>,
      returnStatus: <Badge progress="incomplete">No return</Badge>,
      fulfillmentStatus: <Badge progress="incomplete" tone="attention">Unfulfilled</Badge>,
    },
    {
      id: '1019',
      invoiceNo : '100019',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      url: 'https://admin.shopify.com/store/devbilgi/orders/1019',
      paymentStatus: <Badge progress="partiallyComplete" tone='attention'>Partially paid</Badge>,
      returnStatus: <Badge progress="incomplete">No return</Badge>,
      fulfillmentStatus: <Badge progress="incomplete" tone="attention">Unfulfilled</Badge>,
    },
    {
      id: '1018',
      invoiceNo : '100018',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      url: 'https://admin.shopify.com/store/devbilgi/orders/1018',
      paymentStatus: <Badge progress="complete" tone='success'>Paid</Badge>,
      returnStatus: <Badge progress="incomplete">No return</Badge>,
      fulfillmentStatus: <Badge progress="incomplete" tone="attention">Unfulfilled</Badge>,
    },
  ];
*/
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(orders);

  const rowMarkup = orders.map((order: any, index: any) => (
      <IndexTable.Row
        id={order.legacyResourceId}
        key={order.legacyResourceId}
        selected={selectedResources.includes(order.legacyResourceId)}
        position={index}
      >
        <IndexTable.Cell>
          <Text as="span" fontWeight='medium'>
            #{order.legacyResourceId}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Link dataPrimaryLink url={`/app/invoicedetail/?id=${order.legacyResourceId.slice(0, 4)}`} onClick={() => {}}>
            <Text as="span" fontWeight='medium'>
              #{order.legacyResourceId.slice(0, 4)}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{order.customer.displayName} <Badge>{order.customer.locale.toUpperCase()}</Badge></IndexTable.Cell>
        <IndexTable.Cell>{order.createdAt}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {order.totalPriceSet.shopMoney.amount} {order.totalPriceSet.shopMoney.currencyCode}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell><Badge progress="complete" tone='success'>{capitalize(order.displayFinancialStatus)}</Badge></IndexTable.Cell>
        <IndexTable.Cell><Badge progress="incomplete" tone="attention">{capitalize(order.displayFulfillmentStatus)}</Badge></IndexTable.Cell>
        <IndexTable.Cell><Badge progress="incomplete">{capitalize(order.returnStatus)}</Badge></IndexTable.Cell>
        <IndexTable.Cell>
          <InlineGrid columns={3} gap={'025'}>
            <Button icon={PrintIcon} variant='plain' onClick={() => alert('Print')}></Button>
            <Button icon={EmailFollowUpIcon} variant='plain' onClick={() => alert('Send')}></Button>
            <Button icon={ArrowDownIcon} variant='plain' onClick={() => alert('Download')}></Button>
          </InlineGrid>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  const promotedBulkActions = [
    {
      title: 'Bulk Actions',
      actions: [
        {
          icon: PrintIcon,
          content: 'Print',
          onAction: () => console.log('Print'),
        },
        {
          icon: SendIcon,
          content: 'Send',
          onAction: () => console.log('Send'),
        },
        {
          icon: ArrowDownIcon,
          content: 'Download',
          onAction: () => console.log('Download'),
        },
      ]
    }
  ];


  return (
    <Page 
      title={"Orders"}
      secondaryActions={[
        {
          icon: ImportIcon,
          content: "Import",
          accessibilityLabel: "Import product list",
          onAction: () => alert("Import action"),
        },
      ]}
      fullWidth
    >
      <Card padding={'0'}>
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        queryValue={queryValue}
        queryPlaceholder="Searching in all"
        onQueryChange={handleQueryValueChange}
        onQueryClear={() => setQueryValue('')}
        onSort={setSortSelected}
        primaryAction={primaryAction}
        cancelAction={{
          onAction: onHandleCancel,
          disabled: false,
          loading: false,
        }}
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        canCreateNewView
        onCreateNewView={onCreateNewView}
        filters={filters}
        appliedFilters={appliedFilters}
        onClearAll={handleFiltersClearAll}
        mode={mode}
        setMode={setMode}
        loading={false}
      />
      <IndexTable
        selectable={true}
        promotedBulkActions={promotedBulkActions}
        condensed={useBreakpoints().smDown}
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Order'},
          {title: 'Invoice'},
          {title: 'Customer'},
          {title: 'Date'},
          {title: 'Total', alignment: 'end'},
          {title: 'Payment status'},
          {title: 'Fulfillment status'},
          {title: 'Return status'},
          {title: 'Actions', alignment: 'end'},
        ]}
        pagination={{
          hasNext: true,
          onNext: () => {},
        }}
      >
        {rowMarkup}
      </IndexTable>
      </Card>
    </Page>
  );

  function disambiguateLabel(key: string, value: string | string[]): string {
    switch (key) {
      case 'moneySpent':
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case 'taggedWith':
        return `Tagged with ${value}`;
      case 'accountStatus':
        return (value as string[]).map((val) => `Customer ${val}`).join(', ');
      default:
        return value as string;
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