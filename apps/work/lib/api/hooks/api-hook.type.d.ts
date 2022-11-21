export interface MutationParams<TData = unknown, TError = unknown> {
  onError?: (error: TError) => void;
  onSuccess?: (values: TData) => void;
  onSettled?: (value: any) => void;
  onMutate?: () => void;
}
