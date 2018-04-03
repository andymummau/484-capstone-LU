/*******************************************************************************
 * Copyright (c) 2017 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/ 
package wasdev.sample.rest;

import com.google.gson.Gson;
import wasdev.sample.Visitor;
import wasdev.sample.store.VisitorStore;
import wasdev.sample.store.VisitorStoreFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import java.util.ArrayList;
import java.util.List;

@ApplicationPath("api")
@Path("/sliderContent")
public class SliderAPI extends Application {
	
	//Our database store
	VisitorStore store = VisitorStoreFactory.getInstance();

  /**
   * Gets all Visitors.
   * REST API example:
   * <code>
   * GET http://localhost:9080/GetStartedJava/api/visitors
   * </code>
   * 
   * Response:
   * <code>
   * [ "Bob", "Jane" ]
   * </code>
   * @return A collection of all the Visitors
   */
    @GET
    @Path("/")
    @Produces({"application/json"})
    public String getSliderContent() {

		if (store == null) {
			return "[]";
		}
		
		List<String> words = new ArrayList<String>();
		for (Visitor doc : store.getAll()) {
			String word = doc.getWord();
			if (word != null){
				words.add(word);
			}
		}

        List<String> urls = new ArrayList<String>();
        for (Visitor doc : store.getAll()) {
            String url = doc.getUrl();
            if (url != null){
                urls.add(url);
            }
        }
		return "{'words': '" + words + "', 'url': '" + urls + "'}";
        //new Gson().toJson(words);
    }
    
    /**
     * Creates a new Visitor.
     * 
     * REST API example:
     * <code>
     * POST http://localhost:9080/GetStartedJava/api/visitors
     * <code>
     * POST Body:
     * <code>
     * {
     *   "name":"Bob"
     * }
     * </code>
     * Response:
     * <code>
     * {
     *   "id":"123",
     *   "name":"Bob"
     * }
     * </code>
     * @param visitor The new Visitor to create.
     * @return The Visitor after it has been stored.  This will include a unique ID for the Visitor.
     */
    @POST
    @Produces("application/text")
    @Consumes("application/json")
    public String newToDo(Visitor visitor) {
      if(store == null) {
    	  return String.format("Hello and welcome %s!", visitor.getName());
      }
      store.persist(visitor);
      return String.format("Hello and welcome to %s! I've added you to the database.", visitor.getName());

    }

}