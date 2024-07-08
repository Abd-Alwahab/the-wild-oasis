import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckin = () => {
  const queryClient = useQueryClient();

  const { mutate: checkin, isLoading: isCheckingLoading } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking ${data?.id} checked in successfully`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error(`Could not check in the booking `);
    },
  });

  return { checkin, isCheckingLoading };
};
