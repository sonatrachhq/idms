package com.sonatrach.dz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;



@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "IDMS API", version = "2.0", description = "IDMS Apis Documentation"))
@SecurityScheme(name = "sonatrach-apidoc", scheme = "basic", type = SecuritySchemeType.HTTP, in = SecuritySchemeIn.HEADER)
public class BackendIdmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendIdmsApplication.class, args);
	}

	
	/*
	 * @Bean public Docket swaggerConfiguration() { return new
	 * Docket(DocumentationType.SWAGGER_2) .select()
	 * .paths(PathSelectors.ant("/api/*"))
	 * .apis(RequestHandlerSelectors.basePackage("com.sonatrach.dz")) .build(); }
	 */
	 
}
