import ROUTES from "constants/routes";

export const isAuthorized = (userName:any, navigation:any) => {
  if (!userName) {
    alert("No user logged in ");
    navigation(ROUTES.Login_Form);
  } else {
    return true;
  }
};
