package com.employee.service;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.employee.Model.Employee;
import com.employee.Service.EmployeeExcelExporter;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class EmployeeExcelExporterTests {
	
	@InjectMocks
	private EmployeeExcelExporter exmployeeExcelExporter;
	
	@Spy
	private XSSFWorkbook workbook;
	@Spy
	private XSSFSheet sheet;
	@Spy
	private Row row;
	@Spy
	private CellStyle style;
	@Spy
	private XSSFFont font;
	@Spy
	private HttpServletResponse response;
	@Mock
	private ServletOutputStream outputStream;
	@Mock
	private List<Employee> listEmployee;

	@BeforeEach
	public void setUp() {
		this.listEmployee.add( new Employee(2, "fthis.employee", "lthis.employee", 460000, "this.employee@gmail.com", "fse", "56Password9333@3", "EMPLOYEE", true, 0, new Date()));
	}
	@Test
	void writeHeaderLine() throws IOException {
//		this.exmployeeExcelExporter.export(this.response);
//		doReturn(outputStream).when(response.getOutputStream());
//		
//		doReturn(any(XSSFSheet.class),atLeastOnce()).when(any(XSSFWorkbook.class).createSheet(any(String.class)));
//		doReturn((XSSFRow) any(Row.class)).when(any(XSSFSheet.class).createRow(any(Integer.class)));
//		doReturn(any(CellStyle.class)).when( any(XSSFWorkbook.class).createCellStyle());
//		doReturn(any(XSSFFont.class)).when( any(XSSFWorkbook.class).createFont());
////		doReturn(any(ServletOutputStream.class)).when(any(HttpServletResponse.class).getOutputStream());
//		when(response.getOutputStream()).thenReturn(this.outputStream);
//		verify(this.response).getOutputStream();

//		verify(workbook).createSheet("Employees");
//		verify(sheet).createRow(0);
//		verify(workbook).createCellStyle();
//		verify(workbook).createFont();
		
		
	}

}
