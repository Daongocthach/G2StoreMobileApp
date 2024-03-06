package com.hcmute.g2store.service.impl;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.entity.Order;
import com.hcmute.g2store.entity.OrderItem;
import com.hcmute.g2store.repository.OrderRepo;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.BuiltinFormats;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;


public class WriteExcel {
    public static void writeOrders(List<Order> orders, String excelFilePath) throws IOException {
        Workbook workbook = getWorkbook(excelFilePath);
        for(Order order : orders) {
            Sheet sheet = workbook.createSheet("Order_" + order.getId());
            writeOrder(order, sheet);
            autosizeColumn(sheet, 4);
        }
        createOutputFile(workbook, excelFilePath);
    }

    private static void writeOrder(Order order, Sheet sheet) {
        CellStyle cellStyle = createStyleBold(sheet);
        CellStyle cellStyleBorder = createStyleBorder(sheet);
        CellStyle cellStyleBorderAndBold = createStyleBorderBold(sheet);
        CellStyle cellStyleFormatNumber = createStyleFormatNumber(sheet);
        int rowIndex = 0;
        Row row = sheet.createRow(rowIndex);
        Cell cell;
        // Đơn hàng số
        cell = row.createCell(0);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Đơn hàng số " + order.getId());
        // Ngày
        cell = row.createCell(1);
        cell.setCellStyle(cellStyle);
        Date createDate = order.getCreatedDate();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        String formattedDate = sdf.format(createDate);
        cell.setCellValue("Ngày: " + formattedDate);
        // G2Store
        rowIndex++;
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("G2Store");
        // Điện thoại
        rowIndex++;
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellValue("Điện thoại");
        cell = row.createCell(1);
        cell.setCellValue(order.getCustomer().getPhoneNo());
        //Địa chỉ
        rowIndex++;
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellValue("Địa chỉ");
        cell = row.createCell(1);
        cell.setCellValue("Đại học SPKT TPHCM");
        // Khách hàng
        rowIndex+=2;
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Khách hàng");
        cell = row.createCell(1);
        cell.setCellValue(order.getCustomer().getFullName());
        // Điện thoại
        rowIndex++;
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellValue("Điện thoại");
        cell = row.createCell(1);
        cell.setCellValue(order.getCustomer().getPhoneNo());
        //Địa chỉ
        rowIndex++;
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellValue("Địa chỉ");
        cell = row.createCell(1);
        cell.setCellValue(order.getCustomer().getAddress() + " ," + order.getCustomer().getWard() +
                " ," + order.getCustomer().getDistrict() + " ," + order.getCustomer().getProvince());
        // Note
        rowIndex++;
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellValue("Note");
        cell = row.createCell(1);
        cell.setCellValue(order.getNote());
        // Đơn hàng
        rowIndex+=2;
        // Phương thức thanh toán
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Phương thức thanh toán");
        cell = row.createCell(1);
        cell.setCellValue(order.getPaymentMethod().toString());
        // Tiêu đề cột
        rowIndex++;
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellStyle(cellStyleBorderAndBold);
        cell.setCellValue("Tên hàng");
        cell = row.createCell(1);
        cell.setCellStyle(cellStyle);
        cell.setCellStyle(cellStyleBorderAndBold);
        cell.setCellValue("SL");
        cell = row.createCell(2);
        cell.setCellStyle(cellStyle);
        cell.setCellStyle(cellStyleBorderAndBold);
        cell.setCellValue("Đơn giá");
        cell = row.createCell(3);
        cell.setCellStyle(cellStyle);
        cell.setCellStyle(cellStyleBorderAndBold);
        cell.setCellValue("Thành tiền");
        rowIndex++;
        //Sản phẩm
        for (OrderItem orderItem : order.getOrderItems()) {
            row = row.getSheet().createRow(rowIndex);
            cell = row.createCell(0);
            cell.setCellStyle(cellStyleBorder);
            cell.setCellValue(orderItem.getProduct().getName());
            cell = row.createCell(1);
            cell.setCellStyle(cellStyleBorder);
            cell.setCellValue(orderItem.getQuantity());
            cell = row.createCell(2);
            cell.setCellStyle(cellStyleFormatNumber);
            cell.setCellValue(orderItem.getProductPrice());
            cell = row.createCell(3);
            cell.setCellStyle(cellStyleFormatNumber);
            cell.setCellValue(orderItem.getTotal());
            rowIndex++;
        }
        //Phí ship
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellStyle(cellStyle);
        cell.setCellStyle(cellStyleBorderAndBold);
        cell.setCellValue("Phí ship");
        cell = row.createCell(1);
        cell.setCellStyle(cellStyleBorder);
        cell.setCellValue("");
        cell = row.createCell(2);
        cell.setCellStyle(cellStyleBorder);
        cell.setCellValue("");
        cell = row.createCell(3);
        cell.setCellStyle(cellStyleFormatNumber);
        cell.setCellValue(order.getShippingFee());
        //Mã giảm giá
        rowIndex++;
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellStyle(cellStyle);
        cell.setCellStyle(cellStyleBorderAndBold);
        cell.setCellValue("Mã giảm giá");
        cell = row.createCell(1);
        cell.setCellStyle(cellStyleBorder);
        cell.setCellValue("");
        cell = row.createCell(2);
        cell.setCellStyle(cellStyleBorder);
        cell.setCellValue("");
        cell = row.createCell(3);
        cell.setCellStyle(cellStyleFormatNumber);
        cell.setCellValue(order.getVoucherDiscount());
        //Tổng tiền
        rowIndex++;
        row = row.getSheet().createRow(rowIndex);
        cell = row.createCell(0);
        cell.setCellStyle(cellStyle);
        cell.setCellStyle(cellStyleBorderAndBold);
        cell.setCellValue("Tổng tiền");
        cell = row.createCell(1);
        cell.setCellStyle(cellStyleBorder);
        cell.setCellValue("");
        cell = row.createCell(2);
        cell.setCellStyle(cellStyleBorder);
        cell.setCellValue("");
        cell = row.createCell(3);
        cell.setCellStyle(cellStyleFormatNumber);
        cell.setCellValue(order.getTotal());
    }
    private static Workbook getWorkbook(String excelFilePath) throws IOException {
        Workbook workbook = null;
        if (excelFilePath.endsWith("xlsx")) {
            workbook = new XSSFWorkbook();
        } else if (excelFilePath.endsWith("xls")) {
            workbook = new HSSFWorkbook();
        } else {
            throw new IllegalArgumentException("The specified file is not Excel file");
        }
        return workbook;
    }

