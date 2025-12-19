import type { RouterOutputs } from "@bookph/core/trpc/react";

export type CallData = RouterOutputs["viewer"]["aiVoiceAgent"]["listCalls"]["calls"][number];

export type CallDetailsPayload = {
  showModal: boolean;
  selectedCall?: CallData;
};

export type CallDetailsState = {
  callDetailsSheet: CallDetailsPayload;
};

export type CallDetailsAction =
  | {
      type: "OPEN_CALL_DETAILS";
      payload: CallDetailsPayload;
    }
  | {
      type: "CLOSE_MODAL";
    };