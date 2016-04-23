import {handleActions, createAction} from 'redux-actions';

// An array to store notifications object
const INITIAL_DATA = [];

// Default value for a notification
export const TYPE_SUCCESS = 'success';
export const TYPE_INFO = 'info';
export const TYPE_WARNING = 'warning';
export const TYPE_DANGER = 'danger';
const EXPIRE_AFTER = 5000;

// Action types
const NOTIFICATION_ADD = 'NOTIFICATION_ADD';
const NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE';

// Add a notifications (Action)
const addNotification = createAction(NOTIFICATION_ADD, (notification) => notification);

// Remove a notification (Action)
export const removeNotification = createAction(NOTIFICATION_REMOVE, (id) => id);

/**
 * Push a notification
 * @param {String} message Text displayed into notification
 * @param {String} type (success|info|warning|error)
 * @param {Number} expire time before the notification disappear
 * @returns {void}
 */
export const pushNotification = (message, type = TYPE_INFO, expire = EXPIRE_AFTER) => {
  return (dispatch) => {
    const notification = {
      id: new Date().getTime(),
      message,
      type
    };
    // add notification
    dispatch(addNotification(notification));
    if (expire !== 0) {
    // remove notification automatically after a moment defined by `expire` variable
      setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, expire);
    }
  };
};

// Actions
export const actions = {
  pushNotification: pushNotification,
  removeNotification: removeNotification
};

// Reducers
export default handleActions({
  [NOTIFICATION_ADD]: (state, {payload}) => {
    return [...state, payload];
  },
  [NOTIFICATION_REMOVE]: (state, {payload}) => {
    return state.filter((notification) => notification.id !== payload);
  }
}, INITIAL_DATA);
