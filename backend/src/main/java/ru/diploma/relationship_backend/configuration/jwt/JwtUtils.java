package ru.diploma.relationship_backend.configuration.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtils {
  @Value("${app.jwtSecret}")
  private String jwtSecret;
  @Value("${app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public String generateJwtToken(String email) {
    return Jwts.builder().setSubject(email).setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
        .signWith(SignatureAlgorithm.HS256, jwtSecret).compact();
  }

  public boolean validateJwtToken(String jwt) {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwt);
      return true;
    } catch (MalformedJwtException | IllegalArgumentException e) {
      System.err.println(e.getMessage());
    }

    return false;
  }

  public String getUserNameFromJwtToken(String jwt) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwt).getBody().getSubject();
  }

}
