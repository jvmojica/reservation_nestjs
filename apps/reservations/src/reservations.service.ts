import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { throwError, map } from 'rxjs';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);

  constructor(
    private readonly reservationRespository: ReservationRepository,
    @Inject(PAYMENTS_SERVICE) private readonly payment_service: ClientProxy,
  ) {}

  create(createReservationDto: CreateReservationDto, userId: string) {
    return this.payment_service
      .send('create_charge', createReservationDto.charge)
      .pipe(
        map(async (res) => {
          return this.reservationRespository.create({
            ...createReservationDto,
            timestamp: new Date(),
            invoiceId: res.id,
            userId,
          });
        }),
        catchError((err) => {
          this.logger.error('Failed to create reservation', err);
          return throwError(err);
        }),
      );
  }

  findAll() {
    return this.reservationRespository.find({});
  }

  findOne(_id: string) {
    return this.reservationRespository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRespository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string) {
    return this.reservationRespository.findOneAndDelete({ _id });
  }
}
