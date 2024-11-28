import {Button, Popover, ActionList} from '@shopify/polaris';
import {ArchiveIcon, DuplicateIcon, IconsFilledIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

export default function OrderButton() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      Test
    </Button>
  );

  return (
    <Popover
    active={false}
    activator={activator}
    autofocusTarget="first-node"
    onClose={toggleActive}
  >
    <ActionList
      actionRole="menuitem"
      items={[
        {content: 'Duplicate', icon: DuplicateIcon},
        {content: 'Archive', icon: ArchiveIcon},
      ]}
    />
  </Popover>
  );
}