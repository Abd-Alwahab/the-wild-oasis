import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../utils/constants";

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status") ?? "all";

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") ?? "created_at-asc";

  const [field, direction] = sortByRaw.split("-");

  const page = Number(searchParams.get("page") ?? 1) ?? 1;

  const {
    data,
    isLoading: isLoadingBookings,
    error,
  } = useQuery({
    queryKey: [
      "bookings",
      JSON.stringify(filter),
      JSON.stringify({ field, direction }),
      page,
    ],
    queryFn: () => getBookings({ filter, sortBy: { field, direction }, page }),
  });

  // Prefetch the next page
  const pageCount = Math.ceil(data?.count / ITEMS_PER_PAGE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        JSON.stringify(filter),
        JSON.stringify({ field, direction }),
        page + 1,
      ],
      queryFn: () =>
        getBookings({ filter, sortBy: { field, direction }, page: page + 1 }),
    });
  }

  // Prefetch the previous page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        JSON.stringify(filter),
        JSON.stringify({ field, direction }),
        page - 1,
      ],
      queryFn: () =>
        getBookings({ filter, sortBy: { field, direction }, page: page - 1 }),
    });
  }

  return { bookings: data?.data, isLoadingBookings, error, count: data?.count };
};
