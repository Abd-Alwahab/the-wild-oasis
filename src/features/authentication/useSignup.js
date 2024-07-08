import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignup = () => {
  const { mutate: signup, isLoading: isSignupLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Account created successfully, please verify your email");
    },
  });

  return { signup, isSignupLoading };
};
