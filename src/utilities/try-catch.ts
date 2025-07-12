// Result types
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E> = Success<T> | Failure<E>;

// Options interface
interface TryCatchOptions<E> {
  errorMapper?: (error: unknown) => E;
  onError?: (error: unknown) => void;
  context?: Record<string, unknown>;
}

// Default error type
type DefaultError = Error;

// Helper to check if a value is a Promise
const isPromise = <T>(value: unknown): value is Promise<T> =>
  value instanceof Promise ||
  (typeof value === "object" && value !== null && "then" in value);

// Async tryCatch
export async function tryCatch<T, E = DefaultError>(
  fn: Promise<T> | (() => Promise<T>) | (() => T),
  options: TryCatchOptions<E> = {},
): Promise<Result<T, E>> {
  const { errorMapper, onError, context } = options;

  try {
    const result = isPromise(fn) ? await fn : await fn();
    return { data: result, error: null };
  } catch (error: unknown) {
    if (onError) {
      onError(error);
    }

    let mappedError: E;
    if (errorMapper) {
      mappedError = errorMapper(error);
    } else {
      mappedError = (
        error instanceof Error ? error : new Error(String(error))
      ) as E;
    }

    if (context && mappedError instanceof Error) {
      mappedError = Object.assign(mappedError, { context });
    }

    return { data: null, error: mappedError };
  }
}

// Sync tryCatch
export function tryCatchSync<T, E = DefaultError>(
  fn: T | (() => T),
  options: TryCatchOptions<E> = {},
): Result<T, E> {
  const { errorMapper, onError, context } = options;

  try {
    // Explicitly check if fn is a function and call it, otherwise use the value
    const result = typeof fn === "function" ? (fn as () => T)() : fn;
    return { data: result, error: null };
  } catch (error: unknown) {
    if (onError) {
      onError(error);
    }

    let mappedError: E;
    if (errorMapper) {
      mappedError = errorMapper(error);
    } else {
      mappedError = (
        error instanceof Error ? error : new Error(String(error))
      ) as E;
    }

    if (context && mappedError instanceof Error) {
      mappedError = Object.assign(mappedError, { context });
    }

    return { data: null, error: mappedError };
  }
}
