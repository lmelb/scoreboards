import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function check(
	condition: boolean,
	message: string,
	ErrorType?: new (message: string) => Error
) {
	if (!condition) throw ErrorType !== undefined ? new ErrorType(message) : new Error(message);
}

declare global {
	interface Array<T> {
		isEmpty(): boolean;
	}
}

Array.prototype.isEmpty = function (): boolean {
	return this.length === 0;
};
