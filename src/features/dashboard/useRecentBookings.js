import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get("last") ?? 7) || 7;

  const queryDateISO = subDays(new Date(), numDays).toISOString();

  const { data: recentBookings, isLoading: isLoadingRecentBookings } = useQuery(
    {
      queryKey: ["bookings", `last-${numDays}`],
      queryFn: () => getBookingsAfterDate(queryDateISO),
    }
  );

  return {
    recentBookings,
    isLoadingRecentBookings,
    numDays
  };
};
