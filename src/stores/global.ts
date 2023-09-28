import { ref } from "vue";
import { defineStore } from "pinia";
import JwtService from "@/core/services/JwtService";
import type { Invoice } from "@/stores/types";

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  api_token: string;
  longitude: string;
  latitude: string;
  title: string;
}

export const useGlobalStore = defineStore("main", () => {
  const Location = ref({ coordinates: [] } as any);
  const Invoices = ref<Invoice[]>([]);
  const InvoicesStock = ref<Invoice[]>([]);
  const Invoice = ref<Invoice>({} as Invoice);
  const Users = ref<User[]>([
    {
      id: "1",
      name: "Ali Rıza",
      surname: "Bakır",
      email: "aarizabkr@gmail.com",
      password: "123456",
      api_token: "abc",
      latitude: "41.0053",
      longitude: "28.9770",
      title: "Location 1",
    },
    {
      id: "1",
      name: "Mehmet",
      surname: "Bakır",
      email: "aarizabkr@gmail.com",
      password: "123456",
      api_token: "abc",
      latitude: "38.4189",
      longitude: "27.1287",
      title: "Location 2",
    },
    {
      id: "1",
      name: "Enes",
      surname: "Bakır",
      email: "aarizabkr@gmail.com",
      password: "123456",
      api_token: "abc",
      latitude: "38.7312",
      longitude: "35.4787",
      title: "Location 3",
    },
    {
      id: "1",
      name: "Yusuf",
      surname: "Bakır",
      email: "aarizabkr@gmail.com",
      password: "123456",
      api_token: "abc",
      latitude: "37.5858",
      longitude: "36.9371",
      title: "Location 4",
    },
    {
      id: "1",
      name: "Fatmanur",
      surname: "Bakır",
      email: "aarizabkr@gmail.com",
      password: "123456",
      api_token: "abc",
      latitude: "37.5858",
      longitude: "36.9371",
      title: "Location 4",
    },
  ]);

  function getInvoices() {
    const invoices = JwtService.getInvoice();
    if (invoices) {
      InvoicesStock.value = Invoices.value = JSON.parse(invoices);
    }
  }

  function setInvoices(payload: Invoice) {
    Invoices.value.push(payload);
    InvoicesStock.value.push(payload);
    JwtService.saveInvoice(JSON.stringify(Invoices.value));
  }

  function removeInvoice(invoiceNo: string) {
    const index = Invoices.value.findIndex(
      (item) => invoiceNo === item.invoiceNo
    );

    if (index !== -1) {
      Invoices.value.splice(index, 1);
      InvoicesStock.value.splice(index, 1);
      JwtService.saveInvoice(JSON.stringify(Invoices.value));
    }
  }

  function setLocation(value: any) {
    Location.value = value;
  }

  function setOneInvoice(payload: Invoice) {
    Invoice.value = payload;
  }

  return {
    Location,
    setLocation,
    Invoices,
    getInvoices,
    setInvoices,
    removeInvoice,
    Invoice,
    setOneInvoice,
    Users,
    InvoicesStock
  };
});
