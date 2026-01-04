import { QuotaExceededError } from '@/application/errors/quota-exceeded.error';
import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';

@Catch(QuotaExceededError)
export class QuotaExceededHttpFilter implements ExceptionFilter {
    catch(exception: QuotaExceededError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        response.status(HttpStatus.TOO_MANY_REQUESTS).json({
            error: 'LLM_QUOTA_EXCEEDED',
            message: 'Your LLM quota has been exceeded',
            scope: exception.scope,
        });
    }
}
