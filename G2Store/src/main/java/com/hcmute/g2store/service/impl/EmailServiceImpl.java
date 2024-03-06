package com.hcmute.g2store.service.impl;


import com.hcmute.g2store.dto.CustomerDTO;
import com.hcmute.g2store.entity.Customer;
import com.hcmute.g2store.entity.Order;
import com.hcmute.g2store.entity.OrderItem;
import com.hcmute.g2store.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;
    private static String generateRandomPassword(int length) {
        if (length <= 0) {
            throw new IllegalArgumentException("Password length must be greater than 0");
        }
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
        Random random = new Random();
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            password.append(randomChar);
        }
        return password.toString();
    }
    @Override
    public void sendEmail(Order order) {
        try {
            String from = "haxigi1307@gmail.com";
            String to = order.getCustomer().getEmail();

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject("G2Store đã nhận đơn hàng!");
            boolean html = true;

            StringBuilder sb = new StringBuilder();
            sb
                    .append("<div style='text-align:center;'>\n" +
                            "\t<img src='https://th.bing.com/th/id/OIP.pD-ROdQ6pC8Uuc1rFBaUkQHaHa?\t\t\tw=1000&h=1000&rs=1&pid=ImgDetMain' style='max-width:100px;'/>\n" +
                            "\t<h2>Cảm ơn bạn đã đặt hàng tại G2Store</h2>\n" +
                            "</div>\n" +
                            "<div>\n" +
                            "\t<h4>Xin chào " +order.getCustomer().getFullName()+ "</h4>\n" +
                            "    <body1>G2Store đã nhận được yêu cầu đặt hàng của bạn và đang xử lý nhé. Bạn có thể \txem thông tin đơn hàng trong trang cá nhân.</body1>\n" +
                            "    <h5>*Lưu ý nhỏ: Bạn chỉ nên nhận hàng khi trạng thái đơn hàng là \"Đang giao hàng\" và nhớ kiểm tra thông tin người gửi và thông tin đơn hàng để nhận đúng kiện hàng nhé.</h5>\n" +
                            "</div>")
                    .append("<div style='border-top: 2px solid #808080;'>\n" +
                            "\t<div style='display: flex; align-items: center; gap: 10px;'>\n" +
                            "\t\t<img src='https://th.bing.com/th/id/OIP.xUuxBu2zftUZhSIgXDs3lgHaJP?rs=1&pid=ImgDetMain' style='width:30px; height:30px;'/>\n" +
                            "        <h4>Đơn hàng được giao đến</h4>\n" +
                            "    </div>\n" +
                            "    <div style='display: flex; align-items: center; gap: 10px;'>\n" +
                            "    \t<h5 style='width: 100px; '>Tên: </h5>\n" +
                            "        <body1 style=''>" +order.getCustomer().getFullName()+ " </body1>\n" +
                            "    </div>\n" +
                            "    <div style='display: flex; align-items: center; gap: 10px;'>\n" +
                            "    \t<h5 style='width: 100px; '>Điện thoại: </h5>\n" +
                            "        <body1>"+order.getCustomer().getPhoneNo()+"</body1>\n" +
                            "    </div>\n" +
                            "    <div style='display: flex; align-items: center; gap: 10px;'>\n" +
                            "    \t<h5 style='width: 100px; '>Địa chỉ: </h5>\n" +
                            "        <body1>"+order.getCustomer().getAddress() + ',' + order.getCustomer().getWard() +
                            ',' + order.getCustomer().getDistrict() + ',' + order.getCustomer().getProvince()+"</body1>\n" +
                            "    </div>\n" +
                            "</div>")

                    .append("<div style='border-top: 2px solid #808080;'>\n" +
                            "\t<div style='display: flex; align-items: center; gap: 10px;'>\n" +
                            "\t\t<img src='https://th.bing.com/th/id/OIP.mB_Czt0tTQ5OfVEcfhWEUwHaHJ?rs=1&pid=ImgDetMain' style='width:30px; height:30px;'/>\n" +
                            "        <h4>Kiện hàng</h4>\n" +
                            "    </div>");
            for (OrderItem orderItem : order.getOrderItems()) {
                sb.append("<div style='display: flex; align-items: center; gap: 10px;'>\n" +
                                "    \t<img src='" + orderItem.getProduct().getImage() + "' style='width:50px; height:50px;'/>\n" +
                                "        <div style='gap: 5px; display: flex;\n" +
                                "            flex-direction: column;'>\n" +
                                "        \t<body1 style=''>"+orderItem.getProduct().getName()+"</body1> \n" +
                                "            <body1 style=''>Thành tiền: "+orderItem.getTotal()+"</body1> \n" +
                                "            <body1 style=''>Số lượng: "+orderItem.getQuantity()+" </body1> \n" +
                                "        </div>\n" +
                                "    </div>");
            }

            sb.append("</div>" +
                    "<div style='border-top: 2px solid #808080; padding-top: 10px'>\n" +
                            "\t <div style='display: flex; align-items: center; gap: 10px;'>\n" +
                            "    \t<body1 style='width: 100px; '>Thành tiền: </body1>\n" +
                            "        <body1 style=''>"+order.getTotal()+"</body1>\n" +
                            "    </div>\n" +
                            "    <div style='display: flex; align-items: center; gap: 10px;'>\n" +
                            "    \t<body1 style='width: 100px; '>Phí vận chuyển: </body1>\n" +
                            "        <body1 style=''>"+order.getShippingFee()+"</body1>\n" +
                            "    </div>\n" +
                            "    <div style='display: flex; align-items: center; gap: 10px;'>\n" +
                            "    \t<body1 style='width: 100px; '>Ghi chú: </body1>\n" +
                            "        <body1 style=''>"+order.getNote()+"</body1>\n" +
                            "    </div>\n" +
                            "</div>");
            helper.setText(sb.toString(), html);
            mailSender.send(message);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void sendOTPEmail(CustomerDTO customerDTO) {
        try {
            String from = "haxigi1307@gmail.com";
            String to = customerDTO.getEmail();
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject("Otp ResetPassword G2Store !");
            boolean html = true;

            StringBuilder sb = new StringBuilder();
            sb
                    .append("Dear ")
                    .append(customerDTO.getFullName())
                    .append("<br>")
                    .append("Mật khẩu đăng nhập của bạn là: ")
                    .append("12345678");
            helper.setText(sb.toString(), html);
            mailSender.send(message);
        } catch (MailAuthenticationException authenticationException) {
            authenticationException.printStackTrace();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
