package com.fabricbazar.fabricbazar.controller;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fabricbazar.fabricbazar.entity.Product;
import com.fabricbazar.fabricbazar.service.ProductService;

@RestController
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(){
        List<Product> tempList = productService.getProducts();
        if(tempList.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.of(Optional.of(tempList));
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Optional<Product>> getProduct(@PathVariable("id") Integer id){
        if(id == null){
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Optional<Product> tempProduct =  productService.getProduct(id);

        try {
            List<String> prices = getLivePrice();
            String ajio_price = prices.get(0);
            String amazon_price = prices.get(1);
            String flipkart_price = prices.get(2);
            String meesho_price = prices.get(3);
            String myntra_price = prices.get(4);
    
            tempProduct.get().setAjio_price(ajio_price);
            tempProduct.get().setAmazon_price(amazon_price);
            tempProduct.get().setFlipkart_price(flipkart_price);
            tempProduct.get().setMeesho_price(meesho_price);
            tempProduct.get().setMyntra_price(myntra_price);
        } catch (Exception e) {
        }

        if(tempProduct.isPresent()){
            return ResponseEntity.of(Optional.of(tempProduct));
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // @PostMapping("/product")
    // public String createProduct(@RequestBody Product newProduct){
    //     return productService.createProduct(newProduct);
    // }

    // @PutMapping("/product")
    // public String updateProduct(@RequestBody Product newProduct){
    //     return productService.updateProduct(newProduct);
    // }

    @PostMapping("/product")
    public ResponseEntity<String> createProduct(
        @RequestParam("id") Integer id,
        @RequestParam("pname") String pname,
        @RequestParam("category") String category,
        @RequestParam("subctegory") String subctegory,
        @RequestParam("pdesc") String pdesc,

        @RequestParam("amazon") String amazon,
        @RequestParam("myntra") String myntra,
        @RequestParam("flipkart") String flipkart,
        @RequestParam("ajio") String ajio,
        @RequestParam("meesho") String meesho,

        @RequestParam("img1") MultipartFile img1,
        @RequestParam("img2") MultipartFile img2,
        @RequestParam("img3") MultipartFile img3,
        @RequestParam("img4") MultipartFile img4)
        {
            if(Objects.isNull(id) || Objects.isNull(pname) || Objects.isNull(category) || Objects.isNull(subctegory) || Objects.isNull(pdesc) || Objects.isNull(amazon) || Objects.isNull(myntra) || Objects.isNull(flipkart) || Objects.isNull(ajio) || Objects.isNull(meesho) || Objects.isNull(img1) || Objects.isNull(img2) || Objects.isNull(img3) || Objects.isNull(img4)){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Invalid Parameters Paased\"}");
            }   
            else{
                try {
                    String ajio_price = "0";
                    String amazon_price = "0";
                    String flipkart_price = "0";
                    String meesho_price = "0";
                    String myntra_price = "0";

                    List<String> prices = getLivePrice();

                    ajio_price = prices.get(0);
                    amazon_price = prices.get(1);
                    flipkart_price = prices.get(2);
                    meesho_price = prices.get(3);
                    myntra_price = prices.get(4);

                    pname = pname.trim();
                    category = category.trim();
                    subctegory = subctegory.trim();
                    pdesc = pdesc.trim();
                    amazon = amazon.trim();
                    myntra = myntra.trim();
                    flipkart = flipkart.trim();
                    ajio = ajio.trim();
                    meesho = meesho.trim();

                    Product newProduct = new Product(0, pname, category, subctegory, pdesc, amazon, myntra, flipkart, ajio, meesho, amazon_price, myntra_price, flipkart_price, ajio_price, meesho_price, img1.getOriginalFilename(), img2.getOriginalFilename(), img3.getOriginalFilename(), img4.getOriginalFilename(), img1.getBytes(), img2.getBytes(), img3.getBytes(), img4.getBytes());

                    String msg = productService.createProduct(newProduct);
                    if(msg.equals("Added")){
                        return ResponseEntity.status(HttpStatus.ACCEPTED).body("{\"Msg\":\"Product Added\"}");
                    }else{
                        System.out.println("\n Error in adding the product : "+msg);
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"Msg\":\"Failed to Add Product\"}");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"Msg\":\"Failed to Add Product\"}");
                }
            }

        }

    @PutMapping("/product")
    public ResponseEntity<String> updateProduct(
        @RequestParam("id") Integer id,
        @RequestParam("pname") String pname,
        @RequestParam("category") String category,
        @RequestParam("subctegory") String subctegory,
        @RequestParam("pdesc") String pdesc,

        @RequestParam("amazon") String amazon,
        @RequestParam("myntra") String myntra,
        @RequestParam("flipkart") String flipkart,
        @RequestParam("ajio") String ajio,
        @RequestParam("meesho") String meesho,

        @RequestParam("img1") MultipartFile img1,
        @RequestParam("img2") MultipartFile img2,
        @RequestParam("img3") MultipartFile img3,
        @RequestParam("img4") MultipartFile img4)
        {
            
            if(Objects.isNull(id) || Objects.isNull(pname) || Objects.isNull(category) || Objects.isNull(subctegory) || Objects.isNull(pdesc) || Objects.isNull(amazon) || Objects.isNull(myntra) || Objects.isNull(flipkart) || Objects.isNull(ajio) || Objects.isNull(meesho) || Objects.isNull(img1) || Objects.isNull(img2) || Objects.isNull(img3) || Objects.isNull(img4)){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Invalid Parameters Paased\"}");
            }
            else{
                try {
                    String amazon_price = "0";
                    String myntra_price = "0";
                    String flipkart_price = "0";
                    String ajio_price = "0";
                    String meesho_price = "0";

                    List<String> prices = getLivePrice();

                    ajio_price = prices.get(0);
                    amazon_price = prices.get(1);
                    flipkart_price = prices.get(2);
                    meesho_price = prices.get(3);
                    myntra_price = prices.get(4);

                    pname = pname.trim();
                    category = category.trim();
                    subctegory = subctegory.trim();
                    pdesc = pdesc.trim();
                    amazon = amazon.trim();
                    myntra = myntra.trim();
                    flipkart = flipkart.trim();
                    ajio = ajio.trim();
                    meesho = meesho.trim();

                    Product newProduct = new Product(id, pname, category, subctegory, pdesc, amazon, myntra, flipkart, ajio, meesho, amazon_price, myntra_price, flipkart_price, ajio_price, meesho_price, img1.getOriginalFilename(), img2.getOriginalFilename(), img3.getOriginalFilename(), img4.getOriginalFilename(), img1.getBytes(), img2.getBytes(), img3.getBytes(), img4.getBytes());

                    String msg = productService.updateProduct(newProduct);
                    if(msg.equals("Updated")){
                        return ResponseEntity.status(HttpStatus.ACCEPTED).body("{\"Msg\":\"Product Updated\"}");
                    }else{
                        System.out.println("\n Error in updating the product : "+msg);
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"Msg\":\"Failed to Update Product\"}");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"Msg\":\"Failed to Update Product\"}");
                }
            }

        }
    
    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Integer id){
        if(id<0){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"Error\":\"Invalid Product Id\"}");
        }
        String msg = productService.deleteProduct(id);
        if(msg.equals("Deleted")){
            return ResponseEntity.status(HttpStatus.OK).body("{\"Msg\":\"Product Deleted\"}");
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"Error\":\"Failed to Delete Product\"}");
        }
    }

    @GetMapping("/product/search/{word}")
    public ResponseEntity<List<Product>> searchProduct(@PathVariable("word") String word){
        if(word.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        List<Product> tempprducts = productService.searchProduct(word);
        if(tempprducts.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.of(Optional.of(tempprducts));
    }
    
    @GetMapping("/product/new")
    public ResponseEntity<List<Product>> newProducts(){
        List<Product> tempprducts = productService.getNewProducts();
        if(tempprducts.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.of(Optional.of(tempprducts));
    }
    
    @GetMapping("/product/{category}/{subctegory}")
    public ResponseEntity<List<Product>> getByCatSubcat(@PathVariable("category") String category, @PathVariable("subctegory") String subctegory){

        if(category.isEmpty() || subctegory.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        List<Product> templist = productService.getByCatSubcat(category, subctegory);
        if(templist.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.of(Optional.of(templist));
    }


    public List<String> getLivePrice() throws IOException {
        
        File htmlFile = new File("src\\main\\resources\\templates\\demo.html");
        FileReader fileReader = new FileReader(htmlFile);
        StringBuilder htmlStringBuilder = new StringBuilder();
        int c;
        while ((c = fileReader.read()) != -1) {
            htmlStringBuilder.append((char) c);
        }
        fileReader.close();

        Document doc = Jsoup.parse(htmlStringBuilder.toString());
        
        List<String> Prices = new ArrayList<>();;

        String AjioPrice = doc.select(".AjioPrice").first().text();
        Prices.add(AjioPrice);

        String AmazonPrice = doc.select(".AmazonPrice").first().text();
        Prices.add(AmazonPrice);
        
        String FlipkartPrice = doc.select(".FlipkartPrice").first().text();
        Prices.add(FlipkartPrice);

        String MeeshoPrice = doc.select(".MeeshoPrice").first().text();
        Prices.add(MeeshoPrice);

        String MyntraPrice = doc.select(".MyntraPrice").first().text();
        Prices.add(MyntraPrice);

        // System.out.println(Prices.toString());

        return Prices;
    }

}
