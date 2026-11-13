import useTempState from "./useTempState.ts";

interface StatusMessage {
  color: string;
  text?: string;
}

export interface StatusMessageProps {
  success: (text: string) => void;
  warning: (text: string) => void;
  error: (text: string) => void;
  custom: (text: string, col: string) => void;
  message: StatusMessage | null;
}

export function useStatusMessage(duration?: number): StatusMessageProps {
  const [message, setMessage] = useTempState<StatusMessage>(null, duration);

  return {
    success: (text: string) => setMessage({ color: "green", text }),
    warning: (text: string) => setMessage({ color: "orange", text }),
    error: (text: string) => setMessage({ color: "red", text }),
    custom: (text: string, color: string) => setMessage({ color, text }),
    message,
  };
}

export function StatusMessage({ status }: { status: StatusMessageProps }) {
  return (
    <p
      role="status"
      className={`w-full ${status.message ? `text-${status.message.color}` : ""}`}
    >
      {status.message?.text}
    </p>
  );
}
