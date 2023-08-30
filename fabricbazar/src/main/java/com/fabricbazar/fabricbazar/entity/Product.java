package com.fabricbazar.fabricbazar.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String pname;
    private String category;
    private String subctegory;
    @Column(columnDefinition = "VARCHAR(10000)")
    private String pdesc;

    private String amazon;
    private String myntra;
    private String flipkart;
    private String ajio;
    private String meesho;
    
    private String amazon_price;
    private String myntra_price;
    private String flipkart_price;
    private String ajio_price;
    private String meesho_price;

    private String img1name;
    private String img2name;
    private String img3name;
    private String img4name;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] img1;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] img2;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] img3;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] img4;


    
    public Product() {
        super();
    }


    public String getAmazon_price() {
        return amazon_price;
    }

    public Product(int id, String pname, String category, String subctegory, String pdesc, String amazon, String myntra,
            String flipkart, String ajio, String meesho, String amazon_price, String myntra_price,
            String flipkart_price, String ajio_price, String meesho_price, String img1name, String img2name,
            String img3name, String img4name, byte[] img1, byte[] img2, byte[] img3, byte[] img4) {
        this.id = id;
        this.pname = pname;
        this.category = category;
        this.subctegory = subctegory;
        this.pdesc = pdesc;
        this.amazon = amazon;
        this.myntra = myntra;
        this.flipkart = flipkart;
        this.ajio = ajio;
        this.meesho = meesho;
        this.amazon_price = amazon_price;
        this.myntra_price = myntra_price;
        this.flipkart_price = flipkart_price;
        this.ajio_price = ajio_price;
        this.meesho_price = meesho_price;
        this.img1name = img1name;
        this.img2name = img2name;
        this.img3name = img3name;
        this.img4name = img4name;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
        this.img4 = img4;
    }



    public void setAmazon_price(String amazon_price) {
        this.amazon_price = amazon_price;
    }



    public String getMyntra_price() {
        return myntra_price;
    }



    public void setMyntra_price(String myntra_price) {
        this.myntra_price = myntra_price;
    }



    public String getFlipkart_price() {
        return flipkart_price;
    }



    public void setFlipkart_price(String flipkart_price) {
        this.flipkart_price = flipkart_price;
    }



    public String getAjio_price() {
        return ajio_price;
    }



    public void setAjio_price(String ajio_price) {
        this.ajio_price = ajio_price;
    }



    public String getMeesho_price() {
        return meesho_price;
    }



    public void setMeesho_price(String meesho_price) {
        this.meesho_price = meesho_price;
    }


    public int getId() {
        return id;
    }



    public void setId(int id) {
        this.id = id;
    }



    public String getPname() {
        return pname;
    }



    public void setPname(String pname) {
        this.pname = pname;
    }



    public String getCategory() {
        return category;
    }



    public void setCategory(String category) {
        this.category = category;
    }



    public String getSubctegory() {
        return subctegory;
    }



    public void setSubctegory(String subctegory) {
        this.subctegory = subctegory;
    }



    public String getPdesc() {
        return pdesc;
    }



    public void setPdesc(String pdesc) {
        this.pdesc = pdesc;
    }



    public String getAmazon() {
        return amazon;
    }



    public void setAmazon(String amazon) {
        this.amazon = amazon;
    }



    public String getMyntra() {
        return myntra;
    }



    public void setMyntra(String myntra) {
        this.myntra = myntra;
    }



    public String getFlipkart() {
        return flipkart;
    }



    public void setFlipkart(String flipkart) {
        this.flipkart = flipkart;
    }



    public String getAjio() {
        return ajio;
    }



    public void setAjio(String ajio) {
        this.ajio = ajio;
    }



    public String getMeesho() {
        return meesho;
    }



    public void setMeesho(String meesho) {
        this.meesho = meesho;
    }



    public String getImg1name() {
        return img1name;
    }



    public void setImg1name(String img1name) {
        this.img1name = img1name;
    }



    public String getImg2name() {
        return img2name;
    }



    public void setImg2name(String img2name) {
        this.img2name = img2name;
    }



    public String getImg3name() {
        return img3name;
    }



    public void setImg3name(String img3name) {
        this.img3name = img3name;
    }



    public String getImg4name() {
        return img4name;
    }



    public void setImg4name(String img4name) {
        this.img4name = img4name;
    }



    public byte[] getImg1() {
        return img1;
    }



    public void setImg1(byte[] img1) {
        this.img1 = img1;
    }



    public byte[] getImg2() {
        return img2;
    }



    public void setImg2(byte[] img2) {
        this.img2 = img2;
    }



    public byte[] getImg3() {
        return img3;
    }



    public void setImg3(byte[] img3) {
        this.img3 = img3;
    }



    public byte[] getImg4() {
        return img4;
    }



    public void setImg4(byte[] img4) {
        this.img4 = img4;
    }

}
