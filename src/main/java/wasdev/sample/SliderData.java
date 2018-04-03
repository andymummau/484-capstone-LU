package wasdev.sample;

public class SliderData {

    private String word;
    private String url;

    public SliderData(){

    }

    public SliderData(String word, String url) {
        this.word = word;
        this.url = url;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getWord() {
        return word;
    }

    public String getUrl() {
        return url;
    }

    public String getJson() {
        return "{\"word\": \"" + word + "\", \"url\": \"" + url + "\"}";
    }
}
