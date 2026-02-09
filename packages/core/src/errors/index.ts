export class ToolError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = "ToolError";
  }
}

export class ValidationError extends ToolError {
  constructor(message: string) {
    super(message, "validation_error");
    this.name = "ValidationError";
  }
}

export class UnsupportedError extends ToolError {
  constructor(message: string) {
    super(message, "unsupported_error");
    this.name = "UnsupportedError";
  }
}

export class ProcessingError extends ToolError {
  constructor(message: string) {
    super(message, "processing_error");
    this.name = "ProcessingError";
  }
}

export class CancelledError extends ToolError {
  constructor(message = "Operation cancelled.") {
    super(message, "cancelled");
    this.name = "CancelledError";
  }
}
