export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
export const join = (...args) => args.filter(arg => arg).join(' ');
export const merge = (...args) => Object.assign({}, ...args);
export const dangerous = __html => ({ __html });
export const bind = (context, ...methods) => {
  methods.forEach(method => {
    context[method] = context[method].bind(context);
  });
};
