import { UserActiveInterface } from 'src/common/interfaces/user-active.interface'; 

declare global {
  namespace Express {
    interface Request {
      user?: UserActiveInterface;  // Agrega la propiedad "user" en el Request
    }
  }
}
