import React, { ReactElement, ReactNode, useState } from "react";
import { ApplicationContext, ApplicationContextState } from "./app-context";
import { Book, Member, MemberBook } from "../../common/modal";
import { MembersApi } from "../../API/members-api";
import { BooksAPI } from "../../API/books-api";

interface ApplicationProviderProps {
	children: ReactNode;
}

const ApplicationProviderContext = ({
	children,
}: ApplicationProviderProps): ReactElement => {
	const membersApi = MembersApi.getInstance();
	const booksApi = BooksAPI.getInstance();

	const [members, setMembers] = useState<Array<Member>>([]);
	const [memberBooks, setMemberBooks] = useState<
		Map<number, Array<MemberBook>>
	>(new Map());
	const [masterBooks, setMasterBooks] = useState<Array<Book>>([]);

	const createMembers = async (member: Member): Promise<Member> => {
		const newMember = await membersApi.createMember(member);
		const updatedMembers = [...members]
		updatedMembers.push(newMember);
		setMembers(updatedMembers);

		return newMember;
	};

	const getMembers = async (): Promise<Array<Member>> => {
		if (members.length) {
			return members;
		}
		const memberList = await membersApi.getMembers();
		setMembers([...memberList]);

		return memberList;
	};

	const deleteMember = async (memberId: number): Promise<void> => {
		await membersApi.deleteMember(memberId);
		setMembers((members) => {
			return members.filter((member) => member.id !== memberId);
		});
	};

	const getMasterBooks = async (): Promise<Array<Book>> => {
		if (masterBooks) {
			return masterBooks;
		}
		const bookList = await booksApi.getMasterBooks();
		setMasterBooks([...bookList]);

		return bookList;
	};

	const getMemberBooks = async (
		memberId: number
	): Promise<Array<MemberBook>> => {
		if (memberBooks.get(memberId)?.length) {
			return memberBooks.get(memberId) as Array<MemberBook>;
		}
		const bookList = await booksApi.getMemberBooks(memberId);
		const memberBooksMap = new Map(memberBooks);
		memberBooksMap.set(memberId, bookList);
		setMemberBooks(memberBooksMap);

		return bookList;
	};

	const updateMemberBooks = async (
		memberId: number,
		memberBooksToAdd: Array<MemberBook>,
		memberBooksToDelete: Array<number>
	): Promise<Array<MemberBook>> => {
		for (let i = 0; i < memberBooksToAdd.length; i++) {
			await booksApi.createMemberBook(memberId, memberBooksToAdd[i]);
		}

		for (let i = 0; i < memberBooksToDelete.length; i++) {
			await booksApi.deleteMemberBook(memberBooksToDelete[i]);
		}

		const updatedBooks = await booksApi.getMemberBooks(memberId);
		const memberBooksMap = new Map(memberBooks);
		memberBooksMap.set(memberId, updatedBooks);
		setMemberBooks(memberBooksMap);

		return updatedBooks;
	};

	const updateMember = async (memberId: number, member: Member) => {
		const updatedMember = await membersApi.updateMember(memberId, member);
		setMembers((members) => {
			return members.map((member) => {
				if (member.id === updatedMember.id) {
					return updatedMember;
				}
				return member;
			});
		})
		return updatedMember;
	}

	const context: ApplicationContextState = {
		members,
		memberBooks,
		masterBooks,
		createMembers,
		getMembers,
		deleteMember,
		getMemberBooks,
		getMasterBooks,
		updateMemberBooks,
		updateMember
	};

	return (
		<ApplicationContext.Provider value={context}>
			{children}
		</ApplicationContext.Provider>
	);
};

export default ApplicationProviderContext;
