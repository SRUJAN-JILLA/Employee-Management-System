package com.employee.Service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.employee.Model.Employee;

public class EmployeeExcelExporter {
	private XSSFWorkbook workbook;
	private XSSFSheet sheet;
	private List<Employee> listEmployee;

	/* Should create the workbook for excel file */
	public EmployeeExcelExporter(List<Employee> listEmployee) {
		this.listEmployee = listEmployee;
		workbook = new XSSFWorkbook();
	}

	/* Should create the Header line for excel file */
	private void writeHeaderLine() {
		sheet = workbook.createSheet("Employees");

		Row row = sheet.createRow(0);

		CellStyle style = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setBold(true);
		font.setFontHeight(16);
		style.setFont(font);

		createCell(row, 0, "Employee ID", style);
		createCell(row, 1, "First Name", style);
		createCell(row, 2, "Last Name", style);
		createCell(row, 3, "Email", style);
		createCell(row, 4, "Salary", style);
		createCell(row, 5, "Job", style);

	}

	/* Should create cell for excel file */
	private void createCell(Row row, int columnCount, Object value, CellStyle style) {
		sheet.autoSizeColumn(columnCount);
		Cell cell = row.createCell(columnCount);
		if (value instanceof Long) {
			cell.setCellValue((Long) value);
		} else if (value instanceof Double) {
			cell.setCellValue((Double) value);
		} else {
			cell.setCellValue((String) value);
		}
		cell.setCellStyle(style);
	}

	/* Should write data for excel file */
	private void writeDataLines() {
		int rowCount = 1;

		CellStyle style = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setFontHeight(14);
		style.setFont(font);

		for (int i = 0; i < this.listEmployee.size(); i++) {
			Employee employee = this.listEmployee.get(i);
			Row row = sheet.createRow(rowCount++);
			int columnCount = 0;

			createCell(row, columnCount++, employee.getId(), style);
			createCell(row, columnCount++, employee.getFirstName(), style);
			createCell(row, columnCount++, employee.getLastName(), style);
			createCell(row, columnCount++, employee.getEmail(), style);
			createCell(row, columnCount++, employee.getSalary(), style);
			createCell(row, columnCount++, employee.getJob(), style);
		}
	}

	/* Should export excel file */
	public void export(HttpServletResponse response) throws IOException {
		writeHeaderLine();
		writeDataLines();

		ServletOutputStream outputStream = response.getOutputStream();
		workbook.write(outputStream);
		workbook.close();

		outputStream.close();
	}
}
