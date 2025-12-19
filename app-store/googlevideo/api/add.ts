import { defaultHandler } from "@bookph/core/lib/server/defaultHandler";

export default defaultHandler({
  GET: import("./_getAdd"),
});
