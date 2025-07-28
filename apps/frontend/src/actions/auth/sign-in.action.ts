import api from "@/src/lib/axios";

export interface ISignInActionParams {
	email: string
	password: string
}

interface ISignInActionResponse {

}

export async function SignInAction({ email, password }: ISignInActionParams): Promise<ISignInActionResponse | undefined> {
	try {
		return await api.post<ISignInActionResponse>('/auth/sign-in', { email, password })
	} catch(e) {
		return undefined
	}
}