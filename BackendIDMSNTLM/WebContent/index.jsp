<%@page import="com.google.gson.JsonObject"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="com.google.gson.Gson"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<%@ page import="java.util.Base64" %>
<%@ page import="java.net.InetAddress" %>
<%-- <%@ page import="jcifs.smb.NtlmPasswordAuthentication" %> --%>
<%@ page import="Decoder.BASE64Decoder" %>
<%@ page import="Decoder.BASE64Encoder" %>

<%
System.out.println("Begin Call ");
	/*
String ipAddress =  request.getRemoteAddr();  
String a1 =  request.getAuthType();
String a2 =  request.getContextPath();
String a3 =  request.getRemoteHost();
String a4 =  request.getRequestedSessionId();
String a5 =  request.changeSessionId();
String a6 =  request.getRemoteUser();

System.out.println("IP remote adr: "+ipAddress);
System.out.println("a1 AuthType = "+a1);
System.out.println("a2 ContextPath = "+a2);
System.out.println("a3 RemoteHost = "+a3);
System.out.println("a4 RequestedSessionId = "+a4);
System.out.println("a5 changeSessionId = "+a5);
System.out.println("a6 RemoteUser = "+a6);

String xForwardedForHeader = request.getHeader("host");
System.out.println("IP of host: "+xForwardedForHeader);

NtlmPasswordAuthentication ntlmPasswordAuthentication;
ntlmPasswordAuthentication = new NtlmPasswordAuthentication("DOMAIN", "USERNAME", "PASSWORD");
//String username = ntlmPasswordAuthentication.getUsername();

//String username = request.getHeader("X-Username");
System.out.println("username is : "+ntlmPasswordAuthentication.getUsername());

byte[]  myip = new byte[] { 10,100,12,15 }; 

System.out.println("ip local host = "+InetAddress.getLocalHost());
System.out.println("ip by name = "+InetAddress.getByName("ALGE106013"));
System.out.println("ip by ip address = "+InetAddress.getByAddress(myip));
 */ 
 /*
 System.out.println("User-Agent = "+request.getHeader("User-Agent"));
 System.out.println("sec-ch-ua-platform = "+request.getHeader("sec-ch-ua-platform"));
 System.out.println("sec-ch-ua = "+request.getHeader("sec-ch-ua"));
*/

String remoteipaddress =  request.getRemoteHost();

