package com.dave.contacts.demo.controller;

import com.dave.contacts.demo.entity.Contact;
import com.dave.contacts.demo.service.ContactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
public class ContactController {
    @Autowired
    private ContactService contactService;
    private final Logger log = LoggerFactory.getLogger(ContactController.class);

    @RequestMapping(value = "info", method = RequestMethod.GET)
    public String info() {
        log.info("The application is up and runnung, woohoo!");
        return "The application is up and runnung, woohoo!";
    }

    @RequestMapping(value = "createcontact", method = RequestMethod.POST)
    public String createStudent(@RequestBody Contact contact){
        log.info("Request to create contact: {}", contact);
        return contactService.createContact(contact);
    }

    @RequestMapping(value = "readcontacts", method = RequestMethod.GET)
    public List<Contact> readContacts(){
        return contactService.readContacts();
    }

    @RequestMapping(value = "updatecontact", method = RequestMethod.PUT)
    public String updateContact(@RequestBody Contact contact){
        log.info("Request to update contact: {}", contact);
        return contactService.updateContact(contact);
    }

    @RequestMapping(value = "deletecontact", method = RequestMethod.DELETE)
    public String deleteContact(@RequestBody Contact contact){
        log.info("Request to delete contact: {}", contact);
        return contactService.deleteContact(contact);
    }

}
