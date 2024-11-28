import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { initShopify } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const shopify = initShopify(context);
  const { shop, topic, session, admin } = await shopify.authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);
  
  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }

      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
