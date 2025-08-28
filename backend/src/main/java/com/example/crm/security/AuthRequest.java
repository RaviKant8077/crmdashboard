package com.example.crm.security;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@Data
public class AuthRequest {
    private String username;
    private String password;
    private String email;

}
