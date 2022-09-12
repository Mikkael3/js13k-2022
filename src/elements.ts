export const getButton = (text: string): HTMLButtonElement => {
  const button = document.createElement('button');
  button.style.display = 'flex';
  button.style.flexDirection = 'column';
  button.style.justifyContent = 'center';
  button.style.alignItems = 'center';
  setStyles(button);
  button.textContent = text;
  return button;
};

export const setStyles = (e: HTMLElement) => {
  e.style.background = '#f8f5de';
  e.style.backgroundImage =
    'linear-gradient(to right, rgba(255,210,0,0.4), rgba(200, 160, 0, 0.1) 11%, rgba(0,0,0,0) 35%, rgba(200, 160, 0, 0.1) 65%);';
  e.style.boxShadow =
    'inset 0 0 75px rgba(255,210,0,0.3), inset 0 0 20px rgba(255,210,0,0.4), inset 0 0 30px rgba(220,120,0,0.8)';
  e.style.textTransform = 'uppercase';
  e.style.fontWeight = '800';
  e.style.border = '1px solid rgba(255,210,0,0.4)';
  e.style.fontSize = '2vmin';
};
