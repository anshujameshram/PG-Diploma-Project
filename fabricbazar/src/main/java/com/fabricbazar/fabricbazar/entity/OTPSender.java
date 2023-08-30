package com.fabricbazar.fabricbazar.entity;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.SimpleMailMessage;

import java.util.Properties;
import java.util.Random;

public class OTPSender {

    public static String sendOtp(String email) {
        JavaMailSender mailSender = configureMailSender();
        String otp = generateOTP();
        sendOTPEmail(mailSender, email, otp);
        return otp;
    }

    private static JavaMailSender configureMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com"); // Replace with your SMTP server
        mailSender.setPort(587); // Replace with the appropriate port
        mailSender.setUsername("helmetdetection4321@gmail.com"); // Replace with your email
        mailSender.setPassword("nvdbruucmwasponu"); // Replace with your email password

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        // props.put("mail.debug", "true");

        return mailSender;
    }

    private static String generateOTP() {
        // Generate a random 6-digit OTP
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }

    private static void sendOTPEmail(JavaMailSender mailSender, String recipientEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is: " + otp);

        mailSender.send(message);
        System.out.println("OTP ("+otp+") sent successfully to " + recipientEmail);
    }
}
