package com.sergio.boundary;

import javax.annotation.PostConstruct;
import javax.validation.constraints.NotNull;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

@Path("/entries")
public class BlogResources {
	
	private static final String REQUEST_BASE_URI = "http://elastic:9200/";
	private Client client;
	private WebTarget baseTarget;
	
	@PostConstruct
	public void init() {
		client =  ClientBuilder.newClient();
		baseTarget = client.target(REQUEST_BASE_URI);
	}

	@GET
	@Path("/entry/{id}")
	public Response items(
			@PathParam("id") @NotNull Integer id){
		WebTarget itemTarget = baseTarget.path("items/item/{id}");
		String json = itemTarget.resolveTemplate("id", id)
				.request(MediaType.APPLICATION_JSON_TYPE)
				.get(String.class);
		return Response.status(Status.OK).entity(json).build();
	}
}
