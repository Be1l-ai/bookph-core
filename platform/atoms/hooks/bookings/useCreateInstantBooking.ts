import { useMutation } from "@tanstack/react-query";

import type { BookingCreateBody } from "@bookph/core/features/bookings/lib/bookingCreateBodySchema";
import type { BookingResponse } from "@bookph/core/features/bookings/types";
import { SUCCESS_STATUS } from "@bookph/core/platform-constants";
import type { ApiResponse, ApiErrorResponse, ApiSuccessResponse } from "@bookph/core/platform-types";

import http from "../../lib/http";

interface IUseCreateInstantBooking {
  onSuccess?: (res: ApiSuccessResponse<BookingResponse>) => void;
  onError?: (err: ApiErrorResponse | Error) => void;
}
export const useCreateInstantBooking = (
  { onSuccess, onError }: IUseCreateInstantBooking = {
    onSuccess: () => {
      return;
    },
    onError: () => {
      return;
    },
  }
) => {
  const createInstantBooking = useMutation<ApiResponse<BookingResponse>, Error, BookingCreateBody>({
    mutationFn: (data) => {
      return http.post<ApiResponse<BookingResponse>>("/bookings/instant", data).then((res) => {
        if (res.data.status === SUCCESS_STATUS) {
          return res.data;
        }
        throw new Error(res.data.error.message);
      });
    },
    onSuccess: (data) => {
      if (data.status === SUCCESS_STATUS) {
        onSuccess?.(data);
      } else {
        onError?.(data);
      }
    },
    onError: (err) => {
      onError?.(err);
    },
  });
  return createInstantBooking;
};
