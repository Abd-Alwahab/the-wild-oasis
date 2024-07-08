import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isDeletingBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: () => {
      toast.error("An error occurred while deleting the booking");
    },
  });

  return {
    isDeletingBooking,
    deleteBooking: mutate,
  };
};
