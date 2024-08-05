import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  id: number;

  @IsString({ message: 'needs a string value' })
  @IsOptional()
  item: string;

  @IsBoolean({ message: 'needs to be true or false' })
  @IsOptional()
  checked: boolean;
}
