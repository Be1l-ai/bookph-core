"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, type FC } from "react";
import { IntercomProvider } from "react-use-intercom";

import { useBootIntercom } from "@calcom/ee/support/lib/intercom/useIntercom";
import useHasPaidPlan from "@calcom/features/billing/hooks/useHasPaidPlan";
import { IntercomContactForm } from "@calcom/features/ee/support/components/IntercomContactForm";
import { useFlagMap } from "@calcom/features/flags/context/provider";
import useMediaQuery from "@calcom/lib/hooks/useMediaQuery";

declare global {
  interface Window {
    Support?: {
      open: () => void;
      shouldShowTriggerButton: (showTrigger: boolean) => void;
    };
  }
}

function IntercomBootstrap() {
  useBootIntercom();
  return null;
}

const Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  // BookPH: Intercom support widget disabled for AGPLv3 self-hosted version
  // All Intercom functionality has been disabled
  // const { hasPaidPlan } = useHasPaidPlan();
  // const isMobile = useMediaQuery("(max-width: 768px)");
  // const flagMap = useFlagMap();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const router = useRouter();
  // const { data: session } = useSession();
  // const isBeingImpersonated = !!session?.user?.impersonatedBy?.id;
  // const shouldOpenSupport = pathname === "/event-types" && (searchParams?.has("openPlain") || searchParams?.has("openSupport"));
  // ... (all Intercom initialization code removed)
  
  // Simply return children without Intercom support widget
  return <>{children}</>;
};

export default Provider;
