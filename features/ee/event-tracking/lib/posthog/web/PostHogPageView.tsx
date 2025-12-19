"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

// BookPH: PostHog telemetry disabled for AGPLv3 self-hosted version
// const TRACKED_ROUTES = [
//   "/signup",
//   "/auth/verify-email",
//   "/getting-started",
//   "/onboarding/getting-started",
//   "/settings/teams/new",
//   "/settings/teams",
// ];

export default function PostHogPageView() {
  // BookPH: PostHog telemetry disabled - no pageview tracking
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const posthog = usePostHog();
  //
  // useEffect(() => {
  //   const shouldTrack = TRACKED_ROUTES.some(route => pathname?.startsWith(route));
  //   if (!shouldTrack) return;
  //   if (pathname && posthog) {
  //     let url = window.origin + pathname;
  //     if (searchParams?.toString()) {
  //       url = `${url}?${searchParams.toString()}`;
  //     }
  //     posthog.capture("$pageview", { $current_url: url });
  //   }
  // }, [pathname, searchParams, posthog]);

  return null;
}
