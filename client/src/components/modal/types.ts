import { ButtonEvent } from '../common.types';

export type ModalProps = {
	// slots
	header?: React.ReactNode;
	body?: React.ReactNode;
	loader?: React.ReactNode;
	form?: React.ReactNode;
	footer?: React.ReactNode;
	submit?: React.ReactNode;
	children?: React.ReactNode;
	// data
	id: string;
	isDelete: boolean;
	deleteText: string;
	isDone: boolean;
	doneText: string;
	isFooter: boolean;
	isClose: boolean;
	closeText: string;
	// functions
	onDelete?: (
		event: ButtonEvent
	) => boolean | Promise<boolean> | void | Promise<void> | undefined;
	onDone?: (
		event: ButtonEvent
	) => boolean | Promise<boolean> | void | Promise<void> | undefined; onClose?: (
		event: ButtonEvent
	) => boolean | Promise<boolean> | void | Promise<void> | undefined;
};
