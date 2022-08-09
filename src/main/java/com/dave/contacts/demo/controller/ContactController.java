package com.dave.contacts.demo.controller;

import com.dave.contacts.demo.entity.Contact;
import com.dave.contacts.demo.service.ContactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ContactController {
    @Autowired
    private ContactService contactService;
    private final Logger log = LoggerFactory.getLogger(ContactController.class);

    @GetMapping("/info")
    public String info() {
        log.info("The application is up and runnung, woohoo!");
        return "The application is up and runnung, woohoo!";
    }

    @GetMapping("/contacts")
    public List<Contact> readContacts(){
        return contactService.readContacts();
    }

    @GetMapping("/contact/{id}")
    public Optional<Contact> readContact(@PathVariable Integer id){
        return contactService.readContact(id);
    }

    @PostMapping("/contact")
    public String createContact(@RequestBody Contact contact) {
        log.info("Request to create contact: {}", contact);
        String result = contactService.createContact(contact);
        if (result.equals("-1")){
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED, "Contact record has empty first name\n");
        } else {
            return result;
        }
    }

    @PutMapping("/contact")
    public String updateContact(@RequestBody Contact contact){
        log.info("Request to update contact: {}", contact);
        return contactService.updateContact(contact);
    }

    @DeleteMapping("/contact")
    public String deleteContact(@RequestBody Contact contact){
        log.info("Request to delete contact: {}", contact);
        return contactService.deleteContact(contact);
    }

}
