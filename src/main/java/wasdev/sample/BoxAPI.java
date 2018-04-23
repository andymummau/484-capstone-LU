package wasdev.sample;

import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

import com.box.sdk.*;


public class BoxAPI {

    public BoxAPI() throws IOException {
        // Read config file into Box Config object
        Reader reader = new FileReader("boxConfig.json");
        BoxConfig boxConfig = BoxConfig.readFrom(reader);

        // Set cache info
        int MAX_CACHE_ENTRIES = 100;
        IAccessTokenCache accessTokenCache = new
                InMemoryLRUAccessTokenCache(MAX_CACHE_ENTRIES);

        // Create new app enterprise connection object
        BoxDeveloperEditionAPIConnection boxAPI =
                BoxDeveloperEditionAPIConnection.getAppEnterpriseConnection(boxConfig, accessTokenCache);

        // PERFORM ACTIONS WITH CLIENT
        // Set upload values
        String filePath = "PATH TO LOCAL FILE TO BE UPLOADED";
        String fileName = "FILE NAME TO UPLOAD AS";
        String folderId = "48659324335";

        // Select Box folder
        BoxFolder folder = new BoxFolder(boxAPI, folderId);

        // Upload file
        FileInputStream stream = new FileInputStream(filePath);
        BoxFile.Info newFileInfo = folder.uploadFile(stream, fileName);
        stream.close();
    }

}