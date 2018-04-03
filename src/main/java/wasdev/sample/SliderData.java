package wasdev.sample;

public class SliderData {

    private String _id;
    private String _rev;
    private String word;
    private String url;

    public SliderData(){

    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_rev() {
        return _rev;
    }

    public void set_rev(String _rev) {
        this._rev = _rev;
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
        return "{word: " + word + ", url: " + url + "}";
    }
}
