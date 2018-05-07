package wasdev.sample.rest;

import com.google.gson.Gson;
import wasdev.sample.Sentence;
import wasdev.sample.SliderData;
import wasdev.sample.store.GenericStore;
import wasdev.sample.store.SentenceStoreFactory;
import wasdev.sample.store.SliderDataStoreFactory;
import com.cloudant.client.api.Database;

import javax.ws.rs.*;
/*import javax.ws.rs.core.Application;
import java.util.ArrayList;
import java.util.List;*/

@ApplicationPath("api")
@Path("/sentenceAPI")
public class SentenceAPI {

    static String transID;

    //Our database store1
    GenericStore<Sentence> sentenceStore = SentenceStoreFactory.getInstance();
    GenericStore<SliderData> sliderDataStore = SliderDataStoreFactory.getInstance();

    public String getTransID() {
        return transID;
    }

    public void setTransID(String transID) {
        this.transID = transID;
    }

    @POST
    @Consumes("application/json")
    public void newSentence(Sentence sentence) {
        setTransID(sentence.getTranslationID());
        sentence.set_id(sentence.getTranslationID());
        sentence.chunkify();
        matchWords(sentence);
        sentenceStore.persist(sentence);
    }

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

        //System.out.println("getSliderContent:" + getTransID());
        Sentence ourData = sentenceStore.get(getTransID());

        return new Gson().toJson(ourData);
    }


    private void matchWords(Sentence sentence) {
        System.out.println("matchWords:" + getTransID());
        for (String word : sentence.getSentenceChunks()) {
            for (SliderData data : sliderDataStore.getAll()){
                if(data.getWord().equals(word)) {
                    sentence.addUrl(data.getUrl());
                }
            }
        }
    }
}
