package com.fabricbazar.fabricbazar.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fabricbazar.fabricbazar.Repository.UserRepository;
import com.fabricbazar.fabricbazar.entity.OTPSender;
import com.fabricbazar.fabricbazar.entity.User;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private static final String CHARS="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    // private static final String CHARS="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]:;'<>?,./";

    public static String generateRandomString(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }
        return sb.toString();
    }

    public List<User> getUsers(){
        return (List<User>) this.userRepository.findAll();
    }
    
    public Optional<User> getUser(Long id){
        if(id!=null){
            return this.userRepository.findById(id);
        }
        return null;
    }


    public String createUser(User newUser){

        try{
            if (this.userRepository.findAllByEmail(newUser.getEmail()).isEmpty()){
                this.userRepository.save(newUser);
                return "Created";
            }else{
                return "Exist";
            }
        } catch (Exception e){
            return "Error"+e.getMessage();
        }
    }

    public String updateUser(User newUser){
        try{
            this.userRepository.save(newUser);
            return "Created";
        } catch (Exception e){
            return "Error"+e.getMessage();
        }
    }

    public String deleteUser(Long id){
        if(id!=null){
            try {
                this.userRepository.deleteById(id);
                return "Deleted";
            } catch (Exception e) {
                return "Error"+e.getMessage();
            }
        }
        else{
            return null;
        }
    }

    public List<String> login(String email, String password){
        List<User> users = this.userRepository.findAllByEmailAndPassword(email, password);
        List<String> returnString = new ArrayList<>();
        if(users.isEmpty() || users.size()>1)
        {
            returnString.add("Invalid");
            return returnString;
        }
        else{
            users.get(0).setToken(generateRandomString(16));
            users.get(0).setStamp(LocalDateTime.now());
            this.userRepository.save(users.get(0));
            returnString.add(users.get(0).getToken().toString());
            returnString.add(users.get(0).getType());
            returnString.add(users.get(0).getName());
            returnString.add(users.get(0).getId().toString());
            returnString.add(OTPSender.sendOtp(users.get(0).getEmail()));
            return returnString;
        }
    }

    public Boolean isUserValid(Long id, String token){
        Optional<User> users = this.userRepository.findById(id);
        if(users.isEmpty()){
            return false;
        }else{
            if(Duration.between(users.get().getStamp(), LocalDateTime.now()).toMinutes() < 15 && users.get().getToken().equals(token)){
                return true;
            }
            else{
                return false;
            }
        }
    }

    public String logout(Long id){
        Optional<User> tempuser = this.userRepository.findById(id);
        if(tempuser.isPresent()){
            try {
                tempuser.get().setToken(null);
                tempuser.get().setStamp(null);
                this.userRepository.save(tempuser.get());  
                return "LoggedOut";              
            }
            catch (Exception e) {return "Error : "+e.getMessage();}
        }
        else{
            return "NotFound";
        }
    }


}
