
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Column {
  header: string;
  accessor: string;
  cell?: (item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (item: any) => void;
  selectable?: boolean;
  onSelectionChange?: (id: string, isSelected: boolean) => void;
  selectedItems?: string[];
}

const DataTable: React.FC<DataTableProps> = ({ 
  columns, 
  data, 
  onRowClick,
  selectable = false,
  onSelectionChange,
  selectedItems = []
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item => {
      return Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [data, searchTerm]);

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    
    if (checked) {
      // Select all visible rows
      filteredData.forEach(item => {
        if (!selectedItems.includes(item.id)) {
          onSelectionChange(item.id, true);
        }
      });
    } else {
      // Deselect all visible rows
      filteredData.forEach(item => {
        if (selectedItems.includes(item.id)) {
          onSelectionChange(item.id, false);
        }
      });
    }
  };

  const handleRowSelect = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    if (!onSelectionChange) return;
    
    const isSelected = selectedItems.includes(item.id);
    onSelectionChange(item.id, !isSelected);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={filteredData.length > 0 && filteredData.every(item => selectedItems.includes(item.id))}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead key={column.accessor}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={selectable ? columns.length + 1 : columns.length} className="text-center h-24">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, i) => (
                <TableRow 
                  key={i} 
                  onClick={() => onRowClick && onRowClick(row)}
                  className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                >
                  {selectable && (
                    <TableCell className="p-0 pl-4" onClick={(e) => handleRowSelect(e, row)}>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedItems.includes(row.id)}
                          aria-label={`Select ${row.id}`}
                        />
                      </div>
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={`${i}-${column.accessor}`}>
                      {column.cell 
                        ? column.cell(row) 
                        : row[column.accessor] || "—"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
