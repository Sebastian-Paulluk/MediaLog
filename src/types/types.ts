export interface SeriesItemTypes {
	id?: string;
	categoryId: string;
	folderId: string;
	type: string;
	name: string;
	season: number;
	episode: number;
	notes: string;
	completed: boolean;
	favorite: boolean;
	updatedAt: string;
}

export interface MoviesItemTypes {
	id?: string;
	categoryId: string;
	folderId: string;
	type: string;
	name: string;
	minute: number;
	notes: string;
	completed: boolean;
	favorite: boolean;
	updatedAt: string;
}

export interface OthersItemTypes {
	id?: string;
	categoryId: string;
	folderId: string;
	type: string;
	name: string;
	notes: string;
	completed: boolean;
	favorite: boolean;
	updatedAt: string;
}

export type ItemTypes = SeriesItemTypes | MoviesItemTypes | OthersItemTypes

export interface FolderTypes {
	id?: string;
	name: string;
	categoryId: string;
	updatedAt: string;
}

export interface CategoryTypes {
	id?: string;
	name: string;
	type: string;
	updatedAt: string;
	userId: string;
}

export interface UserTypes {
    name: string;
    mail: string;
    UILanguage: string; 
	darkTheme: boolean;
}