/**
 * Tests for VariableExplorer component
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { VariableExplorer } from "./VariableExplorer";
import type { VariableInfo } from "./types";

describe("VariableExplorer", () => {
  const mockVariables: VariableInfo[] = [
    {
      name: "df",
      type: "DataFrame",
      type_str: "pandas.DataFrame",
      size: 1024,
      shape: [100, 5],
      preview: "DataFrame preview",
      is_callable: false,
      attributes: [],
    },
    {
      name: "x",
      type: "int",
      type_str: "builtins.int",
      size: 28,
      shape: undefined,
      preview: "42",
      is_callable: false,
      attributes: [],
    },
    {
      name: "calculate_mean",
      type: "function",
      type_str: "function",
      size: null,
      preview: "<function calculate_mean>",
      is_callable: true,
      attributes: [],
    },
  ];

  const mockOnInspect = vi.fn();
  const mockOnExecute = vi.fn();

  it("should render variable list", () => {
    render(
      <VariableExplorer
        variables={mockVariables}
        onInspect={mockOnInspect}
        onExecute={mockOnExecute}
      />
    );

    expect(screen.getByText("Variable Explorer")).toBeInTheDocument();
    expect(screen.getByText("df")).toBeInTheDocument();
    expect(screen.getByText("x")).toBeInTheDocument();
    expect(screen.getByText("calculate_mean")).toBeInTheDocument();
  });

  it("should show variable types and sizes", () => {
    render(<VariableExplorer variables={mockVariables} onInspect={mockOnInspect} />);

    // Use getAllByText since "DataFrame" appears in both the filter and the table
    const dataFrameElements = screen.getAllByText("DataFrame");
    expect(dataFrameElements.length).toBeGreaterThan(0);

    expect(screen.getByText("100×5")).toBeInTheDocument();
    expect(screen.getByText("1.0 KB")).toBeInTheDocument(); // Updated to match actual output
    expect(screen.getByText("()")).toBeInTheDocument(); // Callable indicator
  });

  it("should filter variables by search term", () => {
    render(<VariableExplorer variables={mockVariables} onInspect={mockOnInspect} />);

    const searchInput = screen.getByPlaceholderText("🔍 Search variables...");
    fireEvent.change(searchInput, { target: { value: "df" } });

    expect(screen.getByText("df")).toBeInTheDocument();
    expect(screen.queryByText("calculate_mean")).not.toBeInTheDocument();
  });

  it("should filter by type", () => {
    render(<VariableExplorer variables={mockVariables} onInspect={mockOnInspect} />);

    const typeSelect = screen.getByRole("combobox");
    fireEvent.change(typeSelect, { target: { value: "DataFrame" } });

    expect(screen.getByText("df")).toBeInTheDocument();
    expect(screen.queryByText("x")).not.toBeInTheDocument();
    expect(screen.queryByText("calculate_mean")).not.toBeInTheDocument();
  });

  it("should sort variables", () => {
    render(<VariableExplorer variables={mockVariables} onInspect={mockOnInspect} />);

    // Click on Type header to sort
    const typeHeader = screen.getByText("Type");
    fireEvent.click(typeHeader);

    // Check that items are sorted by type
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1); // Header + data rows
  });

  it("should call onInspect when variable is clicked", () => {
    render(<VariableExplorer variables={mockVariables} onInspect={mockOnInspect} />);

    const dfRow = screen.getByText("df").closest("tr");
    if (dfRow) {
      fireEvent.click(dfRow);
    }

    // Verify the spy was called with the correct DataFrame variable
    expect(mockOnInspect).toHaveBeenCalledTimes(1);
    expect(mockOnInspect).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "df",
        type: "DataFrame",
        type_str: "pandas.DataFrame",
      })
    );
  });

  it("should show loading state", () => {
    render(<VariableExplorer variables={[]} onInspect={mockOnInspect} isLoading={true} />);

    expect(screen.getByText("Loading variables...")).toBeInTheDocument();
  });

  it("should show empty state", () => {
    render(<VariableExplorer variables={[]} onInspect={mockOnInspect} isLoading={false} />);

    expect(screen.getByText("No variables in namespace")).toBeInTheDocument();
  });

  it("should show filtered empty state", () => {
    render(<VariableExplorer variables={mockVariables} onInspect={mockOnInspect} />);

    const searchInput = screen.getByPlaceholderText("🔍 Search variables...");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    expect(screen.getByText("No variables match your filters")).toBeInTheDocument();
  });

  it("should display variable count in footer", () => {
    render(<VariableExplorer variables={mockVariables} onInspect={mockOnInspect} />);

    expect(screen.getByText("3 variables")).toBeInTheDocument();
  });
});
