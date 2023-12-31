/* eslint-disable @typescript-eslint/no-var-requires */
import parser from "accept-language-parser";
import type { IncomingMessage } from "http";

import type { Maybe } from "@calcom/trpc/server";

const { i18n } = require("@calcom/config/next-i18next.config");

export function getLocaleFromHeaders(req: IncomingMessage): string {
  let preferredLocale: string | null | undefined;
  if (req.headers["accept-language"]) {
    preferredLocale = parser.pick(i18n.locales, req.headers["accept-language"]) as Maybe<string>;
  }
  return preferredLocale ?? i18n.defaultLocale;
}

// Workaround for using router.locales from old router
export const locales = i18n.locales as string[];

export const localeOptions = locales.map((locale) => ({
  value: locale,
  label: new Intl.DisplayNames(locale, { type: "language" }).of(locale) || "",
}));
