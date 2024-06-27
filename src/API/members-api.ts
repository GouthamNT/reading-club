import { Member } from "../common/modal";
import { AxiosClient } from "./axios-client";

export class MembersApi {
	private static _booksAPI: MembersApi;
	private readonly RESOURCE_PATH: string = '/members'

	private readonly _axiosClient;

	private constructor() {
		this._axiosClient = AxiosClient.getInstance();
	}

	public static getInstance(): MembersApi {
		if (MembersApi._booksAPI) {
			return MembersApi._booksAPI;
		}

		MembersApi._booksAPI = new MembersApi();
		return MembersApi._booksAPI;
	}

	public async createMember(member: Member): Promise<Member> {
		const createdMemberResponse = await this._axiosClient.post(this.RESOURCE_PATH, member);
		return createdMemberResponse.data;
	}
}