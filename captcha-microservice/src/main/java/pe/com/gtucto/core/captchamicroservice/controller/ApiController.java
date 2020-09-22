package pe.com.gtucto.core.captchamicroservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import pe.com.gtucto.core.captchamicroservice.model.CaptchaResponse;
import pe.com.gtucto.core.captchamicroservice.service.CaptchaServiceV3;

@RestController
public class ApiController {

    @Autowired
    private CaptchaServiceV3 captchaServiceV3;

    @GetMapping("/")
    public String signupview() {
        return "service is running!";
    }

    @PostMapping("/suscribe")
    public ResponseEntity<CaptchaResponse> signup(@RequestHeader("g-recaptcha-response") String response) {
        CaptchaResponse captchaResponse = captchaServiceV3.validateCaptcha(response);
        return ResponseEntity.ok(captchaResponse);
    }

}