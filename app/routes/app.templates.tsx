import {Box, InlineGrid, Link, MediaCard, Page} from '@shopify/polaris';

export default function Templates() {
  return (
    <Page 
      title='Templates'
      subtitle='You can choose what the fuck ever you want.'
    >
      <InlineGrid gap="400" columns={{xs: 1, sm: 2, md: 3, lg: 3, xl: 3}}>
        <Box>
          <MediaCard
            portrait
            title="Shelby Cobra"
            primaryAction={{
              content: 'Make it yours',
              onAction: () => {},
            }}
            description="In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business."
            popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
          >
            <Link url='#'>
              <img
                alt=""
                width="100%"
                height="100%"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                src="https://img.freepik.com/free-vector/minimal-yellow-invoice-template-vector-design_1017-12070.jpg"
              />
            </Link>
          </MediaCard>
        </Box>
        <Box>
          <MediaCard
            portrait
            title="De Tomaso Pantera"
            primaryAction={{
              content: 'Make it yours',
              onAction: () => {},
            }}
            description="In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business."
            popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
          >
            <Link url='#'>
              <img
                alt=""
                width="100%"
                height="100%"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                src="https://img.freepik.com/free-vector/modern-invoice-template-design-your-business_1017-12657.jpg"
              />
            </Link>
          </MediaCard>
        </Box>
        <Box>
          <MediaCard
            portrait
            title="Alfa Romeo Spider Duetto"
            primaryAction={{
              content: 'Make it yours',
              onAction: () => {},
            }}
            description="In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business."
            popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
          >
            <Link url='#'>
              <img
                alt=""
                width="100%"
                height="100%"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                src="https://img.freepik.com/premium-vector/modern-minimal-clean-style-invoice-template-design_1017-13364.jpg"
              />
            </Link>
          </MediaCard>
        </Box>
      </InlineGrid>
    </Page>
  );
}