import type { AppLoadContext } from "@remix-run/cloudflare";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import {
  ApiVersion,
  AppDistribution,
  DeliveryMethod,
  LATEST_API_VERSION,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";
import { PrismaClient } from "@prisma/client";

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    env: {
      SHOPIFY_API_KEY: string;
      SHOPIFY_API_SECRET: string;
      SHOPIFY_APP_URL: string;
      SCOPES: string;
      SHOP_CUSTOM_DOMAIN: string;
      SESSION: PrismaSessionStorage<PrismaClient>;
      DB: D1Database;
    };
  }
}

export const initShopify = (context: AppLoadContext) => {
  const shopify = shopifyApp({
    apiKey: context.env.SHOPIFY_API_KEY,
    apiSecretKey: context.env.SHOPIFY_API_SECRET || "",
    apiVersion: ApiVersion.October23,
    scopes: context.env.SCOPES?.split(","),
    appUrl: context.env.SHOPIFY_APP_URL || "",
    authPathPrefix: "/auth",
    sessionStorage: new PrismaSessionStorage(prisma),
    distribution: AppDistribution.AppStore,
    restResources,
    webhooks: {
      APP_UNINSTALLED: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/webhooks",
      },
    },
    hooks: {
      afterAuth: async ({ session }) => {
        shopify.registerWebhooks({ session });
      },
    },
    future: {
      unstable_newEmbeddedAuthStrategy: true,
    },
    ...(context.env.SHOP_CUSTOM_DOMAIN
      ? { customShopDomains: [context.env.SHOP_CUSTOM_DOMAIN] }
      : {}),
  });

  return shopify;
};
