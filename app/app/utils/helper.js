export const navigateToLogin = (navigation) => () => {
    navigation.navigate("logIn");
};

export const navigateToSignup = (navigation) => () => {
    navigation.navigate("signUp");
};

export const navigateToForgotPassword = (navigation) => () => {
    navigation.navigate("forgotPassword");
};

export const updateNotification = (updater, text, type = 'error') => {
    updater({ text, type });

    setTimeout(() => {
        updater({ text: '', type: '' })
    }, 2500);
};