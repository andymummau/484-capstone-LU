package wasdev.sample;

import java.util.LinkedList;

public class Sentence {

    private String _id;
    private String _rev;
    private String translationID;
    private String fullSentence;
    private LinkedList<String> sentenceChunks = new LinkedList<>();
    private LinkedList<String> urls = new LinkedList<>();

    // No-arg constructor
    public Sentence() {

    }

    // Constructor
    public Sentence(String translationID, String fullSentence) {
        this.translationID = translationID;
        this.fullSentence = fullSentence;
    }

    /** Begin getters/setters **/
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

    public String getTranslationID() {
        return translationID;
    }

    public void setTranslationID(String translationID) {
        this.translationID = translationID;
    }

    public String getFullSentence() {
        return fullSentence;
    }

    public void setFullSentence(String fullSentence) {
        this.fullSentence = fullSentence;
    }

    public LinkedList<String> getSentenceChunks() {
        return sentenceChunks;
    }
    /**End getters/setters**/

    // Adds new url for a word to a sentence object
    public void addUrl(String url) {
        this.urls.add(url);
    }

    // Splits sentence into separate words, see createSentenceChunks
    public void chunkify() {
        this.sentenceChunks = createSentenceChunks(fullSentence);
    }

    /*public String toString(){
        String myString = "";
        for(String s: sentenceChunks) {
            myString += s + "\n";
        }
        return myString;
    }*/

    // Splits sentence into words after trimming, see trimSentence
    private LinkedList<String> createSentenceChunks(String fullSentence) {
        String mySentence = trimSentence(fullSentence);
        for(String s: mySentence.split(" ")) {
            sentenceChunks.add(s);
        }
        return sentenceChunks;
    }

    // Trims sentence and removes spaces and punctuation
    private String trimSentence(String fullSentence){
        String trimmedSentence = fullSentence.trim().toLowerCase().replaceAll("[^a-zA-Z0-9 ]", "");
        return trimmedSentence;
    }
}