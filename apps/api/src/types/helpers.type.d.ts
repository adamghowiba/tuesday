export type OmitCreateDtoFields<T> = Omit<T, 'id' | 'createdAt' | 'created_at'>
