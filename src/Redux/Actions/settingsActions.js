import {UPDATE_SETTINGS} from "../actionNames";

export const updateSettings = (newSettings) => {
  return {
    type: UPDATE_SETTINGS,
    payload: newSettings,
  };
};
