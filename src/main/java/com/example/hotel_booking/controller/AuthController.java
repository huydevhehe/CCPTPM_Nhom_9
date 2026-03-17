package com.example.hotel_booking.controller;

import com.example.hotel_booking.dto.requests.LoginRequest;
import com.example.hotel_booking.dto.requests.RegisterRequest;
import com.example.hotel_booking.dto.responses.AuthResponse;
import com.example.hotel_booking.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {

        String message = authService.register(request);

        return new AuthResponse(message);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        String message = authService.login(request);

        return new AuthResponse(message);
    }

    @GetMapping("/me")
    public String me(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        return email;
    }
}