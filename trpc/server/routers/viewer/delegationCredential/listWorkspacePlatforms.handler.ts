import { WorkspacePlatformRepository } from "@bookph/core/lib/server/repository/workspacePlatform";

export default async function handler() {
  const workspacePlatforms = await WorkspacePlatformRepository.findAll();

  return workspacePlatforms;
}
