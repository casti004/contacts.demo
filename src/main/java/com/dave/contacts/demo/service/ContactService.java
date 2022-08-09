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
            // if (!contactRepository.existsByEmail(contact.getEmail()) && !contact.getEmail().isEmpty()  ){
            //     contact.setId(null == contactRepository.findMaxId()? 0 : contactRepository.findMaxId() + 1);
            //     contactRepository.save(contact);
            //     return "contact record created successfully.";
            // }else {
            //     if (contact.getEmail().isEmpty()){
            //         return "contact must have an email address";
            //     }
            //     return "contact already exists in the database.";
            // }

            // Use case, everything can be empty, except first name
            if (!contact.getFirstName().isEmpty()){
                contact.setId(null == contactRepository.findMaxId()? 0 : contactRepository.findMaxId() + 1);
                contactRepository.save(contact);
                return "contact record created successfully.";
            } else{
                return "-1";
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
            try {
                    Optional<Contact> contactToUpdate = contactRepository.findById(contact.getId());
                    if (contactToUpdate.isPresent()) {
                        contactToUpdate.get().setFirstName(contact.getFirstName());
                        contactToUpdate.get().setLastName(contact.getLastName());
                        contactToUpdate.get().setEmail(contact.getEmail());
                        contactToUpdate.get().setPhone(contact.getPhone());
                        contactRepository.save(contactToUpdate.get());
                    }


                return "Contact record updated.";
            }catch (Exception e){
                throw e;
            }
        
    }

    @Transactional
    public String deleteContact(Contact contact){
        if (contactRepository.existsByEmail(contact.getEmail())){
            try {
                Optional<Contact> contactToDelete = contactRepository.findById(contact.getId());

                if(contactToDelete.isPresent()){
                    contactRepository.delete(contactToDelete.get());
                    return "Contact record deleted successfully.";
                } else{
                    return "-1";
                }
                
            }catch (Exception e){
                throw e;
            }

        }else {
            return "Contact does not exist";
        }
    }
}