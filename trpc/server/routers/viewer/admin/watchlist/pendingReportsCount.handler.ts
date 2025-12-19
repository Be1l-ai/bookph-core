import { getAdminWatchlistQueryService } from "@bookph/core/features/di/watchlist/containers/watchlist";

export const pendingReportsCountHandler = async () => {
  const service = getAdminWatchlistQueryService();
  return await service.getPendingReportsCount();
};
