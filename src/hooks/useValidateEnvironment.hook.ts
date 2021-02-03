const useValidateEnvironment = () => () => {
  if (!("indexedDB" in window)) {
    alert("This browser doesn't support IndexedDB");
  }
};
export default useValidateEnvironment;
