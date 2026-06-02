"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DEFAULT_PAGE } from "@/constants";

type AgentFilters = {
  page: number;
  search: string;
};

export const useAgentsFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: AgentFilters = {
    page: Number(searchParams.get("page")) || DEFAULT_PAGE,
    search: searchParams.get("search") ?? "",
  };

  const setFilters = useCallback(
    (nextFilters: Partial<AgentFilters>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(nextFilters).forEach(([key, value]) => {
        if (value && value !== DEFAULT_PAGE) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      if ("search" in nextFilters) {
        params.delete("page");
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams],
  );

  return [filters, setFilters] as const;
};
