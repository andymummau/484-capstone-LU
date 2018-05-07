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
//import wasdev.sample.SliderData;
import wasdev.sample.Sentence;
import wasdev.sample.store.GenericStore;
import wasdev.sample.store.SentenceStoreFactory;
import wasdev.sample.rest.SentenceAPI;
//import wasdev.sample.store.SliderDataStoreFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import java.util.ArrayList;
import java.util.List;

@ApplicationPath("api")
@Path("/results")
public class TranslationResultsAPI extends Application {

	//Our database store1
	//GenericStore<SliderData> store1 = SliderDataStoreFactory.getInstance();
	GenericStore<Sentence> store = SentenceStoreFactory.getInstance();

	@GET
	@Path("/")
	@Produces({"application/json"})
	public String getSliderContent() {

		if (store == null) {
			return "[]";
		}

		/*List<Sentence> wordData = new ArrayList<>();
		for (Sentence doc : store.getAll()) {
			wordData.add(doc);
		}*/

        Sentence ourData = store.get("1525645375638");

		return new Gson().toJson(ourData);
	}

}