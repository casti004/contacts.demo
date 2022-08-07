package com.dave.contacts.demo.repository;

import com.dave.contacts.demo.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {

    public boolean existsByEmail(String email);

    public List<Contact> findByEmail(String email);
    
    @Query("select max(c.id) from Contact c")
    public Integer findMaxId();
}
