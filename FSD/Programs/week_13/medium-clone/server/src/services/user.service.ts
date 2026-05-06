import { UserRepository } from '../repositories/user.repository';
import type { SignupInput, SigninInput } from '../validators/user.validator';
import { generateToken } from '../utils/jwt';

export class UserService {
  constructor(private userRepository: UserRepository, private jwtSecret: string) {}

  async signup(input: SignupInput) {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(input.password);

    // Create user
    const user = await this.userRepository.create({
      ...input,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = await generateToken(user.id, this.jwtSecret);

    return {
      user,
      token,
    };
  }

  async signin(input: SigninInput) {
    // Find user by email
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await this.verifyPassword(input.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = await generateToken(user.id, this.jwtSecret);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const hash = await this.hashPassword(password);
    return hash === hashedPassword;
  }
}
