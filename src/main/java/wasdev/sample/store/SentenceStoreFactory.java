package wasdev.sample.store;

import wasdev.sample.Sentence;

public class SentenceStoreFactory {
    private static GenericStore<Sentence> instance;
    static {
        CloudantSentenceStore cvif = new CloudantSentenceStore();
        if(cvif.getDB() != null){
            instance = cvif;
        }
    }

    public static GenericStore<Sentence> getInstance() {
        return instance;
    }
}
