package wasdev.sample.rest;

import com.google.gson.Gson;
import wasdev.sample.Sentence;
import wasdev.sample.store.GenericStore;
import wasdev.sample.store.SentenceStoreFactory;

import javax.ws.rs.*;
//import javax.ws.rs.core.Application;
import java.util.ArrayList;
import java.util.List;

//@ApplicationPath("api")
@Path("/sliderContent")
public class SentenceAPI {

    //Our database store
    GenericStore<Sentence> store = SentenceStoreFactory.getInstance();

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

    /*List<String> words = new ArrayList<String>();
    for (SliderData doc : store.getAll()) {
        String word = doc.getWord();
        if (word != null){
            words.add(word);
        }
    }

    List<String> urls = new ArrayList<String>();
    for (SliderData doc : store.getAll()) {
        String url = doc.getUrl();
        if (url != null){
            urls.add(url);
        }
    }*/
        List<Sentence> ourData = new ArrayList<>();
        for (Sentence doc : store.getAll()) {
            ourData.add(doc);
        }

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
    store.persist(sentence);
}
}
