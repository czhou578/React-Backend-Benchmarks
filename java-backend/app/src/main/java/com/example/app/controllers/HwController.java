
package com.example.app.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HwController {

    @GetMapping("/app/hw")
    public String hwMessage() {
        return "Hellow world";
    }
}