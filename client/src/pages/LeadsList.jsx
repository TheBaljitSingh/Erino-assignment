import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import { AgGridReact } from "ag-grid-react";

// Import AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import {
  ClientSideRowModelModule,
  ModuleRegistry,
  PaginationModule,
  ValidationModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([
  PaginationModule,
  ClientSideRowModelModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

export default function LeadsList() {
  const [rowData, setRowData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    source: "",
    city: "",
    state: ""
  });

  const gridRef = useRef();

  // Fetch leads from API
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query parameters with filters
      const params = {
        limit: 100, // Fetch more data for client-side pagination
        page: 1,
        ...(filters.status && { status: filters.status }),
        ...(filters.source && { source: filters.source }),
        ...(filters.city && { city: filters.city }),
        ...(filters.state && { state: filters.state })
      };

      const { data } = await api.get("/leads", { params });
      
      setRowData(data.leads || []);
      setTotal(data.total || 0);
      
    } catch (error) {
      console.error("Error fetching leads:", error);
      setError(error.response?.data?.message || error.message || "Failed to fetch leads");
      toast.error("Failed to fetch leads");
      setRowData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load data on component mount
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // fetchLeads will be called automatically due to useEffect dependency
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await api.delete(`/leads/${id}`);
        toast.success("Lead deleted successfully");
        // Refresh data after deletion
        fetchLeads();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete lead");
      }
    }
  };

  const handleClearFilters = () => {
    setFilters({ status: "", source: "", city: "", state: "" });
    // fetchLeads will be called automatically due to useEffect dependency
  };

  const columnDefs = useMemo(() => [
    {
      headerName: "Name",
      field: "first_name",
      cellRenderer: (params) => {
        const { first_name, last_name } = params.data;
        return `${first_name || ''} ${last_name || ''}`.trim() || '-';
      },
      sortable: true,
      filter: true,
      width: 150
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
      width: 200
    },
    {
      headerName: "Phone",
      field: "phone",
      sortable: true,
      filter: true,
      width: 150
    },
    {
      headerName: "Company",
      field: "company",
      sortable: true,
      filter: true,
      width: 150
    },
    {
      headerName: "Location",
      cellRenderer: (params) => {
        const { city, state } = params.data;
        return city && state ? `${city}, ${state}` : city || state || "-";
      },
      sortable: false,
      filter: false,
      width: 150
    },
    {
      headerName: "Source",
      field: "source",
      cellRenderer: (params) => {
        const source = params.value;
        return source ? source.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "-";
      },
      sortable: true,
      filter: true,
      width: 120
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: (params) => {
        const status = params.value;
        return (
          <span className={`status-badge status-${status}`}>
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : "-"}
          </span>
        );
      },
      sortable: true,
      filter: true,
      width: 100
    },
    {
      headerName: "Score",
      field: "score",
      sortable: true,
      filter: true,
      width: 80
    },
    {
      headerName: "Value",
      field: "lead_value",
      cellRenderer: (params) => {
        const value = params.value;
        return value ? `$${value.toLocaleString()}` : "-";
      },
      sortable: true,
      filter: true,
      width: 100
    },
    {
      headerName: "Actions",
      cellRenderer: (params) => {
        const { _id } = params.data;
        return (
          <div className="flex space-x-2">
            <Link
              to={`/leads/${_id}/edit`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Delete
            </button>
          </div>
        );
      },
      sortable: false,
      filter: false,
      width: 120,
      suppressMenu: true
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true
  }), []);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const containerStyle = useMemo(() => ({ width: "100%", height: "500px" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
          <Link
            to="/leads/new"
            className="btn-primary flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add New Lead</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="form-select"
                  disabled={loading}
                >
                  <option value="">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="lost">Lost</option>
                  <option value="won">Won</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source
                </label>
                <select
                  value={filters.source}
                  onChange={(e) => handleFilterChange("source", e.target.value)}
                  className="form-select"
                  disabled={loading}
                >
                  <option value="">All Sources</option>
                  <option value="website">Website</option>
                  <option value="facebook_ads">Facebook Ads</option>
                  <option value="google_ads">Google Ads</option>
                  <option value="referral">Referral</option>
                  <option value="events">Events</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                  className="form-input"
                  placeholder="Filter by city"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={filters.state}
                  onChange={(e) => handleFilterChange("state", e.target.value)}
                  className="form-input"
                  placeholder="Filter by state"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Total: {total.toLocaleString()} leads
                {loading && <span className="ml-2 text-blue-600">(Loading...)</span>}
              </div>
              <button
                onClick={handleClearFilters}
                disabled={loading}
                className="text-sm text-gray-600 hover:text-gray-800 underline disabled:opacity-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <div className="flex justify-between items-center">
            <span>Error: {error}</span>
            <button
              onClick={fetchLeads}
              className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* AG Grid */}
      <div className="card">
        <div className="card-body p-0">
          {loading && rowData.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading leads...</span>
            </div>
          ) : (
            <div style={containerStyle} className="ag-theme-alpine">
              <div style={gridStyle}>
                <AgGridReact
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  paginationPageSize={10}
                  paginationPageSizeSelector={[10, 25, 50, 100]}
                  onGridReady={onGridReady}
                  animateRows={true}
                  rowSelection="none"
                  suppressRowClickSelection={true}
                  loading={loading}
                  overlayNoRowsTemplate={
                    '<span style="padding: 10px; border: 2px solid #444;">No leads found</span>'
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}