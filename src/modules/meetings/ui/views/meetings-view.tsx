"use client";

import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    }),
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {JSON.stringify(data)}
    </div>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a fews econds"
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Something went wrong"
    />
  );
};
