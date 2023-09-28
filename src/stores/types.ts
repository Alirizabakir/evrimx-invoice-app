interface Order {
    orderName: string;
    hoursOfWork: number;
    expenses: number;
    materials: number;
    labor: number;
}

interface Invoice {
    companyName: string;
    companyNumber: string;
    companyAddress: string;
    invoiceNo: string;
    invoiceDate: string;
    orders: Order[];
    total: number;
    subTotal: number;
    tax: number;
    accountName: string;
    accountNo: string;
    payBy: string;
    owner: string;
    ownerAddress: string;
    status: boolean;
    paymentType: "card" | "cash"
}

export type {
    Order,
    Invoice
}