import {
  AppProvider as PolarisAppProvider,
  type AppProviderProps as PolarisAppProviderProps,
} from '@shopify/polaris';
import { Link } from '@remix-run/react';
import type {
  LinkLikeComponent,
  LinkLikeComponentProps,
} from '@shopify/polaris/build/ts/src/utilities/link';
import { forwardRef } from 'react';


const APP_BRIDGE_URL =
  'https://cdn.shopify.com/shopifycloud/app-bridge.js';

export interface AppProviderProps
  extends Omit<PolarisAppProviderProps, 'linkComponent' | 'i18n'> {
  apiKey: string;
  isEmbeddedApp?: boolean;
  i18n: PolarisAppProviderProps['i18n'];
  __APP_BRIDGE_URL?: string;
}

const RemixPolarisLink = forwardRef<
  HTMLAnchorElement,
  LinkLikeComponentProps
>((props, ref) => (
  <Link {...props} to={props.url ?? props.to} ref={ref} />
)) as LinkLikeComponent;

export function AppProviderOverride(props: AppProviderProps) {
  const {
      children,
      apiKey,
      i18n,
      isEmbeddedApp = true,
      __APP_BRIDGE_URL = APP_BRIDGE_URL,
      ...polarisProps
  } = props;

  return (
      <>
          {isEmbeddedApp && <script src={__APP_BRIDGE_URL} data-api-key={apiKey} />}
          <PolarisAppProvider
              {...polarisProps}
              linkComponent={RemixPolarisLink}
              i18n={i18n}
          >
              {children}
          </PolarisAppProvider>
      </>
  );
}