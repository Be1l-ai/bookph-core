import { createContainer } from "@evyweb/ioctopus";

import { PermissionCheckService } from "@bookph/core/features/pbac/services/permission-check.service";
import { moduleLoader as loggerModuleLoader } from "@bookph/core/features/di/shared/services/logger.service";
import { taskerServiceModule } from "@bookph/core/features/di/shared/services/tasker.service";
import { SHARED_TOKENS } from "@bookph/core/features/di/shared/shared.tokens";
import { UserRepository } from "@bookph/core/features/users/repositories/UserRepository";
import {
  createWatchlistFeature,
  type WatchlistFeature,
} from "@bookph/core/features/watchlist/lib/facade/WatchlistFeature";
import type { IGlobalWatchlistRepository } from "@bookph/core/features/watchlist/lib/interface/IWatchlistRepositories";
import type { IOrganizationWatchlistRepository } from "@bookph/core/features/watchlist/lib/interface/IWatchlistRepositories";
import { AdminWatchlistOperationsService } from "@bookph/core/features/watchlist/lib/service/AdminWatchlistOperationsService";
import { AdminWatchlistQueryService } from "@bookph/core/features/watchlist/lib/service/AdminWatchlistQueryService";
import type { GlobalBlockingService } from "@bookph/core/features/watchlist/lib/service/GlobalBlockingService";
import type { OrganizationBlockingService } from "@bookph/core/features/watchlist/lib/service/OrganizationBlockingService";
import { OrganizationWatchlistOperationsService } from "@bookph/core/features/watchlist/lib/service/OrganizationWatchlistOperationsService";
import { OrganizationWatchlistQueryService } from "@bookph/core/features/watchlist/lib/service/OrganizationWatchlistQueryService";
import type { WatchlistAuditService } from "@bookph/core/features/watchlist/lib/service/WatchlistAuditService";
import type { WatchlistService } from "@bookph/core/features/watchlist/lib/service/WatchlistService";
import { PrismaBookingReportRepository } from "@bookph/core/lib/server/repository/bookingReport";
import { WatchlistRepository } from "@bookph/core/lib/server/repository/watchlist.repository";
import { prisma } from "@bookph/core/prisma";
import { moduleLoader as prismaModuleLoader } from "@bookph/core/features/di/modules/Prisma";

import { WATCHLIST_DI_TOKENS } from "../Watchlist.tokens";
import { watchlistModule } from "../modules/Watchlist.module";

export const watchlistContainer = createContainer();

prismaModuleLoader.loadModule(watchlistContainer);
loggerModuleLoader.loadModule(watchlistContainer);

watchlistContainer.load(SHARED_TOKENS.TASKER, taskerServiceModule);

watchlistContainer.load(WATCHLIST_DI_TOKENS.GLOBAL_WATCHLIST_REPOSITORY, watchlistModule);
watchlistContainer.load(WATCHLIST_DI_TOKENS.ORGANIZATION_WATCHLIST_REPOSITORY, watchlistModule);
watchlistContainer.load(WATCHLIST_DI_TOKENS.AUDIT_REPOSITORY, watchlistModule);
watchlistContainer.load(WATCHLIST_DI_TOKENS.WATCHLIST_SERVICE, watchlistModule);
watchlistContainer.load(WATCHLIST_DI_TOKENS.AUDIT_SERVICE, watchlistModule);
watchlistContainer.load(WATCHLIST_DI_TOKENS.GLOBAL_BLOCKING_SERVICE, watchlistModule);
watchlistContainer.load(WATCHLIST_DI_TOKENS.ORGANIZATION_BLOCKING_SERVICE, watchlistModule);

export function getWatchlistService() {
  return watchlistContainer.get<WatchlistService>(WATCHLIST_DI_TOKENS.WATCHLIST_SERVICE);
}

export function getGlobalBlockingService() {
  return watchlistContainer.get<GlobalBlockingService>(WATCHLIST_DI_TOKENS.GLOBAL_BLOCKING_SERVICE);
}

export function getOrganizationBlockingService() {
  return watchlistContainer.get<OrganizationBlockingService>(
    WATCHLIST_DI_TOKENS.ORGANIZATION_BLOCKING_SERVICE
  );
}

export function getAuditService() {
  return watchlistContainer.get<WatchlistAuditService>(WATCHLIST_DI_TOKENS.AUDIT_SERVICE);
}

export function getGlobalWatchlistRepository() {
  return watchlistContainer.get<IGlobalWatchlistRepository>(WATCHLIST_DI_TOKENS.GLOBAL_WATCHLIST_REPOSITORY);
}

export function getOrganizationWatchlistRepository() {
  return watchlistContainer.get<IOrganizationWatchlistRepository>(
    WATCHLIST_DI_TOKENS.ORGANIZATION_WATCHLIST_REPOSITORY
  );
}

export async function getWatchlistFeature(): Promise<WatchlistFeature> {
  return createWatchlistFeature(watchlistContainer);
}

export function getAdminWatchlistOperationsService(): AdminWatchlistOperationsService {
  const watchlistRepo = new WatchlistRepository(prisma);
  const bookingReportRepo = new PrismaBookingReportRepository(prisma);

  return new AdminWatchlistOperationsService({
    watchlistRepo,
    bookingReportRepo,
  });
}

export function getOrganizationWatchlistOperationsService(
  organizationId: number
): OrganizationWatchlistOperationsService {
  const watchlistRepo = new WatchlistRepository(prisma);
  const bookingReportRepo = new PrismaBookingReportRepository(prisma);
  const permissionCheckService = new PermissionCheckService();

  return new OrganizationWatchlistOperationsService({
    watchlistRepo,
    bookingReportRepo,
    permissionCheckService,
    organizationId,
  });
}

export function getAdminWatchlistQueryService(): AdminWatchlistQueryService {
  const watchlistRepo = new WatchlistRepository(prisma);
  const bookingReportRepo = new PrismaBookingReportRepository(prisma);
  const userRepo = new UserRepository(prisma);

  return new AdminWatchlistQueryService({
    watchlistRepo,
    bookingReportRepo,
    userRepo,
    prisma,
  });
}

export function getOrganizationWatchlistQueryService(): OrganizationWatchlistQueryService {
  const watchlistRepo = new WatchlistRepository(prisma);
  const userRepo = new UserRepository(prisma);
  const permissionCheckService = new PermissionCheckService();

  return new OrganizationWatchlistQueryService({
    watchlistRepo,
    userRepo,
    permissionCheckService,
  });
}
