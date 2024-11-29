import type {
  HeadersFunction,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { initShopify } from "../shopify.server";
import enTranslations from '@shopify/polaris/locales/en.json';
import { NavMenu } from "@shopify/app-bridge-react";
import { AppProviderOverride } from "../app-provider-override";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  await initShopify(context).authenticate.admin(request);

  return json({ apiKey: context.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProviderOverride isEmbeddedApp apiKey={apiKey} i18n={enTranslations}>
      <NavMenu>
        <Link to="/app" rel="home">Home</Link>
        <Link to="/app/orders">Orders</Link>
        <Link to="/app/rules">Rules</Link>
        <Link to="/app/templates">Templates</Link>
        <Link to="/app/activities">Event Timeline</Link>
        {/*<Link to="/app/reports">Reports</Link>*/}
        <Link to="/app/settings">Settings</Link>
        <Link to="/app/contactus">Contact Us</Link>
      </NavMenu>
      <Outlet />
    </AppProviderOverride>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
