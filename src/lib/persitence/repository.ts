import { PersistedState } from 'runed';

// Types are a copie of the ones in runed, because they are not exportrt...

type Serializer<T> = {
	serialize: (value: T) => string;
	deserialize: (value: string) => T;
};
type StorageType = 'local' | 'session';
type ConfigurableWindow = {
	/** Provide a custom `window` object to use in place of the global `window` object. */
	window?: typeof globalThis & Window;
};
type PersistedStateOptions<T> = {
	/** The storage type to use. Defaults to `local`. */
	storage?: StorageType;
	/** The serializer to use. Defaults to `JSON.stringify` and `JSON.parse`. */
	serializer?: Serializer<T>;
	/** Whether to sync with the state changes from other tabs. Defaults to `true`. */
	syncTabs?: boolean;
} & ConfigurableWindow;

export class Repository<T extends { equals: (item: T) => boolean }> {
	private items;
	constructor(key: string, options?: PersistedStateOptions<T[]>) {
		this.items = new PersistedState<T[]>(key, [], options);
	}

	saveAll(items: T[]) {
		this.items.current = [...items];
	}

	save(item: T) {
		this.items.current = [...this.items.current, item];
	}

	getAll(): T[] {
		return this.items.current;
	}

	delete(item: T): T[] {
		return (this.items.current = this.items.current.filter((it) => !it.equals(item)));
	}

	deleteAll() {
		this.items.current = [];
	}

	exists(item: T): boolean {
		return this.items.current.some((it) => it.equals(item));
	}
}
