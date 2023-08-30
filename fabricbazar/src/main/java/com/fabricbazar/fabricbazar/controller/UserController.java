package com.fabricbazar.fabricbazar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fabricbazar.fabricbazar.entity.User;
import com.fabricbazar.fabricbazar.service.UserService;

@RestController
@CrossOrigin(origins = "http://192.168.0.108:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<List<User>> getUsers(){
        List<User> tempList = this.userService.getUsers();
        if(tempList.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.of(Optional.of(tempList));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable("id") Long id){
        if(id == null){
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Optional<User> tempUser = this.userService.getUser(id);
        if(tempUser.isPresent()){
            return ResponseEntity.of(Optional.of(tempUser));
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/user")
    public ResponseEntity<String> createUser(@RequestBody User newUser){
        String message = this.userService.createUser(newUser);
        if(message.equals("Created")){
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        else if(message.equals("Exist")){
            System.out.println("User Already Exists");
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        else{
            System.out.println("User Creation Error : "+message);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/user")
    public ResponseEntity<String> updateUser(@RequestBody User newUser){
        String message = this.userService.updateUser(newUser);
        if(message.equals("Created")){
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        System.out.println("User Updation Error : "+message);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
        String message = this.userService.deleteUser(id);
        if(message.equals("Deleted")){
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        System.out.println("User Deletion Error : "+message);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam("email") String email, @RequestParam("password") String password){
        if(email.length()>0 && password.length()>0){
            List<String> loginReturn = this.userService.login(email, password);
            if(loginReturn.size() == 1){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\":\"invalid credentials\"}");
            }
            else{
                // return ResponseEntity.ok().body("{\"Token\":\""+loginReturn.get(0)+"\",\"Message\":\"Login Successful!\"}");
                
                return ResponseEntity.ok().body(
                    "{\"Token\" : \""+loginReturn.get(0)+"\",\"Type\" : \""+loginReturn.get(1)+"\",\"Name\" : \""+loginReturn.get(2)+"\",\"Id\" : \""+loginReturn.get(3)+"\",\"Otp\" : \""+loginReturn.get(4)+"\",\"Message\": \"Login Successful!\"}");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\":\"invalid credentials\"}");
        }
    }

    @PostMapping(value="/isvalid")
    public ResponseEntity<Boolean> isUserValid(@RequestParam("id") Long id, @RequestParam("token") String token) {
        if(id>0 && token.length()==16){
            if(this.userService.isUserValid(id, token)){
                return ResponseEntity.status(HttpStatus.OK).build();
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam("id") Long id){
        if(id>0){
            String msg = this.userService.logout(id);
            if(msg.equals("LoggedOut")){
                return ResponseEntity.ok().body("{\"Message\":\"Logout Successful!\",\"Status\":200}");
            }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"Message\":\"Failed to Log Out!\",\"Status\":400}");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("{\"Message\":\"Failed to Log Out! Check Id.\",\"Status\":406}");
    }


}
