package com.dave.contacts.demo.service;

import com.dave.contacts.demo.entity.Contact;
import com.dave.contacts.demo.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Transactional
    public String createContact(Contact contact){
        try {
            if (!contactRepository.existsByEmail(contact.getEmail()) && !contact.getEmail().isEmpty()  ){
                contact.setId(null == contactRepository.findMaxId()? 0 : contactRepository.findMaxId() + 1);
                contactRepository.save(contact);
                return "contact record created successfully.";
            }else {
                if (contact.getEmail().isEmpty()){
                    return "contact must have an email address";
                }
                return "contact already exists in the database.";
            }
        }catch (Exception e){
            throw e;
        }
    }

    public List<Contact> readContacts(){
        try{
            return contactRepository.findAll();
        }catch (Exception e){
            throw e;
        }
    }

    public Optional<Contact> readContact(Integer id){
        try{
            return contactRepository.findById(id);
        }catch (Exception e){
            throw e;
        }
    }

    @Transactional
    public String updateContact(Contact contact){
        if (contactRepository.existsByEmail(contact.getEmail())){
            try {
                List<Contact> contacts = contactRepository.findByEmail(contact.getEmail());
                contacts.stream().forEach(s -> {
                    Contact contactToUpdate = contactRepository.findById(s.getId()).get();
                    contactToUpdate.setFirstName(contact.getFirstName());
                    contactToUpdate.setLastName(contact.getLastName());
                    contactToUpdate.setEmail(contact.getEmail());
                    contactToUpdate.setPhone(contact.getPhone());
                    contactRepository.save(contactToUpdate);
                });
                return "Contact record updated.";
            }catch (Exception e){
                throw e;
            }
        }else {
            return "Contact does not exists in the database.";
        }
    }

    @Transactional
    public String deleteContact(Contact contact){
        if (contactRepository.existsByEmail(contact.getEmail())){
            try {
                List<Contact> contacts = contactRepository.findByEmail(contact.getEmail());
                contacts.stream().forEach(s -> {
                    contactRepository.delete(s);
                });
                return "Contact record deleted successfully.";
            }catch (Exception e){
                throw e;
            }

        }else {
            return "Contact does not exist";
        }
    }
}