import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import {
  Payment,
  PaymentDocument,
  PaymentStatus,
} from '../payments/entities/payment.entity';
import {
  Order,
  OrderDocument,
  OrderStatus,
} from '../orders/entities/order.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Order.name)
    private readonly ordersModel: Model<OrderDocument>,
    @InjectModel(Payment.name)
    private readonly paymentsModel: Model<PaymentDocument>,
  ) {}

  async getRevenueByMonth(year: number) {
    if (!year || year < 2000 || year > 3000) {
      throw new BadRequestException('Năm không hợp lệ');
    }

    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);

    const revenueData = await this.ordersModel.aggregate([
      {
        $match: {
          status: OrderStatus.PAID,
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          revenue: { $sum: '$total_price' },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthlyRevenue = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      const found = revenueData.find((item) => item._id === month);

      return {
        month,
        revenue: found ? found.revenue : 0,
        totalOrders: found ? found.totalOrders : 0,
      };
    });

    const totalRevenue = monthlyRevenue.reduce(
      (sum, item) => sum + item.revenue,
      0,
    );

    const totalOrders = monthlyRevenue.reduce(
      (sum, item) => sum + item.totalOrders,
      0,
    );

    return {
      year,
      totalRevenue,
      totalOrders,
      monthlyRevenue,
    };
  }

  async exportRevenueByMonth(year: number, res: Response) {
    const data = await this.getRevenueByMonth(year);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Revenue ${year}`);

    worksheet.columns = [
      { header: 'Tháng', key: 'month', width: 15 },
      { header: 'Doanh thu', key: 'revenue', width: 20 },
      { header: 'Số đơn hàng', key: 'totalOrders', width: 20 },
    ];

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { horizontal: 'center' };

    data.monthlyRevenue.forEach((item) => {
      worksheet.addRow({
        month: `Tháng ${item.month}`,
        revenue: item.revenue,
        totalOrders: item.totalOrders,
      });
    });

    worksheet.addRow([]);
    worksheet.addRow({
      month: 'TỔNG',
      revenue: data.totalRevenue,
      totalOrders: data.totalOrders,
    });

    const totalRow = worksheet.lastRow;
    if (totalRow) {
      totalRow.font = { bold: true };
    }

    worksheet.getColumn('revenue').numFmt = '#,##0';

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=revenue-${year}.xlsx`,
    );

    await workbook.xlsx.write(res);
    res.end();
  }

  async exportRevenueByMonthDetail(year: number, res: Response) {
    if (!year || year < 2000 || year > 3000) {
      throw new BadRequestException('Năm không hợp lệ');
    }

    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);

    const payments = await this.paymentsModel
      .find({
        payment_status: PaymentStatus.PAID,
        paid_at: {
          $gte: startDate,
          $lt: endDate,
        },
      })
      .populate('user_id')
      .populate('order_id')
      .sort({ paid_at: 1 })
      .lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Thong ke ${year}`);

    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 8 },
      { header: 'Tháng', key: 'month', width: 10 },
      { header: 'Mã hóa đơn', key: 'invoiceCode', width: 28 },
      { header: 'Mã đơn hàng', key: 'orderCode', width: 28 },
      { header: 'Email khách hàng', key: 'email', width: 30 },
      { header: 'Số điện thoại', key: 'phone', width: 18 },
      { header: 'Ngày thanh toán', key: 'paymentDate', width: 22 },
      { header: 'Tổng tiền', key: 'amount', width: 18 },
    ];

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };

    const groupedByMonth: Record<number, any[]> = {};

    for (const payment of payments) {
      const paidDate = payment.paid_at ? new Date(payment.paid_at) : null;
      if (!paidDate) continue;

      const month = paidDate.getMonth() + 1;
      if (!groupedByMonth[month]) groupedByMonth[month] = [];
      groupedByMonth[month].push(payment);
    }

    let stt = 1;
    let grandTotal = 0;

    for (let month = 1; month <= 12; month++) {
      const monthPayments = groupedByMonth[month] || [];
      let monthTotal = 0;

      if (monthPayments.length > 0) {
        worksheet.addRow([]);
        const titleRow = worksheet.addRow([`THÁNG ${month}`]);
        titleRow.font = { bold: true };
      }

      for (const payment of monthPayments) {
        const user = payment.user_id as any;
        const order = payment.order_id as any;

        monthTotal += payment.amount || 0;
        grandTotal += payment.amount || 0;

        worksheet.addRow({
          stt: stt++,
          month,
          invoiceCode: payment._id?.toString() || '',
          orderCode: order?._id?.toString() || '',
          email: user?.email || '',
          phone: user?.phone || '',
          paymentDate: payment.paid_at
            ? new Date(payment.paid_at).toLocaleString('vi-VN')
            : '',
          amount: payment.amount || 0,
        });
      }

      if (monthPayments.length > 0) {
        const totalRow = worksheet.addRow({
          paymentDate: `TỔNG THÁNG ${month}`,
          amount: monthTotal,
        });
        totalRow.font = { bold: true };
      }
    }

    worksheet.addRow([]);
    const grandTotalRow = worksheet.addRow({
      paymentDate: 'TỔNG DOANH THU CẢ NĂM',
      amount: grandTotal,
    });
    grandTotalRow.font = { bold: true };

    worksheet.getColumn('amount').numFmt = '#,##0';
    worksheet.eachRow((row) => {
      row.alignment = { vertical: 'middle' };
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=thong-ke-doanh-thu-chi-tiet-${year}.xlsx`,
    );

    await workbook.xlsx.write(res);
    res.end();
  }
}
