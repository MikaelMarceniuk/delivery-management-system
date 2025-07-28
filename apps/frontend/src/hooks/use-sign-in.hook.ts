import { useMutation } from "@tanstack/react-query";
import { ISignInActionParams, SignInAction } from "../actions/auth/sign-in.action";

export function useSignIn() {
	const mutation = useMutation({
		mutationFn: async (data: ISignInActionParams) => {
			const actionResponse = await SignInAction(data)
		}
	})

	return mutation
}