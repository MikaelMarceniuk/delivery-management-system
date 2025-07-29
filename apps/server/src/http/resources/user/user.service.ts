import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from 'src/repositories/user/user.repository';
import { genSalt, hash } from 'bcrypt';
import { UserPresenter } from './presenter/user.presenter';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create({ email, password }: CreateUserDTO) {
    try {
      const userByEmail = await this.userRepository.findByEmail(email);

      if (userByEmail) {
        throw new ConflictException('E-mail já está em uso.');
      }

      const name = email.split('@')[0];
      const hashedPassword = await hash(password, await genSalt(10));

      const newUser = await this.userRepository.create({
        name,
        email,
        hashedPassword,
      });

      return new UserPresenter(newUser);
    } catch (err) {
      if (err instanceof ConflictException) throw err;
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }
}
