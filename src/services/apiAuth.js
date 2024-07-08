import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  // Save the current session before signing up a new user
  const { data: savedSessionData } = await supabase.auth.getSession();
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  // Log the entire response for debugging
  console.log("Sign-up response:", { user, error });
  //If there was a previously authenticated user, restore their session
  // This action should be placed right after signUp, otherwise the authError will stop the restore
  if (savedSessionData) {
    await supabase.auth.setSession(savedSessionData.session);
  }
  // Handle errors
  let authError = null;
  if (user && !user.identities.length) {
    authError = {
      name: "AuthApiError",
      message: "This email has already been registered",
    };
  } else if (error) {
    authError = {
      name: error.name,
      message: error.message,
    };
  }
  if (authError) throw new Error(authError.message);
  return user;
}

// export async function signup({ fullName, email, password }) {
//   let { data, error } = await supabase.auth.signUp({
//     email: email,
//     password: password,
//     options: {
//       data: {
//         fullName,
//         avatar: "",
//       },
//     },
//   });

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// }

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUserData({ fullName, avatar, password }) {
  let userData;
  if (password) userData = { password };
  if (fullName) userData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(userData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (avatarError) {
    throw new Error(avatarError.message);
  }

  const { data: updatedUser, error: userUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (userUpdateError) {
    throw new Error(userUpdateError.message);
  }

  return updatedUser;
}
