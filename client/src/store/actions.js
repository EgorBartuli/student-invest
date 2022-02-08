import ACTypes from "./types";

export const checkAuthAC = (data) => {
  const { status, user, isAuth } = data;

  return { type: ACTypes.CHECK_AUTH, payload: { isAuth, user, status } };
};

export const getInvestorsAC = (data) => {
  return { type: ACTypes.GET_INVESTORS, payload: { data } };
};

export const authAC = (data) => {
  const { status, user, isAuth } = data;

  return { type: ACTypes.AUTH, payload: { isAuth, user, status } };
};

export const profileAC = (data) => {

  if (data) {
    const { photo, info, interests, language, country } = data;

    return {
      type: ACTypes.PROFILE,
      payload: { photo, info, interests, language, country },
    };
  } else {
    return {
      type: ACTypes.PROFILE,
      payload: {},
    };
  }
};

export const updateConnectionsAC = (data) => {
  const { id, investor, student, status } = data;

  return {
    type: ACTypes.UPDATE_CONNECTIONS,
    payload: { id, investor, student, status },
  };
};

export const connectionsAC = (data) => {
  return { type: ACTypes.CONNECTIONS, payload: { data } };
};

//Fetch Requests - Thunk
//Sign Up
export const thunkSignUpAC = (e, formEl) => async (dispatch) => {
  e.preventDefault();

  const res = await fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formEl.current.signUpEmail.value,
      login: formEl.current.signUpName.value,
      status: formEl.current.signUpStatus.value,
      password: formEl.current.signUpPassword.value,
    }),
  });

  const data = await res.json();

  //Catch errror
  if (data.err) {
    return alert(data.err);
  }

  dispatch(authAC(data));
};

//Sign In
export const thunkSignInAC = (e, formEl) => async (dispatch) => {
  e.preventDefault();

  const res = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formEl.current.signInEmail.value,
      password: formEl.current.signInPassword.value,
    }),
  });

  const data = await res.json();

  //Catch errror
  if (data.err) {
    return alert(data.err);
  }

  dispatch(authAC(data));
};

export const thunkLogOutAC = () => async (dispatch) => {
  await fetch("/auth/logout");
  dispatch(authAC({ status: null, user: null, isAuth: false }));
};

export const thunkProfileAC = (e, formEl) => async (dispatch) => {
  e.preventDefault();

  const res = await fetch("/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      info: formEl.current.infoProfile.value,
      interests: formEl.current.interestsProfile.value,
      country: formEl.current.countryProfile.value,
      language: formEl.current.languageProfile.value,
    }),
  });

  const data = await res.json();
  dispatch(profileAC(data));
};

export const thunkConnectionAC = (id) => async (dispatch) => {
  const res = await fetch("/connections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      investor_id: id,
      status: false,
    }),
  });
  const data = await res.json();

  //Catch errror
  if (data.err) {
    return alert(data.err);
  }

  console.log(data);
  dispatch(updateConnectionsAC(data));
};


export const thunkUploadHandler = (event) => async(dispatch) => {

  const data = new FormData(event.target);
  const profileData = await (await fetch("/profile", {
    method: "post",
    body: data,
  })).json();
  dispatch(profileAC(profileData))
};



export const thunkChangeStatusAC = (boolean, investorId, studentId) => async (dispatch) => {
  let reverse = !boolean;
  await fetch("/connections/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      investor_id: investorId,
      student_id: studentId,
      status: reverse,
    }),
  });
};
