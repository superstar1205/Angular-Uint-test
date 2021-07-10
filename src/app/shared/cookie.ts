import jsCookies from 'js-cookie';
import { AppConstants } from './constants';


const COOKIE =  btoa(AppConstants.AppSecret);

export const SetAuthCookie = (token) =>{
    const json = `${token}|${Date.now()}`;
    const encodedText = btoa(json);
    jsCookies.set(COOKIE, encodedText);
}

export const RemoveAuthCookie = () =>{
    jsCookies.remove(COOKIE);
}

export const ReadAuthCookie = () =>{
    let cookieValue = jsCookies.get(COOKIE);
    if(cookieValue !== undefined){
        const decodedText = atob(cookieValue)
        const parts = decodedText.split('|')
        const parsedValue = parts.length ? parts[0] : ''
        return parsedValue
    }else{
        return null;
    }
    
}
