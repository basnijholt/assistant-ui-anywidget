/**
 * Variable Explorer component for viewing kernel variables
 */

import React, { useState, useMemo } from 'react';
import type { VariableInfo } from './types';

interface VariableExplorerProps {
  variables: VariableInfo[];
  onInspect: (variable: VariableInfo) => void;
  onExecute?: (code: string) => void;
  isLoading?: boolean;
}

export const VariableExplorer: React.FC<VariableExplorerProps> = ({
  variables,
  onInspect,
  onExecute: _onExecute,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'size'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterType, setFilterType] = useState<string>('all');

  // Get unique types for filter
  const uniqueTypes = useMemo(() => {
    const types = new Set(variables.map(v => v.type));
    return ['all', ...Array.from(types).sort()];
  }, [variables]);

  // Filter and sort variables
  const filteredVariables = useMemo(() => {
    let filtered = variables;

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(v => 
        v.name.toLowerCase().includes(search) ||
        v.type.toLowerCase().includes(search)
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(v => v.type === filterType);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal: string | number, bVal: string | number;
      
      switch (sortBy) {
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        case 'type':
          aVal = a.type;
          bVal = b.type;
          break;
        case 'size':
          aVal = a.size || 0;
          bVal = b.size || 0;
          break;
      }

      if (sortOrder === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return filtered;
  }, [variables, searchTerm, filterType, sortBy, sortOrder]);

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const formatSize = (bytes: number | null) => {
    if (bytes === null) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getVariableIcon = (type: string) => {
    switch (type) {
      case 'DataFrame':
        return '📊';
      case 'ndarray':
        return '🔢';
      case 'list':
      case 'tuple':
        return '📝';
      case 'dict':
        return '📚';
      case 'function':
      case 'method':
        return '⚡';
      case 'str':
        return '📄';
      case 'int':
      case 'float':
        return '🔢';
      default:
        return '📦';
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fff',
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: 600,
          color: '#333',
        }}>
          Variable Explorer
        </h3>
      </div>

      {/* Controls */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
      }}>
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search variables..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            marginBottom: '8px',
          }}
        />

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          <label style={{ fontSize: '14px', color: '#666' }}>
            Type:
          </label>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            style={{
              padding: '4px 8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            {uniqueTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All types' : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Variable list */}
      <div style={{
        flex: 1,
        overflow: 'auto',
      }}>
        {isLoading ? (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            color: '#999',
          }}>
            Loading variables...
          </div>
        ) : filteredVariables.length === 0 ? (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            color: '#999',
          }}>
            {searchTerm || filterType !== 'all' 
              ? 'No variables match your filters'
              : 'No variables in namespace'}
          </div>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#f0f0f0',
                position: 'sticky',
                top: 0,
              }}>
                <th
                  onClick={() => handleSort('name')}
                  style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#666',
                  }}
                >
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('type')}
                  style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#666',
                  }}
                >
                  Type {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('size')}
                  style={{
                    padding: '8px 12px',
                    textAlign: 'right',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#666',
                  }}
                >
                  Size {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVariables.map(variable => (
                <tr
                  key={variable.name}
                  onClick={() => onInspect(variable)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background-color 0.1s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
                >
                  <td style={{
                    padding: '8px 12px',
                    fontSize: '13px',
                    color: '#333',
                  }}>
                    <span style={{ marginRight: '6px' }}>
                      {getVariableIcon(variable.type)}
                    </span>
                    <span style={{ fontFamily: 'monospace' }}>
                      {variable.name}
                    </span>
                    {variable.is_callable && (
                      <span style={{
                        marginLeft: '4px',
                        fontSize: '11px',
                        color: '#666',
                      }}>
                        ()
                      </span>
                    )}
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    fontSize: '13px',
                    color: '#666',
                  }}>
                    {variable.type}
                    {variable.shape && (
                      <span style={{
                        marginLeft: '4px',
                        fontSize: '11px',
                        color: '#999',
                      }}>
                        {variable.shape.join('×')}
                      </span>
                    )}
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    fontSize: '13px',
                    color: '#666',
                    textAlign: 'right',
                  }}>
                    {formatSize(variable.size)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '8px 16px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        fontSize: '12px',
        color: '#666',
      }}>
        {filteredVariables.length} variables
        {variables.length !== filteredVariables.length && 
          ` (${variables.length} total)`}
      </div>
    </div>
  );
};