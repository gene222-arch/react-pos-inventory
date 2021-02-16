export const prepareSetErrorMessages = (errors, errorState) => 
{
    const errorKeys = Object.keys(errors)
    let errorContainer = errorState;

    for (const key in errorContainer) {
        errorContainer[key] = '';
    }

    errorKeys.forEach(errorKey => {
        errorContainer = {...errorContainer, [errorKey]: errors[errorKey]};
    });

    return errorContainer;
}