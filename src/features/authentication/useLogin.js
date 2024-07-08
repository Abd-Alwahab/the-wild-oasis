import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error("email or password are incorrect");
      console.error("Login failed", error);
    },
  });

  return { login: mutate, isLoginLoading: isLoading };
}
