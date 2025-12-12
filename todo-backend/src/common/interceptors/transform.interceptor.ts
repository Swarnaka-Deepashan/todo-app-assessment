import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string;
  data: Record<string,T[]>;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: this.getMessage(context),
        data: this.wrapData(data, context),
      })),
    );
  }

  getResourceName(context: ExecutionContext) {

    const controllerName = context.getClass().name;
    let resource: string;

    switch (controllerName) {
      case 'UsersController':
        resource = "user";
        break;
      case 'TasksController':
        resource = "task";
        break;
      default:
        resource = "result";
    }

    return resource
  }

  private getMessage(context: ExecutionContext) {

    const handlerName = context.getHandler().name;

    let message: string;

    let entity = this.getResourceName(context)

    switch (handlerName) {
      case 'create':
        message = `${entity} created successfully`;
        break;
      case 'findOne':
        message = `${entity} fetched successfully`;
        break;
      case 'findAll':
        message = `${entity}s fetched successfully`;
        break;
      case 'update':
        message = `${entity} updated successfully`;
        break;
        
      case 'markAsCompleted':
        message = `${entity} marked as completed successfully`;
        break;  

      case 'updateTaskStatus':
        message = `${entity} marked as completed successfully`;
        break;  

      case 'remove':
        message = `${entity} deleted successfully`;
        break;

      default:
        message = 'Request successful';
        break;
    }
    
    return message;
  }

  // private wrapData(data: Task | Task[], context: ExecutionContext) {
  private wrapData(data: T | T[], context: ExecutionContext) : Record<string,T[]> {

    let entity = this.getResourceName(context)

    if (Array.isArray(data)) {
      return { [`${entity}s`]: data };
    } else {
      return { [entity]: [data] };
    }
  }

}
