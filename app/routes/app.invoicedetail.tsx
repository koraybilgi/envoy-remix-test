import { Badge, BlockStack, Box, Button, ButtonGroup, Card, Divider, Image, InlineGrid, Link, Page, Scrollable, Text} from "@shopify/polaris";
import { ArrowDownIcon, EditIcon, EmailFollowUpIcon, ExternalIcon, PrintIcon, SendIcon} from '@shopify/polaris-icons';
import Timeline from "../components/timeline/timeline";

export default function InvoiceDetail() {

  const timelineItems = [
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          A refund was processed for order <Badge>#1242</Badge>.
        </>
      ),
      timestamp: new Date('2024-09-12T13:30:00')
    },
    {
      tone: 'base',
      icon: <img src='/timeline-icon_ricemill.png' width='16' height='16' />,
      url: undefined,
      timelineEvent: (
        <>
          Order <Badge>#1241</Badge> was successfully delivered.
        </>
      ),
      timestamp: new Date('2024-09-12T09:29:00')
    },
    {
      tone: 'critical',
      url: undefined,
      timelineEvent: (
        <>
          Order <Badge>#1240</Badge> flagged for review due to suspicious activity.
        </>
      ),
      timestamp: new Date('2024-09-11T15:00:00')
    },
    {
      tone: 'success',
      url: 'https://example.com/order/1235',
      timelineEvent: (
        <>
          Order <Badge>#1235</Badge> shipped via Fedex.
        </>
      ),
      timestamp: new Date('2024-09-11T14:59:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: <>Customer logged in.</>,
      timestamp: new Date('2024-09-11T09:44:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: <>Failed login attempt detected.</>,
      timestamp: new Date('2024-09-11T06:59:00')
    },
    {
      tone: 'base',
      url: undefined,
      icon: <img src='/timeline-icon_loyalty.png' width='16' height='16' />,
      timelineEvent: (
        <>
          Customer redeemed 50 reward points on an order <Badge>#1237</Badge>
        </>
      ),
      timestamp: new Date('2024-09-10T18:19:00')
    },
    {
      tone: 'base',
      url: undefined,
      icon: <img src='/timeline-icon_loyalty.png' width='16' height='16' />,
      timelineEvent: (
        <>Customer earned 100 reward points for subscribing to your mailing list.</>
      ),
      timestamp: new Date('2024-09-10T18:14:00')
    },
    {
      tone: 'caution',
      url: undefined,
      timelineEvent: <>Account flagged for unusual activity.</>,
      timestamp: new Date('2024-09-10T16:00:00')
    },
    {
      tone: 'base',
      url: 'https://example.com/fraud-check',
      timelineEvent: (
        <>
          Fraud check was initiated for order <Badge>#1236</Badge>
        </>
      ),
      timestamp: new Date('2024-09-10T12:10:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          Customer placed an order <Badge>#1234</Badge>
        </>
      ),
      timestamp: new Date('2024-09-10T10:30:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          Customer placed order <Badge>#1239</Badge>
        </>
      ),
      timestamp: new Date('2024-09-09T13:25:00')
    },
    {
      tone: 'base',
      url: 'https://example.com/points-earned',
      timelineEvent: <>Customer earned 200 reward points after purchase.</>,
      timestamp: new Date('2024-09-09T13:00:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: <>Customer earned 100 reward points.</>,
      timestamp: new Date('2024-09-09T11:30:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: <>Customer contacted support regarding an issue with order.</>,
      timestamp: new Date('2024-09-09T11:00:00')
    },
    {
      tone: 'critical',
      url: undefined,
      icon: <img src='/timeline-icon_security.png' width='16' height='16' />,
      timelineEvent: <>Customer flagged for fraud. (Securité)</>,
      timestamp: new Date('2024-09-09T08:15:00')
    },
    {
      tone: 'base',
      url: undefined,
      icon: <img src='/timeline-icon_ricemill.png' width='16' height='16' />,
      timelineEvent: <>Customer updated their shipping address.</>,
      timestamp: new Date('2024-09-08T14:09:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: <>Customer&apos;s email address was updated.</>,
      timestamp: new Date('2024-09-08T12:44:00')
    },
    {
      tone: 'base',
      url: 'https://example.com/account-updated',
      timelineEvent: <>Account details updated.</>,
      timestamp: new Date('2024-09-08T11:19:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: <>Customer subscribed to newsletter.</>,
      timestamp: new Date('2024-09-07T09:29:00')
    }
  ];

  return (
    <Page
      backAction={{ content: "Orders", url: "/app/orders" }}
      title="Invoice: #123123"
      additionalMetadata={"Created at: Jun 12, 2024"}
      titleMetadata={<><Badge progress="complete" tone="success">Sent</Badge> <Badge progress="complete" tone="success">Printed</Badge></>}
      secondaryActions={[
        {
          content: "Edit",
          icon: EditIcon,
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Edit action"),
        },
        {
          content: "Print",
          icon: PrintIcon,
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Print action"),
        },
        {
          content: "Send",
          icon: EmailFollowUpIcon,
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Print action"),
        },
        {
          content: "Download",
          icon: ArrowDownIcon,
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Print action"),
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="400">
        <BlockStack gap="400">
          <Card roundedAbove="sm">
            <Image 
            source='https://marketplace.canva.com/EAE92Pl9bfg/3/0/1131w/canva-black-and-gray-minimal-freelancer-invoice-jGjYkgG4jDg.jpg' 
            width={600}
            alt="123"
            ></Image>
          </Card>
        </BlockStack>
        <BlockStack gap={{ xs: "400", md: "200" }}>
          <Box padding='200'>
            <BlockStack gap="200">
              <InlineGrid columns={{ xs: 1, md: "1fr auto" }} alignItems="start" gap={'200'}>
                <Text as="h2" variant="headingMd">
                  Timeline:
                </Text>
                <Button variant="plain" onClick={() => {}} accessibilityLabel="Preview">
                  Show detailed
                </Button>
              </InlineGrid>
            </BlockStack>
            <Box padding='200'/>
            <Scrollable
              shadow
              hint={true}
              style={{height: '50vw'}}
              scrollbarGutter="stable"
              scrollbarWidth="none"
            >
              <Timeline items={timelineItems} />
            </Scrollable>
            </Box>
        </BlockStack>
      </InlineGrid>
    </Page>
  )
}