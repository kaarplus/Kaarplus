type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

function formatEntry(entry: LogEntry): string {
  const base = `[${entry.timestamp}] ${entry.level.toUpperCase()} ${entry.message}`;
  if (entry.data) {
    return `${base} ${JSON.stringify(entry.data)}`;
  }
  return base;
}

function createEntry(level: LogLevel, message: string, data?: unknown): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    data,
  };
}

export const logger = {
  debug(message: string, data?: unknown) {
    if (process.env.NODE_ENV === "production") return;
    console.debug(formatEntry(createEntry("debug", message, data)));
  },

  info(message: string, data?: unknown) {
    console.info(formatEntry(createEntry("info", message, data)));
  },

  warn(message: string, data?: unknown) {
    console.warn(formatEntry(createEntry("warn", message, data)));
  },

  error(message: string, data?: unknown) {
    console.error(formatEntry(createEntry("error", message, data)));
  },
};
