import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentSerivce from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('shoud be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentSerivce = new CreateAppointmentSerivce(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentSerivce.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on the same hour', async  () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentSerivce = new CreateAppointmentSerivce(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentSerivce.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    expect(createAppointmentSerivce.execute({
      date: appointmentDate,
      provider_id: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });
});
