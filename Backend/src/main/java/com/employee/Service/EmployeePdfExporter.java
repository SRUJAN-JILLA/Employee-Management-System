package com.employee.Service;

import java.awt.Color;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.employee.Model.Employee;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

public class EmployeePdfExporter {
	private List<Employee> listEmployee;

	public EmployeePdfExporter(List<Employee> listEmployee) {
		this.listEmployee = listEmployee;
	}

	private void writeTableHeader(PdfPTable table) {
		PdfPCell cell = new PdfPCell();
		cell.setBackgroundColor(Color.BLUE);
		cell.setPadding(5);

		Font font = FontFactory.getFont(FontFactory.HELVETICA);
		font.setColor(Color.WHITE);

		cell.setPhrase(new Phrase(" Employee ID", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("First Name", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Last Name", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("E-mail", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Salary", font));
		table.addCell(cell);
		
		cell.setPhrase(new Phrase("Job", font));
		table.addCell(cell);
	}

	private void writeTableData(PdfPTable table) {
		for (Employee employee : listEmployee) {
			table.addCell(String.valueOf(employee.getId()));
			table.addCell(employee.getFirstName());
			table.addCell(employee.getLastName());
			table.addCell(employee.getEmail());
			table.addCell(String.valueOf(employee.getSalary()));
			table.addCell(employee.getJob());
		}
	}

	public void export(HttpServletResponse response) throws DocumentException, IOException {
		Document document = new Document(PageSize.A4);
		PdfWriter.getInstance(document, response.getOutputStream());

		document.open();
		Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font.setSize(18);
		font.setColor(Color.BLUE);

		Paragraph p = new Paragraph("List of Employees", font);
		p.setAlignment(Paragraph.ALIGN_CENTER);

		document.add(p);

		PdfPTable table = new PdfPTable(6);
		table.setWidthPercentage(100f);
		table.setWidths(new float[] { 2.5f, 2.5f, 2.5f, 4.0f, 2.4f , 1.3f});
		table.setSpacingBefore(10);

		writeTableHeader(table);
		writeTableData(table);

		document.add(table);

		document.close();

	}
}
