import { Type } from 'class-transformer';
import { CardDTO } from './card.dto';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class CreateChargeDto {
  @Type(() => CardDTO)
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  card: CardDTO;

  @IsNumber()
  amount: number;
}
