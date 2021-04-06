import { createContext, useContext, useState, useCallback } from "react";
// import _find from "lodash/find";
// import { prop, sortWith, ascend } from "ramda";
import api from "../api";

const CvStateContext = createContext();
const CvDispatchContext = createContext();

const sortCVS = (cvs) => cvs;
// const sortCVS = (cvs) => sortWith(ascend(prop("_id")), cvs);

export const CvContextProvider = ({ children }) => {
  const [cvs, setCVS] = useState([]);
  return (
    <CvStateContext.Provider value={cvs}>
      <CvDispatchContext.Provider value={setCVS}>
        {children}
      </CvDispatchContext.Provider>
    </CvStateContext.Provider>
  );
};

export const useStateCVS = () => {
  const cvs = useContext(CvStateContext);
  if (!cvs) {
    throw Error("useStateCVS must be call withing CvContextProvider");
  }
  return cvs;
};

export const useDispatchCVS = () => {
  const setCVS = useContext(CvDispatchContext);
  if (!setCVS) {
    throw Error("useDispatchCVS must be call withing CvDispatchContext");
  }
  return setCVS;
};

export function useLoadCVS() {
  const setCVS = useDispatchCVS();
  const loadCVS = useCallback(() => {
    return api.CV.fetchAll().then((cvs) => setCVS(sortCVS(cvs)));
  }, [setCVS]);
  return loadCVS;
}

export const useAddCV = () => {
  const setCVS = useDispatchCVS();
  return function (cvData) {
    return api.CV.create(cvData).then((cv) =>
      setCVS((cvs) => sortCVS([...cvs, cv]))
    );
  };
};

export const useUpdateCV = () => {
  const setCVS = useDispatchCVS();
  return function (cvData) {
    return api.CV.update(cvData).then((cv) =>
      setCVS((cvs) => sortCVS(cvs.map((f) => (f._id === cv._id ? cv : f))))
    );
  };
};

export const useSaveCV = () => {
  const updateCV = useUpdateCV();
  const addCV = useAddCV();
  return function (cv) {
    return cv._id ? updateCV(cv) : addCV(cv);
  };
};

export const useDeleteCV = () => {
  const setCVS = useDispatchCVS();
  return function (cv) {
    return api.CV.delete(cv).then(() => {
      setCVS((cvs) => sortCVS(cvs.filter((f) => f._id !== cv._id)));
    });
  };
};
