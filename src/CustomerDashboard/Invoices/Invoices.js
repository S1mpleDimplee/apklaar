import React, { useState, useEffect } from 'react';
import './Invoices.css';
import apiCall from '../../Calls/calls';
import downloadApiCall from '../../Calls/downloadCall';

const InvoicesCustomer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [invoices, setInvoices] = useState([{}]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const response = await apiCall('fetchinvoices', {
      userid: JSON.parse(localStorage.getItem('userdata')).userid
    });
    if (response.isSuccess) {
      setInvoices(response.data);
    } else {
      console.log(response.message);
    }
  };

  const downloadInvoice = async (invoiceId) => {
    try {
      const response = await downloadApiCall(
        'generateinvoice',
        {
          invoiceid: invoiceId,
          action: 'download'
        },
        `factuur_${invoiceId}.pdf`
      );

      if (!response.isSuccess) {
        alert('Er is een fout opgetreden bij het downloaden van de factuur');
      }

    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Er is een fout opgetreden bij het downloaden van de factuur');
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice?.carnickname?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="customer-invoices-main-content">
      <div className="customer-invoices-content-area">
        <div className="customer-invoices-search-bar">
          <div className="customer-invoices-search-input-wrapper">
            <input
              type="text"
              placeholder="Zoekopdracht..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="customer-invoices-search-input"
            />
          </div>
          <div className="customer-invoices-status-filter-wrapper">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="customer-invoices-status-filter"
            >
              <option value="">Status</option>
              <option value="betaald">Betaald</option>
              <option value="onbetaald">Onbetaald</option>
            </select>
          </div>
        </div>

        <div className="customer-invoices-table-container">
          <table className="customer-invoices-table">
            <thead>
              <tr className="customer-invoices-table-header-row">
                <th className="customer-invoices-table-header">Naam</th>
                <th className="customer-invoices-table-header">Auto</th>
                <th className="customer-invoices-table-header">Kosten</th>
                <th className="customer-invoices-table-header">Datum</th>
                <th className="customer-invoices-table-header">Betaald op</th>
                <th className="customer-invoices-table-header">Status</th>
                <th className="customer-invoices-table-header">Acties</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan="7" className="customer-invoices-no-results">
                    Geen facturen gevonden met de zoekterm {searchTerm}.
                  </td>
                </tr>
              )}

              {filteredInvoices.map((invoice) => (
                <tr key={invoice.invoiceid} className="customer-invoices-table-row">
                  <td className="customer-invoices-table-cell">{invoice.description}</td>
                  <td className="customer-invoices-table-cell">{invoice.carnickname}</td>
                  <td className="customer-invoices-table-cell">€{invoice.cost}</td>
                  <td className="customer-invoices-table-cell">{invoice.date}</td>
                  <td className="customer-invoices-table-cell">{invoice.payed_on}</td>
                  <td className="customer-invoices-table-cell">
                    <span className={invoice.status === 'betaald' ? 'customer-invoices-status-paid' : 'customer-invoices-status-unpaid'}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="customer-invoices-table-cell">
                    <div className="customer-invoices-action-buttons">
                      <button
                        className="customer-invoices-btn-inzien"
                        onClick={() => downloadInvoice(invoice.invoiceid)}
                      >
                        Inzien
                      </button>
                      {invoice.status === 'onbetaald' && (
                        <button className="customer-invoices-btn-betalen">Betalen</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoicesCustomer;