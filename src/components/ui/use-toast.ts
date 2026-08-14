// Adapted from shadcn/ui Toast component
import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  [key: string]: any;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

type ActionType = typeof actionTypes;

type Toast = ToasterToast & {
  open: boolean;
  /**
   * @deprecated use `onOpenChange` instead
   */
  dismiss: () => void;
};

type State = { toast: Toast[]; pauses: Map<string, Date> };

type Action = 
  | { type: typeof actionTypes.ADD_TOAST; toast: ToasterToast }
  | { type: typeof actionTypes.UPDATE_TOAST; toast: ToasterToast }
  | { type: typeof actionTypes.DISMISS_TOAST; toastId?: string }
  | { type: typeof actionTypes.REMOVE_TOAST; toastId?: string };

interface ToastOptions {
  pauseDuration?: number;
  toastLifetime?: number;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST: {
      const newToast: Toast = {
        ...action.toast,
        open: true,
        dismiss: () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: action.toast.id }),
      };
      return {
        ...state,
        toast: [newToast, ...state.toast].slice(0, TOAST_LIMIT),
      };
    }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toast: state.toast.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      // ! Side effects ! - This means it is not a pure reducer.
      // We'll have to compensate for this in the toast provider
      const toasts = state.toast.map((t) =>
        t.id === toastId ? { ...t, open: false } : t
      );
      return { ...state, toast: toasts };
    }

    case actionTypes.REMOVE_TOAST: {
      const { toastId: removeToastId } = action;
      return {
        ...state,
        toast: state.toast.filter((t) => t.id !== removeToastId),
      };
    }
    default:
      return state;
  }
};

const listeners: ((state: State) => void)[] = [];

let memoryState: State = { toast: [], pauses: new Map() };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

type ToastProps = Omit<ToasterToast, "id">;

function newId() {
  return Math.random().toString(36).substr(2, 9);
}

function toast({
  ...props
}: ToastProps): { id: string; dismiss: () => void } {
  const id = newId();
  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  dispatch({ type: actionTypes.ADD_TOAST, toast: { ...props, id, open: true, dismiss } });
  return { id, dismiss };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    toasts: state.toast,
    pauses: state.pauses,
    toast: toast,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

export { useToast, toast };
