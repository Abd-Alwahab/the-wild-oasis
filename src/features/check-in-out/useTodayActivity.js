import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export const useTodayActivity = () => {
  const { data: todaysActivity, isLoading } = useQuery({
    queryKey: ["todaysActivity"],
    queryFn: getStaysTodayActivity,
  });

  return { todaysActivity, isLoading };
};
