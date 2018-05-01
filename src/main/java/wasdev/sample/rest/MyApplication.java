package wasdev.sample.rest;

import org.glassfish.jersey.media.multipart.MultiPartFeature;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;


@ApplicationPath("api")
public class MyApplication extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();
        classes.add(MultiPartFeature.class);
        classes.add(UploadFiles.class);
        classes.add(TranslationResultsAPI.class);
        classes.add(SentenceAPI.class);
        return classes;
    }
}

