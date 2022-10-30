export interface BaseApiExecptionResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  isOperational: boolean;
  message: string | string[];
  ui_message?: string;
  meta?: Record<string, any>
}
