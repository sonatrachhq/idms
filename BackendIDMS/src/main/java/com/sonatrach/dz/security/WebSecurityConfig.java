package com.sonatrach.dz.security;

import java.util.Arrays;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.sonatrach.dz.security.jwt.JwtAuthEntryPoint;
import com.sonatrach.dz.security.jwt.JwtAuthTokenFilter;





@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		prePostEnabled = true
)

@EnableWebMvc
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//implements WebMvcConfigurer{
   /* @Autowired
    UserDetailsServiceImpl userDetailsService;*/

    @Autowired
    private JwtAuthEntryPoint unauthorizedHandler;

    @Bean
    public JwtAuthTokenFilter authenticationJwtTokenFilter() {
        return new JwtAuthTokenFilter();
    }

   /* @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }*/

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
  /* @Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedOrigins("http://localhost:4200")
		.allowedHeaders("Content-Type, Accept, X-Requested-With,Authorization, remember-me")
		.allowedMethods("POST, GET, OPTIONS, DELETE");
	}
    */
   @Override
   protected void configure(HttpSecurity http) throws Exception {
       http.cors().and().csrf().disable().
               authorizeRequests()
               .antMatchers("/api/auth/**").permitAll()
               .antMatchers("/swagger-ui/**", "/sonatrach-openapi/**").permitAll()
               .anyRequest().authenticated()
               .and()
               .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
               .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
       
       http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
   }
   
   
	/*
	 * @Override public void addResourceHandlers(ResourceHandlerRegistry registry) {
	 * registry.addResourceHandler("swagger-ui.html")
	 * .addResourceLocations("classpath:/META-INF/resources/");
	 * 
	 * registry.addResourceHandler("/webjars/**")
	 * .addResourceLocations("classpath:/META-INF/resources/webjars/"); }
	 */
 
	/*
	 * @Override public void configure(WebSecurity web) throws Exception {
	 * web.ignoring().antMatchers("/v2/api-docs", "/configuration/ui",
	 * "/swagger-resources/**", "/configuration/security", "/swagger-ui.html",
	 * "/webjars/**"); }
	 */
   /* @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }*/
    
   
   @Override
   protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth.inMemoryAuthentication()
               .withUser("admin")
               .password(passwordEncoder().encode("admin123"))
               .authorities("ADMIN");
   }

 
}
