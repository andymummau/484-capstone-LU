package wasdev.sample.store;

import wasdev.sample.SliderData;

public class SliderDataStoreFactory {

    private static GenericStore<SliderData> instance;
    static {
        CloudantSliderDataStore cvif = new CloudantSliderDataStore();
        if(cvif.getDB() != null){
            instance = cvif;
        }
    }

    public static GenericStore<SliderData> getInstance() {
        return instance;
    }

}