package wasdev.sample.store;

import com.cloudant.client.api.ClientBuilder;
import com.cloudant.client.api.CloudantClient;
import com.cloudant.client.api.Database;
import com.google.gson.JsonObject;
import wasdev.sample.Sentence;
import java.io.IOException;
import java.net.URL;
import java.util.Collection;
import java.util.List;

public class CloudantSentenceStore implements GenericStore<Sentence> {

    private Database db = null;
    private static final String databaseName = "sentences";

    // Create database
    public CloudantSentenceStore(){
        CloudantClient cloudant = createClient();
        if(cloudant!=null){
            db = cloudant.database(databaseName, true);
        }
    }

    // Return DB
    public Database getDB(){
        return db;
    }

    // Create new cloudant client
    private static CloudantClient createClient() {

        String url;

        if (System.getenv("VCAP_SERVICES") != null) {
            // When running in Bluemix, the VCAP_SERVICES env var will have the credentials for all bound/connected services
            // Parse the VCAP JSON structure looking for cloudant.
            JsonObject cloudantCredentials = VCAPHelper.getCloudCredentials("cloudant");
            if(cloudantCredentials == null){
                System.out.println("No cloudant database service bound to this application");
                return null;
            }
            url = cloudantCredentials.get("url").getAsString();
        } else {
            System.out.println("Running locally. Looking for credentials in cloudant.properties");
            url = VCAPHelper.getLocalProperties("cloudant.properties").getProperty("cloudant_url");
            if(url == null || url.length()==0){
                System.out.println("To use a database, set the Cloudant url in src/main/resources/cloudant.properties");
                return null;
            }
        }

        try {
            System.out.println("Connecting to Cloudant");
            CloudantClient client = ClientBuilder.url(new URL(url)).build();
            return client;
        } catch (Exception e) {
            System.out.println("Unable to connect to database");
            //e.printStackTrace();
            return null;
        }
    }

    // Get entire database as a collection of sentences
    @Override
    public Collection<Sentence> getAll(){
        List<Sentence> docs;
        try {
            docs = db.getAllDocsRequestBuilder().includeDocs(true).build().getResponse().getDocsAs(Sentence.class);
        } catch (IOException e) {
            return null;
        }
        return docs;
    }

    // Get specific db entry by ID
    @Override
    public Sentence get(String id) {
        return db.find(Sentence.class, id);
    }

    // Save new entry to DB
    @Override
    public Sentence persist(Sentence td) {
        String id = db.save(td).getId();
        return db.find(Sentence.class, id);
    }

    // Update DB entry with given ID
    @Override
    public Sentence update(String id, Sentence newSentence) {
        Sentence sentence = db.find(Sentence.class, id);
        db.update(sentence);
        return db.find(Sentence.class, id);

    }

    // Delete DB entry with given ID
    @Override
    public void delete(String id) {
        Sentence sentence = db.find(Sentence.class, id);
        db.remove(id, sentence.get_rev());

    }

    // Count number of entries in the DB
    @Override
    public int count() throws Exception {
        return getAll().size();
    }
}
