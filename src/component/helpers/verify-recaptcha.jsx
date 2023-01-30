import { setError, setMessage } from "../../store/StoreAction";
import fetchApi from "./fetchApi";
import { devApiUrl } from "./functions-general";

export async function verifyRecaptcha(response, dispatch, setLoading) {
  setLoading(true);
  const recapt = await fetchApi(
    devApiUrl + "/recaptcha/verify-recaptcha.php",
    { response },
    dispatch
  );

  console.log(recapt);

  if (typeof recapt === "undefined") {
    setLoading(false);
    dispatch(setError(true));
    dispatch(setMessage("API / reCAPTCHA error."));
    return;
  }

  if (!recapt.success) {
    setLoading(false);
    dispatch(setError(true));
    dispatch(setMessage("reCAPTCHA error."));
    return;
  }

  return recapt.success;
}
