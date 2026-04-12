import React, { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts";

export interface MonthlyRevenueItem {
  month: number;
  revenue: number;
  totalOrders: number;
}

export interface RevenueReport {
  year: number;
  totalRevenue: number;
  totalOrders: number;
  monthlyRevenue?: MonthlyRevenueItem[];
}

type RevenueChartProps = {
  data?: RevenueReport | null;
  className?: string;
};

const monthLabels = [
  "TH1","TH2","TH3","TH4","TH5","TH6",
  "TH7","TH8","TH9","TH10","TH11","TH12",
];

const formatCurrency = (value: number) =>
  `${(value ?? 0).toLocaleString("vi-VN")} VNĐ`;

const formatShortMoney = (value: number) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`;
  return `${value}`;
};

export default function RevenueChart({ data, className = "" }: RevenueChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const chartData = useMemo(() => {
    const months = data?.monthlyRevenue ?? [];
    const revenueByMonth = Array.from({ length: 12 }, (_, i) => {
      const found = months.find((item) => item.month === i + 1);
      return found?.revenue ?? 0;
    });
    const ordersByMonth = Array.from({ length: 12 }, (_, i) => {
      const found = months.find((item) => item.month === i + 1);
      return found?.totalOrders ?? 0;
    });
    return { revenueByMonth, ordersByMonth };
  }, [data]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.dispose();
    }
    chartInstance.current = echarts.init(chartRef.current);
    const chart = chartInstance.current;

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      grid: { left: 20, right: 20, bottom: 10, top: 50, containLabel: true },

      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross" },
        backgroundColor: "#344e41",
        borderColor: "#588157",
        borderWidth: 1,
        textStyle: { color: "#dad7cd", fontSize: 13 },
        formatter: (params: any) => {
          const items = Array.isArray(params) ? params : [params];
          const monthName = items?.[0]?.axisValue ?? "";
          const revenueItem = items.find((i: any) => i.seriesName === "Doanh thu");
          const ordersItem = items.find((i: any) => i.seriesName === "Đơn hàng");
          return `
            <div style="font-weight:700;margin-bottom:8px;color:#a3b18a;">${monthName}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              ${revenueItem?.marker || ""}
              <span>Doanh thu:</span>
              <b style="color:#7f9f6b;">${formatCurrency(Number(revenueItem?.value ?? 0))}</b>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
              ${ordersItem?.marker || ""}
              <span>Đơn hàng:</span>
              <b style="color:#cfd5c2;">${ordersItem?.value ?? 0} đơn</b>
            </div>
          `;
        },
      },

      legend: {
        data: ["Doanh thu", "Đơn hàng"],
        top: 8,
        right: 0,
        textStyle: { color: "#7f9f6b", fontSize: 12 },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 16,
      },

      xAxis: {
        type: "category",
        data: monthLabels,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: "#7f9f6b", fontSize: 12, fontWeight: "500" as any },
        splitLine: { show: false },
      },

      yAxis: [
        // Trục Y trái — Doanh thu
        {
          type: "value",
          name: "Doanh thu",
          nameTextStyle: { color: "#7f9f6b", fontSize: 11, padding: [0, 0, 0, -10] },
          position: "left",
          splitLine: {
            lineStyle: { color: "#cfd5c2", type: "dashed", opacity: 0.4 },
          },
          axisLabel: {
            color: "#7f9f6b",
            fontSize: 11,
            formatter: (v: any) => formatShortMoney(Number(v)),
          },
          axisLine: { show: false },
          axisTick: { show: false },
        },
        // Trục Y phải — Đơn hàng
        {
          type: "value",
          name: "Đơn hàng",
          nameTextStyle: { color: "#cfd5c2", fontSize: 11, padding: [0, -10, 0, 0] },
          position: "right",
          splitLine: { show: false },
          axisLabel: {
            color: "#cfd5c2",
            fontSize: 11,
            formatter: (v: any) => `${v}`,
          },
          axisLine: { show: false },
          axisTick: { show: false },
        },
      ],

      series: [
        // Cột — Doanh thu (trục Y trái)
        {
          name: "Doanh thu",
          type: "bar",
          yAxisIndex: 0,
          barMaxWidth: 44,
          data: chartData.revenueByMonth,
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#588157" },
              { offset: 1, color: "#3a5a40" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#7f9f6b" },
                { offset: 1, color: "#588157" },
              ]),
            },
          },
        },
        // Line — Đơn hàng (trục Y phải)
        {
          name: "Đơn hàng",
          type: "line",
          yAxisIndex: 1,
          data: chartData.ordersByMonth,
          smooth: true,
          symbol: "circle",
          symbolSize: 7,
          lineStyle: {
            color: "#cfd5c2",
            width: 2.5,
          },
          itemStyle: {
            color: "#fff",
            borderColor: "#cfd5c2",
            borderWidth: 2.5,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(207, 213, 194, 0.18)" },
              { offset: 1, color: "rgba(207, 213, 194, 0)" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: "#cfd5c2",
              borderColor: "#fff",
              borderWidth: 2,
              shadowBlur: 6,
              shadowColor: "rgba(207,213,194,0.5)",
            },
          },
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chartData]);

  useEffect(() => {
    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, []);

  return <div ref={chartRef} className={`h-[360px] w-full ${className}`} />;
}