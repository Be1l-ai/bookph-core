"use client";

import NoSSR from "@bookph/core/lib/components/NoSSR";

import { UsersTable } from "../components/UsersTable";

const DeploymentUsersListPage = () => {
  return (
    <>
      <NoSSR>
        <UsersTable />
      </NoSSR>
    </>
  );
};

export default DeploymentUsersListPage;
