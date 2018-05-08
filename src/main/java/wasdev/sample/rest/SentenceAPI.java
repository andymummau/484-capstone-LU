package wasdev.sample.rest;

import com.google.gson.Gson;
import wasdev.sample.Sentence;
import wasdev.sample.SliderData;
import wasdev.sample.store.GenericStore;
import wasdev.sample.store.SentenceStoreFactory;
import wasdev.sample.store.SliderDataStoreFactory;
import javax.ws.rs.*;

@ApplicationPath("api")
@Path("/sentenceAPI")
public class SentenceAPI {

    // Stores translationID from last POST sentence store for GET retrieval
    private static String transID;

    /************************************
    sentenceStore is for new sentences.
    sliderDataStore is for words and urls.
    *************************************/
    private GenericStore<Sentence> sentenceStore = SentenceStoreFactory.getInstance();
    private GenericStore<SliderData> sliderDataStore = SliderDataStoreFactory.getInstance();

    // Get/Set for transID
    public String getTransID() {
        return transID;
    }

    public void setTransID(String transID) {
        this.transID = transID;
    }

    /****************************************************************************
    Receives new sentences from web interface and processes them for translation.
    After processing, sentences are stored in the sentences database.
     ****************************************************************************/
    @POST
    @Consumes("application/json")
    public void newSentence(Sentence sentence) {
        setTransID(sentence.getTranslationID());
        sentence.set_id(sentence.getTranslationID());
        sentence.chunkify();
        matchWords(sentence);
        sentenceStore.persist(sentence);
    }

    /****************************************************************************
     Returns sentence information from database as JSON.
     ****************************************************************************/
    @GET
    @Path("/")
    @Produces({"application/json"})
    public String getSliderContent() {

        if (sentenceStore == null) {
            return "[]";
        }

        Sentence ourData = sentenceStore.get(getTransID());

        return new Gson().toJson(ourData);
    }

    /****************************************************************************
     Matches words in a new sentence to words in the words-url database.
     ****************************************************************************/
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
