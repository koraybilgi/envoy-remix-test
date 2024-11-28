import { useBreakpoints, Divider, TextField, Box, InlineGrid, Page, Card, Text, BlockStack, ButtonGroup, Button, AccountConnection } from '@shopify/polaris';

function SettingsPage() {
  const { smUp } = useBreakpoints();
  return (
    <Page
      title='Settings'
      primaryAction={{ content: "Save"}}
      secondaryActions={[
        {
          content: "Cancel",
          accessibilityLabel: "Cancel",
          onAction: () => alert("Cancel action"),
        },
      ]}
      >
      <BlockStack gap={{ xs: "800", sm: "800" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: "400", sm: "0" }}
            paddingInlineEnd={{ xs: "400", sm: "0" }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Company
              </Text>
              <Text as="p" variant="bodyMd">
                Company settings
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <TextField label="Company name" autoComplete='off'/>
              <TextField label="Company address" autoComplete='off'/>
            </BlockStack>
          </Card>
        </InlineGrid>
        {smUp ? <Divider /> : null}
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: "400", sm: "0" }}
            paddingInlineEnd={{ xs: "400", sm: "0" }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
              Export settings
              </Text>
              <Text as="p" variant="bodyMd">
              Connect cloud storage. This allows you to export PDF documents directly to Dropbox, Google Cloud or server storage.
              </Text>
            </BlockStack>
          </Box>
          <InlineGrid gap={'400'}>
            <AccountConnection
              accountName={'Dropbox'}
              connected={false}
              title="Dropbox"
              action={{content: 'Connect'}}
              details={'Account is not connected.'}
              termsOfService={(
                <p>
                  To connect your <strong>Dropbox</strong> storage, simply click on the "Connect" button, then in the popup window approve permission request.
                </p>
              )}
            />
            <AccountConnection
              accountName={'Google Drive'}
              connected={false}
              title="Google Drive"
              action={{content: 'Connect'}}
              details={'Account is not connected.'}
              termsOfService={(
                <p>
                  To connect your <strong>Google Drive</strong> storage, simply click on the "Connect" button, then in the popup window approve permission request.
                </p>
              )}
            />
            <AccountConnection
              accountName={'Google Drive'}
              connected={false}
              title="Server storage"
              action={{content: 'Connect'}}
              details={'Account is not connected.'}
              termsOfService={(
                <p>
                  We recommend to create a new <strong>FTP account</strong> with very limited access to read and write only a single directory.
                </p>
              )}
            />
          </InlineGrid>
        </InlineGrid>
        <InlineGrid>
          <ButtonGroup>
            <Button variant="primary">Save</Button>
            <Button>Cancel</Button>
          </ButtonGroup>
        </InlineGrid>
        <Box padding={'300'}></Box>
      </BlockStack>
      
    </Page>
  )
}


export default SettingsPage;