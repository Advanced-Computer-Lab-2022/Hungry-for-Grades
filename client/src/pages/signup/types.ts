import { Gender } from '@/enums/gender.enum';

export type UserFormProps = {
	key?: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	phone: string;
	gender: Gender;
	country: string;
};
export type ButtonDirectionProps = {
	firstName: string;
	updateData: (data: UserFormProps) => void;
	isFirstStep: boolean;
	isLastStep: boolean;
	next: () => void;
	prev: () => void;
};


export type AccountFormProps = {
	key?: string;
	email: string;
	username: string;
	password: string;
	terms: boolean;
};

export type ConfirmEmailProps = {
	key?: string;
	prev: () => void;
	handleSubmit: () => Promise<void>;
	email: string;
	firstName:string;
	lastName:string;

}

export type SignupData = UserFormProps  & AccountFormProps;
export type UpdateSignupData =
	| UserFormProps
	| AccountFormProps;
