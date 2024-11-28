import { Tabs ,useBreakpoints, Page, Card, Text, Link, IndexTable, Badge, useIndexResourceState, Box } from '@shopify/polaris';
import {useState, useCallback} from 'react';


export default function Rules() {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = useCallback(
      (selectedTabIndex: number) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 100);
        setSelected(selectedTabIndex);
      },
      [],
    );

  const rules = [
    {
      id: '1000',
      priority: 1,
      rule: '#1000',
      date: 'Jul 20 at 4:34pm',
      business: <Badge tone='new'>Any</Badge>,
      market: 'Any',
      language: 'Any',
      url: 'https://admin.shopify.com/store/devbilgi/orders/1020',
      template: <Link url="/app/templates">Morocco</Link>,
      status: <Badge progress="complete" tone='success'>Active</Badge>,
    },
    {
      id: '1020',
      priority: 2,
      rule: '#1020',
      date: 'Jul 20 at 4:34pm',
      business: <Badge tone='magic'>B2B</Badge>,
      market: 'CA',
      language: 'FR',
      url: 'https://admin.shopify.com/store/devbilgi/orders/1020',
      template: <Link url="/app/templates">Morocco</Link>,
      status: <Badge progress="incomplete" tone='new'>Passive</Badge>,
    },
    {
      id: '1019',
      priority: 3,
      rule: '#1019',
      date: 'Jul 20 at 3:46pm',
      business: <Badge tone='magic'>B2B</Badge>,
      market: 'CA',
      language: 'EN',
      url: 'https://admin.shopify.com/store/devbilgi/orders/1019',
      template: <Link url="/app/templates">Testament</Link>,
      status: <Badge progress="incomplete" tone='new'>Passive</Badge>,
    },
    {
      id: '1018',
      priority: 4,
      rule: '#1018',
      date: 'Jul 20 at 3.44pm',
      business: <Badge tone='info'>B2C</Badge>,
      market: 'DE',
      language: 'GR',
      url: 'https://admin.shopify.com/store/devbilgi/orders/1018',
      template: <Link url="/app/templates">Invictus</Link>,
      status: <Badge progress="incomplete" tone='success'>Active</Badge>,
    },
  ];

  const tabs = [
    {
      id: 'template-rules',
      content: 'Template Rules',
      accessibilityLabel: 'All customers',
      panelID: 'template-rules-content',
      description: "The template rules are the most lorem ipsum bidi bidi",
    },
    {
      id: 'pricing-rules',
      content: 'Pricing Rules',
      panelID: 'pricing-rules-content',
      description: "The pricing rules are the most lorem ipsum bidi bidi"
    },
    {
      id: 'sending-rules',
      content: 'Sending Rules',
      panelID: 'sending-rules-content',
      description: "The sending rules are the most lorem ipsum bidi bidi"
    },
    {
      id: 'storage-rules',
      content: 'Storage Rules',
      panelID: 'storage-rules-content',
      description: "The storage rules are the most lorem ipsum bidi bidi"
    },
  ];

  const promotedBulkActions = [
    {
      destructive: true,
      content: 'Delete rules',
      onAction: () => alert('Todo: implement bulk delete'),
    },
  ];

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rules);

  const rowMarkup = rules.map(
    (
      {id, priority, business, rule, date, market, language, template, status},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>{priority}</IndexTable.Cell>
        <IndexTable.Cell>
          <Link dataPrimaryLink>
            <Text variant="bodyMd" as="span">
              {rule}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{business}</IndexTable.Cell>
        <IndexTable.Cell>{market}</IndexTable.Cell>
        <IndexTable.Cell>{language}</IndexTable.Cell>
        <IndexTable.Cell>{template}</IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  
  return (
    <Page
      title={tabs[selected].content}
      subtitle={tabs[selected].description}
      titleMetadata={<Link url="https://help.shopify.com/manual">learn more</Link>}
      primaryAction={{ content: "Create new rule"}}
    >
      
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Box padding={{xs: '100'}}></Box>
        <Card padding={{xs: '0'}}>
          
          <IndexTable
            loading={loading}
            selectable={true}
            condensed={useBreakpoints().smDown}
            promotedBulkActions={promotedBulkActions}
            resourceName={{
              singular: 'rule',
              plural: 'rules',
            }}
            selectedItemsCount={
              allResourcesSelected ? 'All' : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            pagination={{
              hasNext: true,
              onNext: () => {},
            }}
            itemCount={rules.length}
            headings={[
              {title: 'Priority'},
              {title: 'Rule'},
              {title: 'Created At'},
              {title: 'Business'},
              {title: 'Market'},
              {title: 'Language'},
              {title: 'Template'},
              {title: 'Status'},
            ]}
          >
            {rowMarkup}
          </IndexTable>
          </Card>
        </Tabs>
      
    </Page>
  )
}