"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { useAgentsFilters } from "../../hooks/use-agent-filters";
import { DataPagination } from "../components/data-pagination";

export const AgentsView = () => {
  const trpc = useTRPC();
  const [filters, setFilters] = useAgentsFilters();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      page: filters.page,
      search: filters.search,
    }),
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col">
      <DataTable data={data.items} columns={columns} />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </div>
  );
};
