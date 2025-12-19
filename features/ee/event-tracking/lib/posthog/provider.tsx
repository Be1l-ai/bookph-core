"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, useRef } from "react";

import { useGeo } from "@calcom/web/app/GeoContext";

function Provider({ children }: { children: React.ReactNode }) {
  // BookPH: PostHog telemetry disabled for AGPLv3 self-hosted version
  // Original PostHog initialization code has been disabled
  // const initializeOnce = useRef(false);
  // const { country } = useGeo();
  //
  // useEffect(() => {
  //   if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || initializeOnce.current) return;
  //   initializeOnce.current = true;
  //   const isUS = country === "US";
  //   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, { ... });
  // }, [country]);
  //
  // return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
  
  // Simply return children without telemetry tracking
  return <>{children}</>;
}

export default Provider;
