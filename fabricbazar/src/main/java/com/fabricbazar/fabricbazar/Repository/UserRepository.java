package com.fabricbazar.fabricbazar.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.fabricbazar.fabricbazar.entity.User;

public interface UserRepository extends CrudRepository<User, Long>{

    public List<User> findAllByEmailAndPassword(String email, String password);
    public List<User> findAllByEmail(String email);
}
