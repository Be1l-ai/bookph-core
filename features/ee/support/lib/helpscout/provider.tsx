import { FC } from "react";
import { LiveChatLoaderProvider } from "react-live-chat-loader";

// BookPH: Helpscout support widget disabled for AGPLv3 self-hosted version
const Provider: FC<{ children: React.ReactNode }> = ({ children }) => (
  // <LiveChatLoaderProvider providerKey={process.env.NEXT_PUBLIC_HELPSCOUT_KEY || ""} provider="helpScout">
  //   <>{children}</>
  // </LiveChatLoaderProvider>
  <>{children}</>
);

export default Provider;
