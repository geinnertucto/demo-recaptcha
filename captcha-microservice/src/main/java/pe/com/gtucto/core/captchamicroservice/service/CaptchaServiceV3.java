package pe.com.gtucto.core.captchamicroservice.service;

import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import pe.com.gtucto.core.captchamicroservice.model.CaptchaResponse;

@Service("captchaServiceV3")
public class CaptchaServiceV3 {

    private static final String GOOGLE_RECAPTCHA_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify";

    public CaptchaResponse validateCaptcha(String captchaResponse) {
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> requestMap = new LinkedMultiValueMap<>();
        requestMap.add("secret", "SECRET_KEY");
        requestMap.add("response", captchaResponse);

        return restTemplate.postForObject(GOOGLE_RECAPTCHA_ENDPOINT, requestMap, CaptchaResponse.class);
    }
}
