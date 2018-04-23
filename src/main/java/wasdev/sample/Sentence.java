package wasdev.sample;

import java.util.LinkedList;

public class Sentence {
    private String _id;
    private String _rev;
    private String translationID;
    private String fullSentence;
    private LinkedList<String> sentenceChunks = new LinkedList<>();

    public Sentence() {

    }

    public Sentence(String translationID, String fullSentence) {
        this.translationID = translationID;
        this.fullSentence = fullSentence;
        sentenceChunks = getSentenceChunks(fullSentence);
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

    public String toString(){
        String myString = "";
        for(String s: sentenceChunks) {
            myString += s + "\n";
        }
        return myString;
    }

    // .trim().toLowerCase().replaceAll("[^a-zA-Z ]", "")
    private LinkedList<String> getSentenceChunks(String fullSentence) {
        String mySentence = trimSentence(fullSentence);
        for(String s: mySentence.split(" ")) {
            sentenceChunks.add(s);
        }
        return sentenceChunks;
    }

    private String trimSentence(String fullSentence){
        String trimmedSentence = fullSentence.trim().toLowerCase().replaceAll("[^a-zA-Z ]", "");
        return trimmedSentence;
    }
}