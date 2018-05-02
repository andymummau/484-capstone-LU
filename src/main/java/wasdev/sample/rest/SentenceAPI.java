package wasdev.sample.rest;

import com.google.gson.Gson;
import wasdev.sample.Sentence;
import wasdev.sample.SliderData;
import wasdev.sample.store.GenericStore;
import wasdev.sample.store.SentenceStoreFactory;
import wasdev.sample.store.SliderDataStoreFactory;

import javax.ws.rs.*;
//import javax.ws.rs.core.Application;
import java.util.ArrayList;
import java.util.List;

//@ApplicationPath("api")
@Path("/sentenceAPI")
public class SentenceAPI {
    Sentence query;

    //Our database store1
    GenericStore<Sentence> sentenceStore = SentenceStoreFactory.getInstance();
    GenericStore<SliderData> sliderDataStore = SliderDataStoreFactory.getInstance();

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

        if (sentenceStore == null) {
            return "[]";
        }

        /*List<Sentence> ourData = new ArrayList<>();
        for (Sentence doc : sentenceStore.getAll()) {
            ourData.add(doc);
        }*/
        System.out.println(query.get_id());
        Sentence ourData = sentenceStore.get(query.get_id());

        return new Gson().toJson(ourData);
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
     * @param sentence The new Visitor to create.
     * @return The Visitor after it has been stored.  This will include a unique ID for the Visitor.
     */
    @POST
    @Consumes("application/json")
    public void newSentence(Sentence sentence) {
        sentence.chunkify();
        matchWords(sentence);
        query = sentenceStore.persist(sentence);
    }

    private void matchWords(Sentence sentence) {

        for (String word : sentence.getSentenceChunks()) {
            for (SliderData data : sliderDataStore.getAll()){
                if(data.getWord().equals(word)) {
                    sentence.addUrl(data.getUrl());
                }
            }
        }
    }
}
