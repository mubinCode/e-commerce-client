import { authKey } from "@/constants/auth.constants"
import { setLocalStorage } from "@/utils/local-storage"

export const storeUserInfo = ({accessToken} : {accessToken : string}) => {
  console.log(accessToken)
  return setLocalStorage(authKey, accessToken)
}