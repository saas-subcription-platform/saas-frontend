import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { getAllInvoices } from "../services/invoiceApi";

export default function Invoices() {

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {

    const fetchInvoices = async () => {
      try {
        const data = await getAllInvoices();
        setInvoices(data);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      }
    };

    fetchInvoices();

  }, []);


return (
  <AdminLayout>
    <div className="min-h-screen bg-[#F4F7F3] p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Invoices
        </h1>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Invoice History
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Invoice No</th>
                <th className="text-left py-3">Billing Period</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.invoiceId} className="border-b">

                  <td className="py-4">
                    {invoice.invoiceNumber}
                  </td>

                  <td>
                    {invoice.billingStartDate} - {invoice.billingEndDate}
                  </td>

                  <td>
                    ₹{invoice.totalAmount}
                  </td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {invoice.status}
                    </span>
                  </td>

                  <td className="space-x-2">
                    <Link
                      to={`/admin/invoices/${invoice.invoiceId}`}
                      className="bg-primary text-white px-4 py-2 rounded-lg">
                      View
                    </Link>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>



      </div>
    </div>
  </AdminLayout>
);
}