    private static CellStyle createStyleBold(Sheet sheet) {
        Font font = sheet.getWorkbook().createFont();
        font.setBold(true);
        CellStyle cellStyle = sheet.getWorkbook().createCellStyle();
        cellStyle.setFont(font);
        return cellStyle;
    }
    private static CellStyle createStyleBorder(Sheet sheet) {
        CellStyle cellStyle = sheet.getWorkbook().createCellStyle();
        cellStyle.setBorderTop(BorderStyle.THIN);
        cellStyle.setBorderBottom(BorderStyle.THIN);
        cellStyle.setBorderLeft(BorderStyle.THIN);
        cellStyle.setBorderRight(BorderStyle.THIN);
        cellStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        cellStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        cellStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        cellStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        return cellStyle;
    }
    private static CellStyle createStyleBorderBold(Sheet sheet) {
        Font font = sheet.getWorkbook().createFont();
        font.setFontName("Times New Roman");
        font.setBold(true);
        CellStyle cellStyleBorderAndBold;
        CellStyle cellStyleBorder = createStyleBorder(sheet);
        cellStyleBorderAndBold = cellStyleBorder;
        cellStyleBorderAndBold.setFont(font);
        return cellStyleBorderAndBold;
    }
    private static CellStyle createStyleFormatNumber(Sheet sheet) {
        DataFormat dataFormat = sheet.getWorkbook().createDataFormat();
        CellStyle cellStyle;
        CellStyle cellStyleBorder = createStyleBorder(sheet);
        cellStyle = cellStyleBorder;
        cellStyle.setDataFormat(dataFormat.getFormat("#,##0.00"));
        return cellStyle;
    }
    private static void autosizeColumn(Sheet sheet, int lastColumn) {
        for (int columnIndex = 0; columnIndex < lastColumn; columnIndex++) {
            sheet.autoSizeColumn(columnIndex);
        }
    }

    private static void createOutputFile(Workbook workbook, String excelFilePath) throws IOException {
        try (OutputStream os = new FileOutputStream(excelFilePath)) {
            workbook.write(os);
        }
    }
}
