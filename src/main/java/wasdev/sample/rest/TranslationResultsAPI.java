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
import wasdev.sample.SliderData;
import wasdev.sample.Sentence;
import wasdev.sample.store.GenericStore;
import wasdev.sample.store.SentenceStoreFactory;
import wasdev.sample.store.SliderDataStoreFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import java.util.ArrayList;
import java.util.List;

@Path("/results")
public class TranslationResultsAPI extends Application {

	//Our database store1
	GenericStore<SliderData> store1 = SliderDataStoreFactory.getInstance();
	GenericStore<Sentence> store2 = SentenceStoreFactory.getInstance();

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

		if (store1 == null) {
			return "[]";
		}

		List<SliderData> wordData = new ArrayList<>();
		for (SliderData doc : store1.getAll()) {
			wordData.add(doc);
		}

		return new Gson().toJson(wordData);
	}

}