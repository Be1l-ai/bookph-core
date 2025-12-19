import { useSession } from "next-auth/react";

import { trpc } from "@bookph/core/trpc/react";

export default function useApp(appId: string) {
  const { status } = useSession();

  return trpc.viewer.apps.appById.useQuery(
    { appId },
    {
      enabled: status === "authenticated",
    }
  );
}
