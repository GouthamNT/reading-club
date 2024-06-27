import { AxiosClient } from "./axios-client";
import { Book, MemberBook } from "../common/modal";

export class BooksAPI {

	private static _booksAPI: BooksAPI;
	private readonly RESOURCE_PATH: string = '/master-books'

	private readonly _axiosClient;

	private constructor() {
		this._axiosClient = AxiosClient.getInstance();
	}

	public static getInstance(): BooksAPI {
		if (BooksAPI._booksAPI) {
			return BooksAPI._booksAPI;
		}

		BooksAPI._booksAPI = new BooksAPI();
		return BooksAPI._booksAPI;
	}

	public async getMasterBooks(): Promise<Array<Book>> {
		const bookResponse = await this._axiosClient.get(this.RESOURCE_PATH);
		return bookResponse.data;
	}

	public async createMemberBook(memberId:number, books: MemberBook): Promise<Array<MemberBook>> {
		const bookResponse = await this._axiosClient.post(`/members/${memberId}/books`, books);
		return bookResponse.data;
	}

	public async deleteMemberBook(memberBookId: number): Promise<void> {
		await this._axiosClient.delete(`/books/${memberBookId}`);
	}

}