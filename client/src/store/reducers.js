import ACTypes from "./types";

const initialState = {
  user: {},
  investor: [],
  profile: {},
  connections: [],
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTypes.CHECK_AUTH:
      return {
        ...state,
        user: {
          user: action.payload.user,
          isAuth: action.payload.isAuth,
          status: action.payload.status,
        },
      };

    case ACTypes.GET_INVESTORS:
      return {
        ...state,
        investor: action.payload.data,
      };

    case ACTypes.AUTH:
      return {
        ...state,
        user: {
          user: action.payload.user,
          isAuth: action.payload.isAuth,
          status: action.payload.status,
        },
      };

    case ACTypes.PROFILE:
      return {
        ...state,
        profile: {
          photo: action.payload.photo,
          info: action.payload.info,
          interests: action.payload.interests,
          country: action.payload.country,
          language: action.payload.language,
        },
      };

    case ACTypes.UPDATE_CONNECTIONS:
      return {
        ...state,
        connections: [
          ...state.connections,
          {
            id: action.payload.id,
            investor: action.payload.investor,
            student: action.payload.student,
            status: action.payload.status,
          },
        ],
      };

    case ACTypes.CONNECTIONS:
      return {
        ...state,
        connections: action.payload.data,
      };

    default:
      return state;
  }
};

