import { filter, mergeMap, map } from "rxjs/operators";
import { informationTypes, informationCreators } from "./mutations";

export const informationEpics = Object.values({
  fetchIPAddress: (action$, state$) => {
    return action$.pipe(
      filter(action => action.type === informationTypes.fetchIPAddress),
      mergeMap(async () => {
        return fetch("https://api.ipify.org/").then(res => res.text());
      }),
      map(response => {
        return informationCreators.fetchIPAddressFulfilled(response);
      })
    );
  },
  fetchCountry: (action$, state$) => {
    return action$.pipe(
      filter(action => {
        return action.type === informationTypes.fetchIPAddressFulfilled;
      }),
      mergeMap(async action => {
        const ipAddress = action.payload;
        return fetch(
          `https://www.maxmind.com/geoip/v2.1/city/${ipAddress}?demo=1`
        ).then(res => res.json());
      }),
      map(response => {
        return informationCreators.fetchCountryFulfilled(
          response.country.names.ja
        );
      })
    );
  }
});
