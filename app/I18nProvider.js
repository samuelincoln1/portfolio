"use client";
import "./i18n";

// Loads the i18next setup on the client; the root layout is a server component.
export default function I18nProvider({ children }) {
  return children;
}
