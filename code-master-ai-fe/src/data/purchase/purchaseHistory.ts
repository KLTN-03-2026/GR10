import type { PurchaseItem } from "../../types/purchase/purchase";

export const purchaseHistoryData: PurchaseItem[] = [
  {
    id: "1",
    typeLabel: "Khóa học trực tuyến",
    title: "Học lập trình React cho người mới bắt đầu",
    date: "15/05/2026",
    paymentMethod: "Chuyển khoản",
    total: "1.500.000đ",
    status: "paid",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHjfPJluUmMPEBqHiMrp4ZzU-NhUDkW878ZGU0sfFS28TohlJTi7KqTg4SHc6_CGJk_uXqRszNfEa36VMgD9G9ZC8E0PyhZ4dIkXcYuk15lJaAFQD04EXrbaWobeN_md8nGhhHncWX1UuYX08UnhKTLg1PqD2vOVF8q2-Mz2obw6SoFS_0PPIKqT_upkEEgkISRB_ZAteu8Wzef_itHNM-Y1dHi_L2uh8TlpH_UYLqYVBiGVmrd8KcUPriq-Zm4pH1iHz9Vyii9v3o",
  },
  {
    id: "2",
    typeLabel: "Lộ trình chuyên sâu",
    title: "Advanced JavaScript & Web Performance",
    date: "14/05/2026",
    paymentMethod: "Thẻ tín dụng",
    total: "2.250.000đ",
    status: "pending",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCDTi8ImAns2U2cijii3wYZDw1GZDjgERuPB6kFyIu49jcfR-eWvFghuvmCrOUyl1W3qEdk1ZsxY614HZIGunGLzMb6CDPUuSTOp8JJMSBsjifMYa_3FTb0e0hBiv4NzX7zyLjjup8I-pVpDsHBftHrzghzOG3DR0rWfkk1eTpw8CVnW2uES8qgYyK6gWQShySN6IbUXqTLC1iCtkXlFR1dEUaQD2qIHVemX4E03nPrW38IlaGNh2-dfmjzNE3FVw2f0YFMrZnD0Wl",
  },
  {
    id: "3",
    typeLabel: "Phân tích dữ liệu",
    title: "Data Science with Python Masterclass",
    date: "10/05/2026",
    paymentMethod: "Ví điện tử",
    total: "1.890.000đ",
    status: "failed",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCH8Do4aufSVL9_75gXaaIULMnx1tP3yL-kO3_F7INyHwI0ud0KhgaEU-NLuBkVAFR2MSPozBOd6MSD_Y06QvT2KE-kxtmm_kdK7q2wT1SWuDV2piI2psj6mCkCAZZbZf6cyQVrWjfz-PwwsHpHWDVqQZg9nrH9xS93kqvTEuhIBtdhc0dnswszEvsLYxDu8HeqdRhbsBW2RoMK2XVsBvXnsRuyurGl5y4hIx-FXRy-jo3aiRpFWmy3fWYsf1FUaIMWeyYA6E2FXnLL",
  },
];
