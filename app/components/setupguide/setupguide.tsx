import { useState, useId } from 'react';
import {
  BlockStack,
  Card,
  Text,
  InlineStack,
  ButtonGroup,
  Button,
  ProgressBar,
  Box,
  Collapsible,
  Tooltip,
  Spinner,
  Icon,
  Popover,
  ActionList,
  Image,
} from '@shopify/polaris';
import {
  MenuHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
  XIcon,
  ClockIcon,
} from '@shopify/polaris-icons';
import styles from './setupguide.module.css';

export type SetupItemProps = {
  id: number;
  title: string;
  description: string;
  image?: { url: string; alt: string };
  complete: boolean;
  primaryButton?: { content: string; props: Object };
  secondaryButton?: { content: string; props: Object };
};

type SetupGuideProps = {
  onDismiss: () => void;
  onStepComplete: (id: string) => Promise<void>;
  items: SetupItemProps[];
};

export const SetupGuide: React.FC<SetupGuideProps> = ({ onDismiss, onStepComplete, items }) => {
  const [expanded, setExpanded] = useState(items.findIndex((item) => !item.complete));
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  const [popoverActive, setPopoverActive] = useState(false);
  const accessId = useId();
  const completedItemsLength = items.filter((item) => item.complete).length;

  return (
    <Card padding="0">
      <Box padding="400" paddingBlockEnd="400">
        <BlockStack>
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h3" variant="headingMd">
              Setup Guide
            </Text>
            <ButtonGroup gap="tight" noWrap>
              <Popover
                active={popoverActive}
                onClose={() => setPopoverActive((prev) => !prev)}
                activator={
                  <Button
                    onClick={() => setPopoverActive((prev) => !prev)}
                    variant="tertiary"
                    icon={MenuHorizontalIcon}
                  />
                }
              >
                <ActionList
                  actionRole="menuitem"
                  items={[
                    {
                      content: 'Dismiss',
                      onAction: onDismiss,
                      prefix: (
                        <div
                          style={{
                            height: '1rem',
                            width: '1rem',
                            paddingTop: '.05rem',
                          }}
                        >
                          <Icon tone="subdued" source={XIcon} />
                        </div>
                      ),
                    },
                  ]}
                />
              </Popover>

              <Button
                variant="tertiary"
                icon={isGuideOpen ? ChevronUpIcon : ChevronDownIcon}
                onClick={() => {
                  setIsGuideOpen((prev) => {
                    if (!prev) setExpanded(items.findIndex((item) => !item.complete));
                    return !prev;
                  });
                }}
                ariaControls={accessId}
              />
            </ButtonGroup>
          </InlineStack>
          <Text as="p" variant="bodyMd">
            Use this personalized guide to get your app up and running.
          </Text>
          <div style={{ marginTop: '.8rem' }}>
            <InlineStack blockAlign="center" gap="200">
              {completedItemsLength === items.length ? (
                <div style={{ maxHeight: '1rem' }}>
                  <InlineStack wrap={false} gap="100">
                    <Icon
                      source={CheckIcon}
                      tone="subdued"
                      accessibilityLabel="Check icon to indicate completion of Setup Guide"
                    />
                    <Text as="p" variant="bodySm" tone="subdued">
                      Done
                    </Text>
                  </InlineStack>
                </div>
              ) : (
                <Text as="span" variant="bodySm">
                  {`${completedItemsLength} / ${items.length} completed`}
                </Text>
              )}

              {completedItemsLength !== items.length ? (
                <div style={{ width: '100px' }}>
                  <ProgressBar
                    progress={(items.filter((item) => item.complete).length / items.length) * 100}
                    size="small"
                    tone="primary"
                    animated
                  />
                </div>
              ) : null}
            </InlineStack>
          </div>
        </BlockStack>
      </Box>
      <Collapsible open={isGuideOpen} id={accessId}>
        <Box padding="200">
          <BlockStack gap="100">
            {items.map((item: any) => (
              <SetupItem
                key={item.id}
                expanded={expanded === item.id}
                setExpanded={() => setExpanded(item.id)}
                onComplete={onStepComplete}
                {...item}
              />
            ))}
          </BlockStack>
        </Box>
      </Collapsible>
      {completedItemsLength === items.length ? (
        <Box
          background="bg-surface-secondary"
          borderBlockStartWidth="025"
          borderColor="border-secondary"
          padding="300"
        >
          <InlineStack align="end">
            <Button onClick={onDismiss}>Dismiss Guide</Button>
          </InlineStack>
        </Box>
      ) : null}
    </Card>
  );
};

const SetupItem: React.FC<SetupItemProps & {
  expanded: boolean;
  setExpanded: () => void;
  onComplete: (id: number) => Promise<void>;
}> = ({
  complete,
  onComplete,
  expanded,
  setExpanded,
  title,
  description,
  image,
  primaryButton,
  secondaryButton,
  id,
}) => {
  const [loading, setLoading] = useState(false);

  const completeItem = async () => {
    setLoading(true);
    await onComplete(id);
    setLoading(false);
  };

  return (
    <Box borderRadius="200" background={expanded ? 'bg-surface-active' : undefined}>
      <div className={`${styles.setupItem} ${expanded ? styles.setupItemExpanded : ''}`}>
        <InlineStack gap="200" align="start" blockAlign="start" wrap={false}>
          <Tooltip content={complete ? 'Mark as not done' : 'Mark as done'} activatorWrapper="div">
            <Button 
            onClick={completeItem} 
            variant="monochromePlain"
            icon=
                {loading ? (
                  <Spinner size='large' />
                ) : complete ? (
                  <Icon source={CheckIcon} tone='success'/>
                ) : (
                  <Icon source={ClockIcon} tone='critical'/>
                )}
            />
          </Tooltip>
          <div
            className={styles.itemContent}
            onClick={expanded ? () => null : setExpanded}
            style={{
              cursor: expanded ? 'default' : 'pointer',
              paddingTop: '.15rem',
              width: '100%',
            }}
          >
            <BlockStack gap="300" id={id.toString()}>
              <Text as="h4" variant={expanded ? 'headingSm' : 'bodyMd'}>
                {title}
              </Text>
              <Collapsible open={expanded} id={id.toString()}>
                <Box paddingBlockEnd="150" paddingInlineEnd="150">
                  <BlockStack gap="400">
                    <Text as="p" variant="bodyMd">
                      {description}
                    </Text>
                    {primaryButton || secondaryButton ? (
                      <ButtonGroup gap="loose">
                        {primaryButton ? (
                          <Button variant="primary">
                            {primaryButton.content}
                          </Button>
                        ) : null}
                        {secondaryButton ? (
                          <Button variant="tertiary">
                            {secondaryButton.content}
                          </Button>
                        ) : null}
                      </ButtonGroup>
                    ) : null}
                  </BlockStack>
                </Box>
              </Collapsible>
            </BlockStack>
            {image && expanded ? (
              <Image
                className={styles.itemImage}
                source={image.url}
                alt={image.alt}
                style={{ maxHeight: '7.75rem' }}
              />
            ) : null}
          </div>
        </InlineStack>
      </div>
    </Box>
  );
};