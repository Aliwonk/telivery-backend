export class CreateGoodDto {
  name: string;
  description: string;
  price: string;
  files: Array<Express.Multer.File>;
}
