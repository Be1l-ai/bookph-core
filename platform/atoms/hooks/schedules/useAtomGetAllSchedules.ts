import { useQuery } from "@tanstack/react-query";

import { SUCCESS_STATUS } from "@bookph/core/platform-constants";
import type { ApiResponse } from "@bookph/core/platform-types";
import type { GetAvailabilityListHandlerReturn } from "@bookph/core/trpc/server/routers/viewer/availability/list.handler";

import http from "../../lib/http";
import { useAtomsContext } from "../useAtomsContext";

export const QUERY_KEY = "use-atom-user-schedules";

export const useAtomGetAllSchedules = () => {
  const pathname = "atoms/schedules/all";
  const { isInit, accessToken } = useAtomsContext();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => {
      return http.get<ApiResponse<GetAvailabilityListHandlerReturn>>(pathname).then((res) => {
        if (res.data.status === SUCCESS_STATUS) {
          return res.data.data;
        }
        throw new Error(res.data.error?.message);
      });
    },
    enabled: isInit && !!accessToken,
  });

  return { isLoading, error, data, refetch };
};
