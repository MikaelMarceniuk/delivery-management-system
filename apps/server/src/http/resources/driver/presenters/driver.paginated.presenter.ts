import { Driver } from '@prisma/client';
import { PaginationMeta } from 'src/@types/paginated-presenter.type';
import { DriverPresenter } from './driver.presenter';

interface IDriverPaginatedPresenterParams {
  total: number;
  page: number;
  size: number;
  drivers: Driver[];
}

export class DriverPaginatedPresenter {
  meta: PaginationMeta;
  drivers: DriverPresenter[];

  constructor({ total, page, size, drivers }: IDriverPaginatedPresenterParams) {
    const totalPages = Math.ceil(total / size);

    this.meta = {
      total,
      page,
      size,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };

    this.drivers = drivers.map((d) => new DriverPresenter(d));
  }
}
