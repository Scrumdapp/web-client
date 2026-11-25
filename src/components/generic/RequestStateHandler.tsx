import { ReactNode } from "react";
import { ApiError } from "../../js/hooks/api/apiError";
import { UseApiReturnType } from "../../js/hooks/api/useApi";
import { LoadScreen } from "./LoadScreen";
import { ErrorScreen } from "./ErrorScreen";

export interface RequestStateHandlerProps<TInput extends unknown[], TResult> {
  state: UseApiReturnType<TInput, TResult>;
  withLoading?: () => ReactNode;
  withError?: (error: ApiError) => ReactNode;
  withData: (data: TResult) => ReactNode;
}

export function RequestStateHandler<TInput extends unknown[], TResult>({
  state,
  withLoading,
  withError,
  withData,
}: RequestStateHandlerProps<TInput, TResult>) {
  
  if (state.error) {
    return withError?.(state.error) ?? <ErrorScreen error={state.error} />
  }

  if (state.loading || state.data == null) {
    return withLoading?.() ?? <LoadScreen />;
  }

  return withData(state.data);
}
