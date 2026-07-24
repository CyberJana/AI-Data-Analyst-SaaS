// Mock data for the AI Data Analyst app (UI-only prototype)

export type Dataset = {
  id: string;
  name: string;
  rows: number;
  columns: number;
  size: string;
  uploadedAt: string;
  status: "ready" | "processing" | "error";
  type: "CSV" | "XLSX";
};

export const datasets: Dataset[] = [
  { id: "1", name: "Q4 Sales Report", rows: 12480, columns: 14, size: "3.2 MB", uploadedAt: "2 hours ago", status: "ready", type: "CSV" },
  { id: "2", name: "Customer Churn 2025", rows: 8621, columns: 22, size: "5.1 MB", uploadedAt: "Yesterday", status: "ready", type: "XLSX" },
  { id: "3", name: "Marketing Spend", rows: 3240, columns: 9, size: "1.1 MB", uploadedAt: "3 days ago", status: "ready", type: "CSV" },
  { id: "4", name: "Inventory Snapshot", rows: 24812, columns: 11, size: "7.4 MB", uploadedAt: "1 week ago", status: "processing", type: "XLSX" },
  { id: "5", name: "Website Traffic", rows: 58230, columns: 8, size: "12.6 MB", uploadedAt: "2 weeks ago", status: "ready", type: "CSV" },
];

export const kpis = [
  { label: "Total Revenue", value: "$1.24M", delta: "+12.4%", trend: "up" as const },
  { label: "Active Customers", value: "8,412", delta: "+4.1%", trend: "up" as const },
  { label: "Avg Order Value", value: "$148.20", delta: "-1.8%", trend: "down" as const },
  { label: "Anomalies Detected", value: "6", delta: "+2", trend: "up" as const },
];

export const revenueSeries = [
  { month: "Jan", revenue: 82000, forecast: 80000 },
  { month: "Feb", revenue: 91000, forecast: 88000 },
  { month: "Mar", revenue: 104000, forecast: 100000 },
  { month: "Apr", revenue: 98000, forecast: 102000 },
  { month: "May", revenue: 116000, forecast: 110000 },
  { month: "Jun", revenue: 128000, forecast: 118000 },
  { month: "Jul", revenue: 134000, forecast: 126000 },
  { month: "Aug", revenue: 142000, forecast: 134000 },
  { month: "Sep", revenue: 151000, forecast: 142000 },
  { month: "Oct", revenue: 149000, forecast: 150000 },
  { month: "Nov", revenue: 162000, forecast: 158000 },
  { month: "Dec", revenue: 178000, forecast: 168000 },
];

export const channelSplit = [
  { name: "Organic", value: 38 },
  { name: "Paid Ads", value: 27 },
  { name: "Email", value: 18 },
  { name: "Referral", value: 11 },
  { name: "Social", value: 6 },
];

export const categoryPerformance = [
  { category: "Apparel", sales: 42000, returns: 3100 },
  { category: "Electronics", sales: 71000, returns: 5400 },
  { category: "Home", sales: 38000, returns: 1800 },
  { category: "Beauty", sales: 29000, returns: 900 },
  { category: "Sports", sales: 51000, returns: 2600 },
  { category: "Books", sales: 17000, returns: 400 },
];

export type TableRow = {
  id: string;
  customer: string;
  email: string;
  plan: "Free" | "Pro" | "Business" | "Enterprise";
  mrr: number;
  status: "Active" | "Trial" | "Churned";
  country: string;
};

export const tableRows: TableRow[] = [
  { id: "C-1024", customer: "Aria Nakamura", email: "aria@northwind.io", plan: "Enterprise", mrr: 2400, status: "Active", country: "JP" },
  { id: "C-1025", customer: "Miguel Santos", email: "miguel@fabrikam.com", plan: "Business", mrr: 890, status: "Active", country: "BR" },
  { id: "C-1026", customer: "Priya Kapoor", email: "priya@relecloud.com", plan: "Pro", mrr: 129, status: "Trial", country: "IN" },
  { id: "C-1027", customer: "Jonas Weber", email: "jonas@contoso.de", plan: "Business", mrr: 890, status: "Active", country: "DE" },
  { id: "C-1028", customer: "Chloé Martin", email: "chloe@lucerne.fr", plan: "Pro", mrr: 129, status: "Active", country: "FR" },
  { id: "C-1029", customer: "Ethan Wright", email: "ethan@tailspin.us", plan: "Free", mrr: 0, status: "Churned", country: "US" },
  { id: "C-1030", customer: "Lin Wei", email: "lin@wideworld.cn", plan: "Enterprise", mrr: 2400, status: "Active", country: "CN" },
  { id: "C-1031", customer: "Sofia Rossi", email: "sofia@adventure.it", plan: "Pro", mrr: 129, status: "Trial", country: "IT" },
  { id: "C-1032", customer: "Noah Andersen", email: "noah@blueyonder.dk", plan: "Business", mrr: 890, status: "Active", country: "DK" },
  { id: "C-1033", customer: "Amara Okafor", email: "amara@treyresearch.ng", plan: "Pro", mrr: 129, status: "Active", country: "NG" },
];

export const insights = [
  { title: "Revenue accelerating in Q4", body: "December revenue is trending 9.8% above forecast, driven by Electronics and Sports categories.", tag: "Trend" },
  { title: "Churn risk cluster detected", body: "42 Business-plan customers show a 3-week decline in weekly active usage — recommend outreach.", tag: "Anomaly" },
  { title: "Paid Ads efficiency dropping", body: "CAC on paid channels rose 14% MoM. Organic contribution is compensating for now.", tag: "Alert" },
  { title: "Forecast: +12% Jan revenue", body: "Model projects $195K in January (±4%) based on 12-month seasonality.", tag: "Forecast" },
];

export const chatSamples = [
  { role: "user" as const, content: "What drove revenue growth last quarter?" },
  { role: "assistant" as const, content: "Q4 revenue grew **18.2%** QoQ. The main drivers were:\n\n1. **Electronics** (+32%) — Black Friday campaigns\n2. **Sports** (+21%) — new product line launch\n3. **Enterprise plan** upgrades (+14 accounts)\n\nWould you like me to break this down by region or generate a report?" },
];

export const reports = [
  { id: "R-001", name: "Monthly Executive Summary", period: "Dec 2025", generated: "2 hours ago", format: "PDF" },
  { id: "R-002", name: "Customer Cohort Analysis", period: "Q4 2025", generated: "Yesterday", format: "XLSX" },
  { id: "R-003", name: "Marketing Attribution", period: "Nov 2025", generated: "1 week ago", format: "PDF" },
  { id: "R-004", name: "Anomaly Digest", period: "Last 30 days", generated: "2 weeks ago", format: "CSV" },
];

export const notifications = [
  { id: 1, title: "New anomaly detected", desc: "Spike in refund rate for Electronics", time: "3m ago", unread: true },
  { id: 2, title: "Report ready", desc: "Monthly Executive Summary is available", time: "2h ago", unread: true },
  { id: 3, title: "Dataset processed", desc: "Q4 Sales Report is ready to explore", time: "5h ago", unread: false },
  { id: 4, title: "Forecast updated", desc: "January projection revised to $195K", time: "1d ago", unread: false },
];
