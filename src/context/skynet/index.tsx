import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CustomUploadOptions, MySky, SkynetClient } from "skynet-js";
import { FileSystemDAC } from "fs-dac-library";
// Initiate the SkynetClient
//const portal = "https://skynetfree.net";
const portal = "https://siasky.net";

// ### API Key Token
//const client = new SkynetClient(portal,{skynetApiKey: "ADD API KEY HERE"});

// ### JWT Token
//const jwtToken = "get JWT TOKEN from browser and add here";
//const client = new SkynetClient(portal,{customCookie:jwtToken});

const client = new SkynetClient(portal);


const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
const dataDomain =  hostname === 'localhost' ? 'localhost' : 'skyspaces.hns'

type State = {
  mySky: MySky;
  userID: string;
  fileSystemDAC : any;
  dataDomain: string;
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
  uploadLargeFile: (file: File) => void;
};

//Create Skynet Context
const SkynetContext = createContext({} as State);

//Custom Hook for Functional component access
export const useSkynet = () => useContext(SkynetContext);

type Props = {
  children: React.ReactNode;
};

export function SkynetProvider({ children }: Props) {
  const [userID, setUserID] = useState<any>();
  const [mySky, setMySky] = useState<any>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [fileSystemDAC, setFileSystemDAC] = useState(new FileSystemDAC() as any);
  //const fileSystemDAC = new FileSystemDAC() as any;
  // On initial run, start initialization of MySky
  useEffect(() => {
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(dataDomain, { debug: true });
        // load necessary DACs and permissions
        await mySky.loadDacs(fileSystemDAC);
        // check if user is already logged in with permissions
        const loggedIn = await mySky.checkLogin();
        console.log("loggedIn: "+loggedIn);
        // set react state for login status and
        // to access mySky in rest of app
        setMySky(mySky);
        setLoggedIn(loggedIn);
        if (loggedIn) {
          setUserID(await mySky.userID());
        }
      } catch (e) {
        console.error(e);
      }
    }
    // call async setup function
    initMySky();
  }, []);
  // eslint-disable-next-line
  const login = async () => {
    // Try login again, opening pop-up. Returns true if successful
    const status = await mySky!.requestLoginAccess();
    // set react state
    setLoggedIn(status);
    if (status) {
      setUserID(await mySky!.userID());
      console.log(`Login Success: UserID ${userID}`);
    }
  };
  // eslint-disable-next-line
  const logout = async () => {
    // call logout to globally logout of mysky
    await mySky!.logout();
    //set react state
    setLoggedIn(false);
    setUserID("");
    console.log(`Logout Success: UserID ${userID}`);
  };
   // eslint-disable-next-line
   const uploadLargeFile = async (file: File) => {
      console.log(`Login Verified`);
      /**
       * Custom upload options.
       *
       * @property [endpointUpload] - The relative URL path of the portal endpoint to contact.
       * @property [endpointLargeUpload] - The relative URL path of the portal endpoint to contact for large uploads.
       * @property [customFilename] - The custom filename to use when uploading files.
       * @property [largeFileSize=41943040] - The size at which files are considered "large" and will be uploaded using the tus resumable upload protocol. This is the size of one chunk by default (40 mib).
       * @property [errorPages] - Defines a mapping of error codes and subfiles which are to be served in case we are serving the respective error code. All subfiles referred like this must be defined with absolute paths and must exist.
       * @property [numParallelUploads=2] - Used to override the default number of parallel uploads. Disable parallel uploads by setting to 1. Note that each parallel upload must be chunk-aligned so the number of parallel uploads may be limited if some parts would end up empty.
       * @property [retryDelays=[0, 5_000, 15_000, 60_000, 300_000, 600_000]] - An array or undefined, indicating how many milliseconds should pass before the next attempt to uploading will be started after the transfer has been interrupted. The array's length indicates the maximum number of attempts.
       * @property [tryFiles] - Allows us to set a list of potential subfiles to return in case the requested one does not exist or is a directory. Those subfiles might be listed with relative or absolute paths. If the path is absolute the file must exist.
       */
      const uploadOptions : CustomUploadOptions ={
        //endpointUpload?: string;
        //endpointLargeUpload?: string;
        //customFilename?: string;
        //errorPages?: JsonData;
        //largeFileSize?: number;
        //numParallelUploads?: number;
        //retryDelays?: number[];
        //tryFiles?: string[];
      };
      // --> result{"skylink":"sia://AABbzLehWZbVgLkl2ChBgWeFZi_wk_S5vXpz_G9Q81yphg"} TUS uploaded skylink
      const result = await client.uploadFile(file);
      console.log(`--> result`+JSON.stringify(result));
  };
  const value = {
    mySky,
    userID,
    fileSystemDAC,
    dataDomain,
    loggedIn,
    login,
    logout,
    uploadLargeFile
  };
  return (
    <SkynetContext.Provider value={value}>{children}</SkynetContext.Provider>
  );
}
