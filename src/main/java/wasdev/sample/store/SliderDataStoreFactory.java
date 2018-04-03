package wasdev.sample.store;

public class SliderDataStoreFactory {

    private static SliderDataStore instance;
    static {
        CloudantSliderDataStore cvif = new CloudantSliderDataStore();
        if(cvif.getDB() != null){
            instance = cvif;
        }
    }

    public static SliderDataStore getInstance() {
        return instance;
    }

}