//get NTLM authorization header
  String sysuser="";
  String clientdomain="";
  String remotehost="";
  String json="";
  String auth = request.getHeader("Authorization");
  
  //System.out.println("1:auth = "+auth); 
  
  
  //header problem (not sent)
  if (auth == null || !(auth.startsWith("NTLM ")) ) {
	  System.out.println("auth == null || !(auth.startsWith(NTLM )"); 
	  response.setStatus(response.SC_UNAUTHORIZED);	   
	  response.setHeader("WWW-Authenticate", "NTLM");		  
	  return;
      }
  
  //read authorization header content :
	if (auth.startsWith("NTLM ")) {
		 System.out.println("auth.startsWith(NTLM )"); 
	  //decode authorization header content :
	  byte[] msg =  new BASE64Decoder().decodeBuffer(auth.substring(5));
	  //byte[] msg =   Base64.getDecoder().decode(auth.substring(5));
	  //byte[] msg =  Base64.Decoder(auth.substring(5));
	  
	  //System.out.println("msg = "+msg);
	  //System.out.println("msgof8 = "+msg[8]);
	  
	  int off = 0, offf=0, length, offset;
	  if (msg[8] == 1)
	  { 

	byte z = 0;

	byte[] msg1 = { (byte) 'N', (byte) 'T', (byte) 'L', (byte) 'M', (byte) 'S', (byte) 'S', (byte) 'P', z,
			(byte) 2, z, z, z, z, z, z, z, (byte) 40/*msg*/, z/*length*/, z, z, (byte) 1, (byte) 130, (byte) 8,
			z, z, (byte) 2, (byte) 2, (byte) 2, z, z, z, z, z, z, z, z, z, z, z, z };
	//System.out.println("msg1 = " + msg1);

	// 	    byte[] msg2 = {(byte)'N', (byte)'T', (byte)'L', (byte)'M', (byte)'S', (byte)'S', (byte)'P',
	// 	  	      z,(byte)2, z, z, z, z, z, z, z,(byte)40/*msg*/, z/*length*/, z, z,
	// 	  	      (byte)1, (byte)130, z, z,z, (byte)2, (byte)2,
	// 	  	      (byte)2, z, z, z, z, z, z, z, z, z, z, z, z};
	// 	    System.out.println("msg2 = "+msg2);

	// 	    byte[] msg3 = {(byte) 'N', (byte) 'T', (byte) 'L', (byte) 'M', (byte) 'S', (byte) 'S', (byte) 'P', (byte) '\0',
	// 	            0x02, 0, 0, 0, 0, 0, 0, 0, /*msg*/0x28, 0/*length*/, 0, 0, 0x01, (byte) 0b10000010, 0, 0,
	// 	            1, 2, 3, 4, 5, 6, 7, 8, //nonce
	// 	            0, 0, 0, 0, 0, 0, 0, 0};
	// 	    	    System.out.println("msg3 = "+msg3);  

	response.setHeader("WWW-Authenticate", "NTLM " + new BASE64Encoder().encodeBuffer(msg1));
	//Base64.getEncoder().encode(msg1));	 	       

	response.sendError(response.SC_UNAUTHORIZED);
	//System.out.println("2:msg8=3");
	return;

		} else if (msg[8] == 3) {
	off = 30;
	System.out.println("2:msg8=3");
	//read user info from decoded authorization header content:
	//Domain
	length = msg[off + 1] * 256 + msg[off];
	offset = msg[off + 3] * 256 + msg[off + 2];
	String domain = new String(msg, offset, length);
	//Host
	length = msg[off + 17] * 256 + msg[off + 16];
	offset = msg[off + 19] * 256 + msg[off + 18];
	String remoteHost = new String(msg, offset, length);
	//Username
	length = msg[off + 9] * 256 + msg[off + 8];
	offset = msg[off + 11] * 256 + msg[off + 10];
	String username = new String(msg, offset, length);
	
	
	int usernamelength = username.length();
	// Replace emptiness in the username

	for (int i = 0; i < usernamelength; i = i + 2) {
		String a = username.substring(i, i + 1);
		sysuser = sysuser + a;
	}
	
	int domainlength = domain.length();
	for (int i = 0; i < domainlength; i = i + 2) {
		String a = domain.substring(i, i + 1);
		clientdomain = clientdomain + a;
	}
	
	int remotehostlength = remoteHost.length();
	for (int i = 0; i < remotehostlength; i = i + 2) {
		String a = remoteHost.substring(i, i + 1);
		remotehost = remotehost + a;
	}
    Gson gson = new Gson();
   
    JsonObject modelJson = new JsonObject();
    modelJson.addProperty("username", sysuser);
    modelJson.addProperty("domain", clientdomain);
    modelJson.addProperty("remotehost", remotehost);
    modelJson.addProperty("remoteipaddress", remoteipaddress);
 
   
     json = gson.toJson(modelJson);
    System.out.println(json);
 
  out.print(modelJson);
    out.flush(); 
		}
	}
%>
<script type="text/javascript">
function goahead(){
	alert(document.getElementById("json").value)
	alert(document.getElementById("sysuser").value)
	//document.getElementById("submit-form").click();
}
</script>

<body bgcolor="#ffffff" onload="goahead();" >
<h1>

<form  id="form1" name="form1" styleId="form1" method="post"  action="http://localhost:4200" target="_top" >
<input id="sysuser" name="sysuser" style="width: 500px;" value="username :<%=sysuser%>  "/>
<p id="json" name="json" style="width: 500px;" value="json :<%=json%>  "><%=json%></p>
<input name="domain" style="width: 500px;" value="domain :<%=clientdomain%>  "/>
<input  name="host" style="width: 500px;" value="client hostname :<%=remotehost%>  "/>
<input name="iphost" style="width: 500px;" value="client ip address :<%=remoteipaddress%>  "/>
<input type="submit" id="submit-form" value="Submit Form" style="display: none;"/> 

</form>
</h1>

</body>
</html>
