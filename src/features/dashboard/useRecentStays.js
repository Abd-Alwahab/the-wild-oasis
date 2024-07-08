import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get("last") ?? 7) || 7;

  const queryDateISO = subDays(new Date(), numDays).toISOString();

  const { data: recentStays, isLoading: isLoadingRecentStays } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDateISO),
  });

  return {
    recentStays: recentStays?.filter(
      (stay) => stay.status === "checked-out" || stay.status === "checked-in"
    ),
    isLoadingRecentStays,
  };
};
