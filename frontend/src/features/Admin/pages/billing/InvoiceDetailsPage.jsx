import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { getInvoiceById, downloadInvoice, } from "../../../../paymentManagement/services/invoiceApi";

export default function InvoiceDetailsPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const data = await getInvoiceById(id);
                setInvoice(data);
            } catch (error) {
                console.error("Failed to fetch invoice:", error);
            }
        };

        fetchInvoice();
    }, [id]);

    const handleDownload = async () => {
        try {

            const data = await downloadInvoice(id);

            const url = window.URL.createObjectURL(
                new Blob([data], { type: "application/pdf" })
            );

            const link = document.createElement("a");

            link.href = url;
            link.download = `invoice-${id}.pdf`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Failed to download invoice:", error);
        }
    };

    if (!invoice) {
        return (
            <AdminLayout>
                <div className="p-6">
                    Loading invoice...
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>

            <div className="min-h-screen bg-[#F4F7F3] p-6">

                <div className="max-w-4xl mx-auto">

                    <button
                        onClick={() => navigate("/admin/invoices")}
                        className="mb-6 text-gray-600"
                    >
                        ← Back to Invoices
                    </button>

                    <div className="bg-white rounded-2xl shadow p-8">

                        <div className="flex justify-between items-start border-b pb-6">

                            <div>
                                <h1 className="text-3xl font-bold">
                                    INVOICE
                                </h1>

                                <p className="text-gray-500 mt-2">
                                    Invoice Number: {invoice.invoiceNumber}
                                </p>
                            </div>

                            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full">
                                {invoice.status}
                            </span>

                        </div>

                        <div className="mt-6 space-y-2">

                            <p>
                                <span className="font-semibold">Payment ID:</span>{" "}
                                {invoice.paymentId}
                            </p>

                            <p>
                                <span className="font-semibold">Billing Start Date:</span>{" "}
                                {invoice.billingStartDate}
                            </p>

                            <p>
                                <span className="font-semibold">Billing End Date:</span>{" "}
                                {invoice.billingEndDate}
                            </p>

                            <p>
                                <span className="font-semibold">Status:</span>{" "}
                                {invoice.status}
                            </p>

                        </div>

                        <div className="mt-8">

                            <table className="w-full border">

                                <thead>
                                    <tr className="bg-gray-100">

                                        <th className="text-left p-3 border">
                                            Description
                                        </th>

                                        <th className="text-right p-3 border">
                                            Amount
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    <tr>
                                        <td className="p-3 border">Subtotal</td>
                                        <td className="p-3 border text-right">
                                            ₹{invoice.subtotal}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="p-3 border">CGST</td>
                                        <td className="p-3 border text-right">
                                            ₹{invoice.cgst}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="p-3 border">SGST</td>
                                        <td className="p-3 border text-right">
                                            ₹{invoice.sgst}
                                        </td>
                                    </tr>

                                    <tr className="font-bold">
                                        <td className="p-3 border">
                                            Total Amount
                                        </td>

                                        <td className="p-3 border text-right">
                                            ₹{invoice.totalAmount}
                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        <div className="flex justify-end mt-8">

                            <button
                                onClick={handleDownload}
                                className="bg-primary text-white px-4 py-2 rounded-lg"
                            >
                                Download Invoice
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}